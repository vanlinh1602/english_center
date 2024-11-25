import { type ClassValue, clsx } from 'clsx';
import { nanoid } from 'nanoid';
import { twMerge } from 'tailwind-merge';

import { Classroom } from '@/features/classroom/types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const generateID = (
  ids: string[] = [],
  size = 5,
  options: { prefix?: string } = {}
): string => {
  const id = `${options?.prefix ?? ''}${nanoid(size)}`;
  if (ids.includes(id)) return generateID(ids, size, options);
  return id;
};

export const checkValidClass = (cls: Classroom, allClasses: Classroom[]) => {
  const filteredClasses = allClasses.filter((c) => {
    if (c.room !== cls.room || c.id === cls.id) {
      return false;
    }

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
    filteredClasses.some(
      (c) =>
        c.teachers?.some((t) => cls.teachers?.includes(t)) &&
        c.schedule.hoursInDay?.start === cls.schedule.hoursInDay?.start
    )
  ) {
    return false;
  }
  return true;
};
