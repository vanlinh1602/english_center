// src/stores/counter-store.ts
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { ClassroomActions, ClassroomState } from './types';

export const defaultInitState: ClassroomState = {
  handling: false,
  classes: {},
};

export const useClassroomStore = create<ClassroomState & ClassroomActions>()(
  devtools((set) => ({
    ...defaultInitState,
    getClasses: () => {
      set(() => ({ handling: true }), false, { type: 'classes/getClasses' });
      set(() => ({ handling: false }), false, { type: 'classes/getClasses' });
    },
    updateClass: () => {
      return true;
    },
  }))
);
