export type Classroom = {
  id: string;
  name: string;
  course: string;
  teacher: string[];
  students: string[];
  daysInWeek: string[];
  hoursInDay: string;
  dateStart: number;
  dateEnd: number;
  status: string;
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
