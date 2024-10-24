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
  updateClass: () => void;
};
