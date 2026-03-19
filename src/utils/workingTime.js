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
