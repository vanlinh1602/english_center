import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { CoursesActions, CoursesState } from './types';

export const defaultInitState: CoursesState = {
  handling: false,
  classes: {},
};

export const useCourseStore = create<CoursesState & CoursesActions>()(
  devtools((set) => ({
    ...defaultInitState,
    getCourses: () => {
      set(() => ({ handling: true }), false, { type: 'classes/getCourses' });
      set(() => ({ handling: false }), false, { type: 'classes/getCourses' });
    },
    updateCourses: () => {
      return true;
    },
  }))
);
