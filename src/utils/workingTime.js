export const DEFAULT_SCHEDULE = {
  workStart: "07:00",
  workEnd: "15:00",
  breaks: [],
  workDays: [1, 2, 3, 4, 5],
};

function parseTime(str) {
  const [h, m] = str.split(":").map(Number);
  return h * 60 + m;
}

function getMinutesOfDay(date) {
  return date.getHours() * 60 + date.getMinutes();
}

function setTimeOfDay(date, minutesOfDay) {
  const d = new Date(date);
  d.setHours(Math.floor(minutesOfDay / 60), minutesOfDay % 60, 0, 0);
  return d;
}

function nextWorkingDay(date, workDays) {
  const d = new Date(date);
  d.setDate(d.getDate() + 1);
  let safety = 0;
  while (!workDays.includes(d.getDay()) && safety < 10) {
    d.setDate(d.getDate() + 1);
    safety++;
  }
  return d;
}

function buildSegments(schedule) {
  const start = parseTime(schedule.workStart);
  const end = parseTime(schedule.workEnd);
  const breaks = (schedule.breaks || [])
    .map((b) => [parseTime(b.from), parseTime(b.to)])
    .sort((a, b) => a[0] - b[0]);

  const segments = [];
  let cursor = start;

  for (const [bStart, bEnd] of breaks) {
    if (bStart > cursor) {
      segments.push([cursor, bStart]);
    }
    cursor = Math.max(cursor, bEnd);
  }

  if (cursor < end) {
    segments.push([cursor, end]);
  }

  return segments;
}

export function getWorkingMinutesBetween(startDate, endDate, schedule) {
  if (!startDate || !endDate) return 0;
  const s = schedule || DEFAULT_SCHEDULE;
  const workDays =
    s.workDays && s.workDays.length > 0
      ? s.workDays
      : DEFAULT_SCHEDULE.workDays;
  const segments = buildSegments({
    workStart: s.workStart || DEFAULT_SCHEDULE.workStart,
    workEnd: s.workEnd || DEFAULT_SCHEDULE.workEnd,
    breaks: s.breaks || DEFAULT_SCHEDULE.breaks,
  });

  const start = new Date(startDate);
  const end = new Date(endDate);
  if (end <= start) return 0;

  let total = 0;
  let current = new Date(start);
  current.setHours(0, 0, 0, 0);
  const endDay = new Date(end);
  endDay.setHours(0, 0, 0, 0);

  while (current <= endDay) {
    if (workDays.includes(current.getDay())) {
      for (const [segStart, segEnd] of segments) {
        const daySegStart = new Date(current);
        daySegStart.setHours(Math.floor(segStart / 60), segStart % 60, 0, 0);
        const daySegEnd = new Date(current);
        daySegEnd.setHours(Math.floor(segEnd / 60), segEnd % 60, 0, 0);

        const effectiveStart = start > daySegStart ? start : daySegStart;
        const effectiveEnd = end < daySegEnd ? end : daySegEnd;

        if (effectiveStart < effectiveEnd) {
          total += (effectiveEnd - effectiveStart) / 60000;
        }
      }
    }
    current.setDate(current.getDate() + 1);
  }

  return total;
}

export function addWorkingMinutes(startDate, minutes, schedule) {
  if (minutes <= 0) return new Date(startDate);

  const s = schedule || DEFAULT_SCHEDULE;
  const workStart = parseTime(s.workStart || DEFAULT_SCHEDULE.workStart);
  const workEnd = parseTime(s.workEnd || DEFAULT_SCHEDULE.workEnd);
  const workDays =
    s.workDays && s.workDays.length > 0
      ? s.workDays
      : DEFAULT_SCHEDULE.workDays;
  const segments = buildSegments({
    workStart: s.workStart || DEFAULT_SCHEDULE.workStart,
    workEnd: s.workEnd || DEFAULT_SCHEDULE.workEnd,
    breaks: s.breaks || DEFAULT_SCHEDULE.breaks,
  });

  let current = new Date(startDate);
  let remaining = minutes;
  let iterations = 0;

  while (remaining > 0 && iterations < 10000) {
    iterations++;

    if (!workDays.includes(current.getDay())) {
      current = setTimeOfDay(nextWorkingDay(current, workDays), workStart);
      continue;
    }

    const now = getMinutesOfDay(current);

    if (now < workStart) {
      current = setTimeOfDay(current, workStart);
      continue;
    }

    if (now >= workEnd) {
      current = setTimeOfDay(nextWorkingDay(current, workDays), workStart);
      continue;
    }

    let inSegment = false;
    for (const [segStart, segEnd] of segments) {
      if (now < segStart) {
        current = setTimeOfDay(current, segStart);
        inSegment = false;
        break;
      }
      if (now >= segStart && now < segEnd) {
        const available = segEnd - now;
        if (remaining <= available) {
          current = setTimeOfDay(current, now + remaining);
          remaining = 0;
        } else {
          remaining -= available;
          current = setTimeOfDay(current, segEnd);
        }
        inSegment = true;
        break;
      }
    }

    if (!inSegment && remaining > 0) {
      const lastSeg = segments[segments.length - 1];
      if (now >= lastSeg[1]) {
        current = setTimeOfDay(nextWorkingDay(current, workDays), workStart);
      }
    }
  }

  return current;
}
