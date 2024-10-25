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
  courses: Record<string, Courses>;
};

export type CoursesActions = {
  getCourses: () => void;
  getCourse: (id: string) => void;
  createCourse: (course: Partial<Courses>) => void;
  updateCourse: (id: string, course: Partial<Courses>) => void;
  deleteCourse: (id: string) => void;
};
