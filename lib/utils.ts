import { type ClassValue, clsx } from 'clsx';
import { nanoid } from 'nanoid';
import { twMerge } from 'tailwind-merge';

import { Classroom } from '@/features/classroom/types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const compareTime = (time1: string, time2: string) => {
  const [hour1, minute1] = time1.split(':').map(Number);
  const [hour2, minute2] = time2.split(':').map(Number);
  if (hour1 > hour2) return 1;
  if (hour1 < hour2) return -1;
  if (minute1 > minute2) return 1;
  if (minute1 < minute2) return -1;
  return 0;
};

export const generateID = (
  ids: string[] = [],
  size = 5,
  options: { prefix?: string } = {}
): string => {
  const id = `${options?.prefix ?? ''}${nanoid(size)}`;
  if (ids.includes(id) || id.includes('-'))
    return generateID(ids, size, options);
  return id;
};

export const checkValidClass = (cls: Classroom, allClasses: Classroom[]) => {
  const filteredClasses = allClasses.filter((c) => {
    if (
      ((cls.schedule.start! <= c.schedule.start! &&
        c.schedule.start! <= cls.schedule.end!) ||
        (cls.schedule.start! <= c.schedule.end! &&
          c.schedule.end! <= cls.schedule.end!) ||
        (c.schedule.start! <= cls.schedule.start! &&
          cls.schedule.start! <= c.schedule.end!) ||
        (c.schedule.start! <= cls.schedule.end! &&
          cls.schedule.end! <= c.schedule.end!)) &&
      c.schedule?.daysInWeek?.some((d) => cls.schedule.daysInWeek?.includes(d))
    ) {
      return true;
    }
    return false;
  });

  if (!filteredClasses.length) return true;
  if (
    filteredClasses.some((c) => {
      if (
        c.room !== cls.room &&
        c.teachers?.some((t) => cls.teachers?.includes(t))
      ) {
        return false;
      }
      if (
        compareTime(
          cls.schedule.hoursInDay?.start || '',
          c.schedule.hoursInDay?.start || ''
        ) >= 0 &&
        compareTime(
          cls.schedule.hoursInDay?.start || '',
          c.schedule.hoursInDay?.end || ''
        ) <= 0
      ) {
        return true;
      }
      if (
        compareTime(
          cls.schedule.hoursInDay?.end || '',
          c.schedule.hoursInDay?.start || ''
        ) >= 0 &&
        compareTime(
          cls.schedule.hoursInDay?.end || '',
          c.schedule.hoursInDay?.end || ''
        ) <= 0
      ) {
        return true;
      }
    })
  ) {
    return false;
  }
  return true;
};
