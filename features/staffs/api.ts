import { toast } from '@/hooks/use-toast';
import formatError from '@/lib/formatError';
import { staffsService } from '@/services';

import { Staff } from './types';

export const getStaffs = async (): Promise<Staff[]> => {
  try {
    const result = await staffsService.get<Staff[]>('/get');
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

export const getFilterStaff = async (
  filter: Partial<Staff>
): Promise<Staff[]> => {
  try {
    const result = await staffsService.get<Staff[]>('/get', filter);
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

export const createStaff = async (
  staff: Partial<Staff>
): Promise<Staff | null> => {
  try {
    const result = await staffsService.post<Staff>('/create', { staff });
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

export const updateStaff = async (
  id: string,
  staff: Partial<Staff>
): Promise<boolean> => {
  try {
    const result = await staffsService.post<{ success: boolean }>('/update', {
      id,
      staff,
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

export const deleteStaff = async (id: string): Promise<boolean> => {
  try {
    const result = await staffsService.post<{ success: boolean }>('/delete', {
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
