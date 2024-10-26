import { toast } from '@/hooks/use-toast';
import formatError from '@/lib/formatError';
import { teachersService } from '@/services';

import { Teacher } from './types';

export const getTeachers = async (): Promise<Teacher[]> => {
  try {
    const result = await teachersService.get<Teacher[]>('/get/all');
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

export const getTeacher = async (id: string): Promise<Teacher | null> => {
  try {
    const result = await teachersService.get<Teacher>(`/get/${id}`);
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

export const createTeacher = async (
  teacher: Partial<Teacher>
): Promise<Teacher | null> => {
  try {
    const result = await teachersService.post<Teacher>('/create', { teacher });
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

export const updateTeacher = async (
  id: string,
  teacher: Partial<Teacher>
): Promise<boolean> => {
  try {
    const result = await teachersService.post<{ success: boolean }>('/update', {
      id,
      teacher,
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

export const deleteTeacher = async (id: string): Promise<boolean> => {
  try {
    const result = await teachersService.post<{ success: boolean }>('/delete', {
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
