'use client';

import { BookOpen, DollarSign, Users } from 'lucide-react';
import { useEffect, useMemo } from 'react';
import { useShallow } from 'zustand/shallow';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useClassroomStore } from '@/features/classroom/hooks';
import { useCourseStore } from '@/features/courses/hooks';
import { useStudentStore } from '@/features/students/hooks';
import { courseStatuses } from '@/lib/options';
import { format } from '@/utils/number';

export default function ReportSection() {
  const { students, getStudents } = useStudentStore(
    useShallow((state) => ({
      students: state.students,
      getStudents: state.getStudents,
    }))
  );

  const { courses, getCourses } = useCourseStore(
    useShallow((state) => ({
      courses: state.courses,
      getCourses: state.getCourses,
    }))
  );

  const { classrooms, getClassrooms } = useClassroomStore(
    useShallow((state) => ({
      classrooms: state.classes,
      getClassrooms: state.getClasses,
    }))
  );

  useEffect(() => {
    if (!Object.keys(students).length) {
      getStudents();
    }
    if (!Object.keys(courses).length) {
      getCourses();
    }
    if (!Object.keys(classrooms).length) {
      getClassrooms();
    }
  }, []);

  const { summaryData, courseStudents } = useMemo(() => {
    const tmp: {
      title: string;
      icon: any;
      value: string | number;
    }[] = [
      {
        title: 'Total Students',
        icon: Users,
        value: format(Object.keys(students).length),
      },
      {
        title: 'Total Courses',
        icon: BookOpen,
        value: Object.keys(courses).length,
      },
      {
        title: 'Total Classrooms',
        icon: DollarSign,
        value: Object.keys(classrooms).length,
      },
    ];
    const totalStudents: CustomObject<number> = {};
    let totalRevenue = 0;
    Object.values(classrooms).forEach((cls) => {
      if (!totalStudents[cls.course]) {
        totalStudents[cls.course] = 0;
      }
      totalStudents[cls.course] += cls.students?.length || 0;
      totalRevenue +=
        (cls.students?.length || 0) * (courses[cls.course]?.price || 1);
    });

    tmp.push({
      title: 'Revenue',
      icon: DollarSign,
      value: `$${format(totalRevenue)}`,
    });

    return {
      summaryData: tmp,
      courseStudents: totalStudents,
    };
  }, [students, courses]);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* <div className="mb-8 flex justify-between items-center">
        <h2 className="text-3xl font-bold">Reports & Analytics</h2>
      </div> */}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
        {summaryData.map((item, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {item.title}
              </CardTitle>
              <item.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{item.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="coursePerformance" className="space-y-4">
        <TabsList>
          <TabsTrigger value="coursePerformance">
            Course Performance
          </TabsTrigger>
        </TabsList>

        <TabsContent value="coursePerformance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Course Performance</CardTitle>
              <CardDescription>
                Average rating and number of students per course
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(courseStudents).map(
                  ([courseId, numberStudent]) => {
                    const course = courses[courseId] || {};
                    return (
                      <div key={courseId} className="flex items-center">
                        <div className="w-[200px]">
                          <p className="text-sm font-medium">{course.name}</p>
                          <p className="text-sm text-muted-foreground">
                            Status: {courseStatuses[course.status]}
                          </p>
                        </div>
                        <div className="flex-1">
                          <div className="h-2 bg-blue-100 rounded">
                            <div
                              className="h-2 bg-blue-500 rounded"
                              style={{
                                width: `${
                                  (numberStudent /
                                    Object.keys(students || {}).length) *
                                  100
                                }%`,
                              }}
                            ></div>
                          </div>
                        </div>
                        <div className="w-[100px] text-right">
                          <p className="text-sm font-medium">
                            {numberStudent} students
                          </p>
                        </div>
                      </div>
                    );
                  }
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
