export const COURSES_BACKEND =
  process.env.REACT_APP_STAGE === 'development'
    ? 'http://localhost:3000/courses'
    : 'https://be-english-courses.kuma.id.vn/courses';

export const CLASSROON_BACKEND =
  process.env.REACT_APP_STAGE === 'development'
    ? 'http://localhost:3100/classroom'
    : 'https://be-english-courses.kuma.id.vn/classroom';

export const STUDENTS_BACKEND =
  process.env.REACT_APP_STAGE === 'development'
    ? 'http://localhost:3200/students'
    : 'https://be-english-person.id.vn/students';

export const TEACHERS_BACKEND =
  process.env.REACT_APP_STAGE === 'development'
    ? 'http://localhost:3200/teachers'
    : 'https://be-english-person.id.vn/teachers';
