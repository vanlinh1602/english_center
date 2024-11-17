import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { login, signOut, updateUser } from './api';
import { User, UserActions, UserState } from './types';

export const defaultInitState: UserState = {
  handling: false,
  role: undefined,
  user: undefined,
};

export const useUserStore = create<UserState & UserActions>()(
  devtools((set) => ({
    ...defaultInitState,
    login: async () => {
      set(() => ({ handling: true }), false, {
        type: 'users/login',
      });
      const data = await login();
      if (!data) {
        set(() => ({ handling: false }), false, {
          type: 'users/login',
        });
        return;
      }
      set(
        () => ({
          user: data.user as User,
          role: data.role,
          handling: false,
        }),
        false,
        { type: 'users/login' }
      );
    },
    updateInfo: async (user) => {
      set(() => ({ handling: true }), false, {
        type: 'users/updateUser',
      });
      const updatedUser = await updateUser(user.id!, user);
      if (!updatedUser) {
        set(() => ({ handling: false }), false, {
          type: 'users/updateUser',
        });
        return;
      }
      set(
        () => ({
          user: user as User,
          handling: false,
        }),
        false,
        { type: 'users/updateUser' }
      );
    },
    signOut: async () => {
      set(() => ({ handling: true }), false, {
        type: 'users/signOut',
      });
      await signOut();
      set(() => defaultInitState, false, { type: 'users/signOut' });
    },
  }))
);
