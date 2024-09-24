import type { OpeningHoursLocationsTimes } from '../../tina/__generated__/types';

export const dayOfWeek = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
] as const;
export type DayOfWeek = (typeof dayOfWeek)[number];

function commaAndStringReducer(
  acc: string,
  idv: string,
  idx: number,
  arr: string[]
) {
  acc =
    // if first, return, there should be nothing before hand
    idx === 0
      ? idv
      : // designed to be recursive
        // if run through already, then there will be two & which is wrong
        // if last and has run through already (ie) contains &, then put comma
        arr.length - 1 === idx && !arr[arr.length - 1].includes('&')
        ? `${acc} & ${idv}`
        : `${acc}, ${idv}`;
  return acc;
}

function groupConsecutiveDays(acc: DayOfWeek[][], idv: DayOfWeek, idx: number) {
  if (idx === 0) {
    // there will be nothing here so add the initial value
    acc.push([idv]);
  } else {
    // get the index of the current day (monday = 0, wednesday = 2)
    const id = dayOfWeek.indexOf(idv);
    // get the last array of grouped days (grouped if consecutive)
    const last = acc[acc.length - 1];
    // if the current day is the day after the last day,
    // add to the same array
    id - dayOfWeek.indexOf(last[last.length - 1]) === 1
      ? last.push(idv)
      : // else add it to a new array/separate it from the other days
        acc.push([idv]);
  }
  return acc;
}

function joinConsecutiveDaysWithAppropriateStringMap(
  x: ReturnType<typeof groupConsecutiveDays>[0],
  i: number,
  a: ReturnType<typeof groupConsecutiveDays>
) {
  // if not the first and is the last and the length is less than 3
  if (i !== 0 && a.length - 1 === i && x.length < 3)
    return x.reduce(commaAndStringReducer, '');
  switch (x.length) {
    case 1:
      // if the day is by itself then just return it
      return x[0];
    case 2:
      // if there are two consecutive days, separate by comma
      return `${x[0]}, ${x[1]}`;
    default:
      // if there are multiple consective days, separate by dash
      return `${x[0]} - ${x[x.length - 1]}`;
  }
}

function handleLargeDayInputs(days: DayOfWeek[]) {
  const daysGroupedIfOneApart = days.reduce(groupConsecutiveDays, []);
  const groupsJoinedByAppropriateString = daysGroupedIfOneApart.map(
    joinConsecutiveDaysWithAppropriateStringMap
  );
  return groupsJoinedByAppropriateString.reduce(commaAndStringReducer, '');
}

export function formatDays(days: DayOfWeek[]) {
  switch (days?.length) {
    case 1:
      return days[0];
    case 2:
    case 3:
      return days.reduce(commaAndStringReducer, '');
    default:
      return handleLargeDayInputs(days);
  }
}

export type Config = { day: DayOfWeek; time: string };
type ReducedConfig = { [time: string]: DayOfWeek[] };
type ArrayConfig = [string, DayOfWeek[]];

function handleLargeDayAndHourInputs(config: ArrayConfig[]): string[] {
  return config.reduce((acc, [time, days], idx) => {
    const reducedDays = days.reduce(groupConsecutiveDays, []);
    acc.push(
      ...reducedDays
        .map(joinConsecutiveDaysWithAppropriateStringMap)
        .map((display) => `${display}: ${time}`)
    );
    return acc;
  }, [] as string[]);
}

export function formatDaysAndHours(config: OpeningHoursLocationsTimes[]) {
  const groupedDays: ReducedConfig = config.reduce(
    (acc, config, idx) => {
      if (!config.day || !config.closeTime || !config.openTime) return;
      const time = `${config.openTime} - ${config.closeTime}`;
      if (!Array.isArray(acc[time])) acc[time] = [config.day];
      else acc[time].push(config.day);
      return acc;
    },
    {} as { [k: string]: DayOfWeek[] }
  );
  const asdf = Object.entries(groupedDays);
  return handleLargeDayAndHourInputs(asdf);
}
