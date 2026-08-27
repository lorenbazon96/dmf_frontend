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

function buildSegments(schedule) {
  const start = parseTime(schedule.workStart || DEFAULT_SCHEDULE.workStart);
  const end = parseTime(schedule.workEnd || DEFAULT_SCHEDULE.workEnd);
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

function dateKey(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function segmentsForDay(date, schedule) {
  const exception = (schedule.scheduleExceptions || []).find(
    item => item.date === dateKey(date),
  );
  if (exception?.type === "absence") return [];
  if (exception?.type === "custom-hours") {
    const from = parseTime(exception.from);
    const to = parseTime(exception.to);
    return buildSegments(schedule)
      .map(([start, end]) => [Math.max(start, from), Math.min(end, to)])
      .filter(([start, end]) => start < end);
  }
  const workDays = schedule.workDays?.length
    ? schedule.workDays
    : DEFAULT_SCHEDULE.workDays;
  return workDays.includes(date.getDay()) ? buildSegments(schedule) : [];
}

export function getWorkingMinutesBetween(startDate, endDate, schedule) {
  if (!startDate || !endDate) return 0;
  const s = schedule || DEFAULT_SCHEDULE;

  const start = new Date(startDate);
  const end = new Date(endDate);
  if (end <= start) return 0;

  let total = 0;
  let current = new Date(start);
  current.setHours(0, 0, 0, 0);
  const endDay = new Date(end);
  endDay.setHours(0, 0, 0, 0);

  while (current <= endDay) {
    for (const [segStart, segEnd] of segmentsForDay(current, s)) {
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
    current.setDate(current.getDate() + 1);
  }

  return total;
}

export function getPausedWorkingMinutes(history, endDate, schedule) {
  let pausedAt = null;
  let total = 0;
  let hasPause = false;

  for (const entry of history || []) {
    if (!entry?.at) continue;
    if (entry.to === "paused" && !pausedAt) {
      pausedAt = entry.at;
      hasPause = true;
    } else if (pausedAt && entry.from === "paused") {
      total += getWorkingMinutesBetween(pausedAt, entry.at, schedule);
      pausedAt = null;
    }
  }

  if (pausedAt) {
    total += getWorkingMinutesBetween(pausedAt, endDate, schedule);
  }

  return hasPause ? total : null;
}

export function getTaskWorkingMinutes(task, endDate, schedule) {
  if (!task?.startedAt) return 0;
  const end = task.completedAt || task.pausedAt || endDate;
  const workingMinutes = getWorkingMinutesBetween(task.startedAt, end, schedule);
  const recordedPausedMinutes = getPausedWorkingMinutes(task.history, end, schedule);
  const pausedMinutes = recordedPausedMinutes ?? (task.totalPausedMs || 0) / 60000;
  return Math.max(0, workingMinutes - pausedMinutes);
}

export function getTaskProgressMinutes(task, endDate, schedule) {
  const previousMinutes = (task?.previousAssignments || []).reduce(
    (sum, assignment) => sum + Number(assignment.actualMinutes || 0),
    0,
  );
  const remainingEstimate = Number(task?.estimatedMinutes || 0);
  const estimated = previousMinutes + remainingEstimate;
  const current = task?.status === "completed"
    ? remainingEstimate
    : Math.min(remainingEstimate, getTaskWorkingMinutes(task, endDate, schedule));
  return { estimated, completed: previousMinutes + current };
}

export function addWorkingMinutes(startDate, minutes, schedule) {
  if (minutes <= 0) return new Date(startDate);

  const s = schedule || DEFAULT_SCHEDULE;
  let current = new Date(startDate);
  let remaining = minutes;
  let iterations = 0;

  while (remaining > 0 && iterations < 10000) {
    iterations++;
    const segments = segmentsForDay(current, s);
    const now = getMinutesOfDay(current);
    const segment = segments.find(([, end]) => now < end);
    if (!segment) {
      current.setDate(current.getDate() + 1);
      current.setHours(0, 0, 0, 0);
      continue;
    }
    if (now < segment[0]) {
      current = setTimeOfDay(current, segment[0]);
      continue;
    }
    const available = segment[1] - now;
    if (remaining <= available) {
      return setTimeOfDay(current, now + remaining);
    }
    remaining -= available;
    current = setTimeOfDay(current, segment[1]);
  }

  return current;
}
