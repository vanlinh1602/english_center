import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import {
  createCourse,
  deleteCourse,
  getCourse,
  getCourses,
  updateCourse,
} from './api';
import { CoursesActions, CoursesState } from './types';

export const defaultInitState: CoursesState = {
  handling: false,
  courses: {},
};

export const useCourseStore = create<CoursesState & CoursesActions>()(
  devtools((set) => ({
    ...defaultInitState,
    getCourses: async () => {
      set(() => ({ handling: true }), false, { type: 'classes/getCourses' });
      const courses = await getCourses();
      const coursesMap = courses.reduce((acc, course) => {
        acc[course.id] = course;
        return acc;
      }, {} as CoursesState['courses']);

      set(() => ({ courses: coursesMap, handling: false }), false, {
        type: 'classes/getCourses',
      });
    },
    getCourse: async (id) => {
      set(() => ({ handling: true }), false, { type: 'classes/getCourse' });
      const course = await getCourse(id);
      if (course) {
        set(
          (s) => ({
            courses: { ...s.courses, [course.id]: course },
            handling: false,
          }),
          false,
          {
            type: 'classes/getCourse',
          }
        );
      } else {
        set(() => ({ handling: false }), false, { type: 'classes/getCourse' });
      }
    },
    createCourse: async (course) => {
      set(() => ({ handling: true }), false, { type: 'classes/createCourse' });
      const newCourse = await createCourse(course);
      if (!newCourse) {
        set(() => ({ handling: false }), false, {
          type: 'classes/createCourse',
        });
        return;
      }
      set(
        (s) => ({
          courses: { ...s.courses, [newCourse.id]: newCourse },
          handling: false,
        }),
        false,
        { type: 'classes/createCourse' }
      );
    },
    updateCourse: async (id, course) => {
      set(() => ({ handling: true }), false, { type: 'classes/updateCourse' });
      const updatedCourse = await updateCourse(id, course);
      if (!updatedCourse) {
        set(() => ({ handling: false }), false, {
          type: 'classes/updateCourse',
        });
        return;
      }
      set(
        (s) => ({
          courses: {
            ...s.courses,
            [id]: {
              ...s.courses[id],
              ...course,
            },
          },
          handling: false,
        }),
        false,
        { type: 'classes/updateCourse' }
      );
    },
    deleteCourse: async (id) => {
      set(() => ({ handling: true }), false, { type: 'classes/deleteCourse' });
      const success = await deleteCourse(id);
      if (!success) {
        set(() => ({ handling: false }), false, {
          type: 'classes/deleteCourse',
        });
        return;
      }
      set(
        (s) => {
          const newCourses = { ...s.courses };
          delete newCourses[id];
          return { courses: newCourses, handling: false };
        },
        false,
        { type: 'classes/deleteCourse' }
      );
    },
  }))
);
