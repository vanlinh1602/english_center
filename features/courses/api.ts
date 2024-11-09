import { toast } from '@/hooks/use-toast';
import formatError from '@/lib/formatError';
import { coursesService } from '@/services';

import { Courses } from './types';

export const getCourses = async (): Promise<Courses[]> => {
  try {
    const result = await coursesService.get<Courses[]>('/get');
    if (result.kind === 'ok') {
      return result.data;
    }
    throw result;
  } catch (error) {
    toast({
      title: 'Error',
      description: formatError(error),
      variant: 'destructive',
    });
    return [];
  }
};

export const getFilteredCourses = async (
  filter: Partial<Courses>
): Promise<Courses[]> => {
  try {
    const result = await coursesService.get<Courses[]>('/get', {
      filter,
    });
    if (result.kind === 'ok') {
      return result.data;
    }
    throw result;
  } catch (error) {
    toast({
      title: 'Error',
      description: formatError(error),
      variant: 'destructive',
    });
    return [];
  }
};

export const createCourse = async (
  course: Partial<Courses>
): Promise<Courses | null> => {
  try {
    const result = await coursesService.post<Courses>('/create', { course });
    if (result.kind === 'ok') {
      return result.data;
    }
    throw result;
  } catch (error) {
    toast({
      title: 'Error',
      description: formatError(error),
      variant: 'destructive',
    });
    return null;
  }
};

export const updateCourse = async (
  id: string,
  course: Partial<Courses>
): Promise<boolean> => {
  try {
    const result = await coursesService.post<{ success: boolean }>('/update', {
      id,
      course,
    });
    if (result.kind === 'ok') {
      return result.data.success;
    }
    throw result;
  } catch (error) {
    toast({
      title: 'Error',
      description: formatError(error),
      variant: 'destructive',
    });
    return false;
  }
};

export const deleteCourse = async (id: string): Promise<boolean> => {
  try {
    const result = await coursesService.post<{ success: boolean }>('/delete', {
      id,
    });
    if (result.kind === 'ok') {
      return result.data.success;
    }
    throw result;
  } catch (error) {
    toast({
      title: 'Error',
      description: formatError(error),
      variant: 'destructive',
    });
    return false;
  }
};
