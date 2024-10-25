import { CLASSROON_BACKEND, COURSES_BACKEND } from '@/lib/config';

import Api from './api';

export const coursesService = new Api({
  baseURL: COURSES_BACKEND,
  withCredentials: true,
});

export const classroomsService = new Api({
  baseURL: CLASSROON_BACKEND,
  withCredentials: true,
});
