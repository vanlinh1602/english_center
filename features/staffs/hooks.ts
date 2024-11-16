import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import {
  createStaff,
  deleteStaff,
  getFilterStaff,
  getStaffs,
  updateStaff,
} from './api';
import { StaffActions, StaffState } from './types';

export const defaultInitState: StaffState = {
  handling: false,
  staffs: {},
};

export const useStaffStore = create<StaffState & StaffActions>()(
  devtools((set) => ({
    ...defaultInitState,
    getStaffs: async () => {
      set(() => ({ handling: true }), false, { type: 'staffs/getStaff' });
      const staffs = await getStaffs();
      const staffsMap = staffs.reduce((acc, staff) => {
        acc[staff.id] = staff;
        return acc;
      }, {} as StaffState['staffs']);

      set(() => ({ staffs: staffsMap, handling: false }), false, {
        type: 'staffs/getStaff',
      });
    },
    getStaff: async (id) => {
      set(() => ({ handling: true }), false, { type: 'staffs/getStaff' });
      const result = await getFilterStaff({ id });
      const staff = result[0];
      if (staff) {
        set(
          (s) => ({
            staffs: { ...s.staffs, [staff.id]: staff },
            handling: false,
          }),
          false,
          {
            type: 'staffs/getStaff',
          }
        );
      } else {
        set(() => ({ handling: false }), false, {
          type: 'staffs/getStaff',
        });
      }
    },
    createStaff: async (staff) => {
      set(() => ({ handling: true }), false, {
        type: 'staffs/createStaff',
      });
      const newStaff = await createStaff(staff);
      if (!newStaff) {
        set(() => ({ handling: false }), false, {
          type: 'staffs/createStaff',
        });
        return;
      }
      set(
        (s) => ({
          staffs: { ...s.staffs, [newStaff.id]: newStaff },
          handling: false,
        }),
        false,
        { type: 'staffs/createStaff' }
      );
    },
    updateStaff: async (id, staff) => {
      set(() => ({ handling: true }), false, {
        type: 'staffs/updateStaff',
      });
      const updatedStaff = await updateStaff(id, staff);
      if (!updatedStaff) {
        set(() => ({ handling: false }), false, {
          type: 'staffs/updateStaff',
        });
        return;
      }
      set(
        (s) => ({
          staffs: {
            ...s.staffs,
            [id]: {
              ...s.staffs[id],
              ...staff,
            },
          },
          handling: false,
        }),
        false,
        { type: 'staffs/updateStaff' }
      );
    },
    deleteStaff: async (id) => {
      set(() => ({ handling: true }), false, {
        type: 'staffs/deleteStaff',
      });
      const success = await deleteStaff(id);
      if (!success) {
        set(() => ({ handling: false }), false, {
          type: 'staffs/deleteStaff',
        });
        return;
      }
      set(
        (s) => {
          const newStaff = { ...s.staffs };
          delete newStaff[id];
          return { staffs: newStaff, handling: false };
        },
        false,
        { type: 'staffs/deleteStaff' }
      );
    },
  }))
);
