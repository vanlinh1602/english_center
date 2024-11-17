import { toast } from '@/hooks/use-toast';
import formatError from '@/lib/formatError';
import { classroomsService } from '@/services';

import { Classroom } from './types';

export const getClassroomes = async (): Promise<Classroom[]> => {
  try {
    const result = await classroomsService.get<Classroom[]>('');
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

export const getFilterClassroom = async (
  filter: Partial<Classroom>
): Promise<Classroom[]> => {
  try {
    const result = await classroomsService.get<Classroom[]>('', filter);
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

export const createClassroom = async (
  classroom: Partial<Classroom>
): Promise<Classroom | null> => {
  try {
    const result = await classroomsService.post<Classroom>('', {
      classroom,
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
    return null;
  }
};

export const updateClassroom = async (
  id: string,
  classroom: Partial<Classroom>
): Promise<boolean> => {
  try {
    const result = await classroomsService.put<{ success: boolean }>('', {
      id,
      classroom,
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

export const deleteClassroom = async (id: string): Promise<boolean> => {
  try {
    const result = await classroomsService.delete<{ success: boolean }>('', {
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
