import { toast } from '@/hooks/use-toast';
import formatError from '@/lib/formatError';
import { studentsService } from '@/services';

import { Student } from './types';

export const getStudents = async (): Promise<Student[]> => {
  try {
    const result = await studentsService.get<Student[]>('/get/all');
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

export const getStudent = async (id: string): Promise<Student | null> => {
  try {
    const result = await studentsService.get<Student>(`/get/${id}`);
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

export const createStudent = async (
  student: Partial<Student>
): Promise<Student | null> => {
  try {
    const result = await studentsService.post<Student>('/create', { student });
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

export const updateStudent = async (
  id: string,
  student: Partial<Student>
): Promise<boolean> => {
  try {
    const result = await studentsService.post<{ success: boolean }>('/update', {
      id,
      student,
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

export const deleteStudent = async (id: string): Promise<boolean> => {
  try {
    const result = await studentsService.post<{ success: boolean }>('/delete', {
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
