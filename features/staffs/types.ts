export type Staff = {
  id: string;
  name: string;
  email: string;
  role: string;
  phone: string;
  avatar?: string;
  birthdate?: number;
  gender: string;
  address: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export type StaffState = {
  handling: boolean;
  staffs: Record<string, Staff>;
};

export type StaffActions = {
  getStaffs: () => void;
  getStaff: (id: string) => void;
  createStaff: (staff: Partial<Staff>) => void;
  updateStaff: (id: string, staff: Partial<Staff>) => void;
  deleteStaff: (id: string) => void;
};
