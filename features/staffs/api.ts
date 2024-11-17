import { toast } from '@/hooks/use-toast';
import formatError from '@/lib/formatError';
import { staffsService } from '@/services';

import { Staff } from './types';

export const getStaffs = async (): Promise<Staff[]> => {
  try {
    const result = await staffsService.get<Staff[]>('');
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
    const result = await staffsService.get<Staff[]>('', filter);
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
    const result = await staffsService.post<Staff>('', { staff });
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
    const result = await staffsService.put<{ success: boolean }>('', {
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
    const result = await staffsService.delete<{ success: boolean }>('', {
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
