export type Courses = {
  id: string;
  name: string;
  description: string;
  duration: number;
  level: string;
  status: string;
  price: number;
};

export type CoursesState = {
  handling: boolean;
  classes: Record<string, Courses>;
};

export type CoursesActions = {
  getCourses: () => void;
  updateCourses: () => void;
};
