export type Classroom = {
  id: string;
  name: string;
  course: string;
  room: string;
  teacher: string[];
  students: string[];
  maxStudents: number;
  daysInWeek: string[];
  hoursInDay: string;
  dateStart: number;
  dateEnd: number;
  status: string;
  completedSyallbus?: Record<string, boolean>;
};

export type ClassroomState = {
  handling: boolean;
  classes: Record<string, Classroom>;
};

export type ClassroomActions = {
  getClasses: () => void;
  getClass: (id: string) => void;
  createClass: (classroom: Partial<Classroom>) => void;
  updateClass: (id: string, classroom: Partial<Classroom>) => void;
  deleteClass: (id: string) => void;
};
