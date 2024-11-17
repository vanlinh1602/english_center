export type User = {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  avatar?: string;
  birthdate: number;
  gender: string;
  address: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export type UserState = {
  handling: boolean;
  user?: User;
  role?: string;
};

export type UserActions = {
  login: () => void;
  updateInfo: (user: Partial<User>) => void;
  signOut: () => Promise<void>;
};
