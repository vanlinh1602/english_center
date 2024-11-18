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
    if (c.room !== cls.room) {
      return false;
    }
    if (
      (c.schedule.start ?? 0) > (cls.schedule.end ?? 0) &&
      (c.schedule.end ?? 0) < (cls.schedule.start ?? 0)
    ) {
      return false;
    }
    if (
      c.schedule.daysInWeek &&
      !c.schedule.daysInWeek.some((d) => cls.schedule.daysInWeek?.includes(d))
    ) {
      return false;
    }
    return true;
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
