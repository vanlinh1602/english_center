'use client';

import { Book, Clock, Users } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { useShallow } from 'zustand/shallow';

import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import Waiting from '@/components/Waiting';
import { useClassroomStore } from '@/features/classroom/hooks';
import { Classroom } from '@/features/classroom/types';
import { useCourseStore } from '@/features/courses/hooks';
import { Courses, CourseSyllabus } from '@/features/courses/types';

export default function ClassroomInfo() {
  const { id } = useParams();
  const { classes, getClass, classHandling } = useClassroomStore(
    useShallow((state) => ({
      classHandling: state.handling,
      classes: state.classes,
      getClass: state.getClass,
    }))
  );
  const { courses, courseHandling } = useCourseStore(
    useShallow((state) => ({
      courseHandling: state.handling,
      courses: state.courses,
      getCourse: state.getCourse,
    }))
  );

  const [classTmp, setClassTmp] = useState<Classroom>();
  const [course, setCourse] = useState<Courses>();
  const [courseSyllabus, setCourseSyllabus] = useState<CourseSyllabus>();

  const progress = useMemo(() => {
    if (!classTmp || !courseSyllabus) return 0;
    const completed = Object.keys(classTmp.completedSyallbus || {}).length;
    const total = courseSyllabus.styllabus.length;
    return (completed / total) * 100;
  }, [classTmp, courseSyllabus]);

  useEffect(() => {
    const classroomId = id as string;
    if (!classes[classroomId]) {
      getClass(classroomId);
    } else {
      setClassTmp(classes[classroomId]);
      setCourse(courses[classes[classroomId].course]);
    }
  }, [id, classes, courses]);

  return (
    <div className="container mx-auto p-4 space-y-6">
      {classHandling || courseHandling ? <Waiting /> : null}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-3xl">{classTmp?.name}</CardTitle>
              <CardDescription className="text-lg mt-2">
                Course: {course?.name || 'N/A'}
              </CardDescription>
            </div>
            <Badge variant="secondary" className="text-lg px-3 py-1">
              Room: {classTmp?.room || 'N/A'}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-muted-foreground" />
              <span>Capacity: {classTmp?.students.length} students</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5" />
              <span>Monday, Sunday: 8:00 - 12:00am</span>
            </div>
          </div>

          <Separator />

          <div>
            <h3 className="font-semibold text-lg mb-2 flex items-center">
              <Book className="h-5 w-5 mr-2" />
              Course Syllabus
            </h3>
            <div className="space-y-2">
              {courseSyllabus?.styllabus.map((item, index) => (
                <div key={index} className="flex items-center">
                  <div
                    className={`w-6 h-6 rounded-full mr-2 flex items-center justify-center ${
                      classTmp?.completedSyallbus?.[index]
                        ? 'bg-green-500'
                        : 'bg-gray-300'
                    }`}
                  >
                    {classTmp?.completedSyallbus?.[index] && (
                      <span className="text-white text-xs">✓</span>
                    )}
                  </div>
                  <span
                    className={
                      classTmp?.completedSyallbus?.[index]
                        ? 'line-through text-muted-foreground'
                        : ''
                    }
                  >
                    Week {item.week}: {item.description}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <Progress value={progress} className="w-full" />
              <p className="text-sm text-muted-foreground mt-2">
                {progress.toFixed(0)}% Complete
              </p>
            </div>
          </div>

          <Separator />
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-muted-foreground" />
              <span>
                Enrolled: {classTmp?.students.length || 0}/
                {classTmp?.maxStudents || 0}
              </span>
            </div>
            <Progress
              value={
                ((classTmp?.students.length || 0) /
                  (classTmp?.maxStudents || 1)) *
                100
              }
              className="w-1/2"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
