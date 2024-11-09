'use client';

import _ from 'lodash';
import {
  Book,
  Calendar,
  CircleDot,
  Clock,
  DollarSign,
  GraduationCap,
} from 'lucide-react';
import { useParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { useShallow } from 'zustand/shallow';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import Waiting from '@/components/Waiting';
import { SyllabusEditor } from '@/features/courses/components';
import { useCourseStore } from '@/features/courses/hooks';
import { courseLevels, courseStatuses } from '@/lib/options';
import { format } from '@/utils/number';

export default function CourseInfo() {
  const { id } = useParams();

  const {
    courses,
    syllabus,
    getCourse,
    getSyllabus,
    updateSyllabus,
    createSyllabus,
    handling,
  } = useCourseStore(
    useShallow((state) => ({
      handling: state.handling,
      courses: state.courses,
      getCourse: state.getCourse,
      getSyllabus: state.getSyllabus,
      updateSyllabus: state.updateSyllabus,
      createSyllabus: state.createSyllabus,
      syllabus: state.syllabus,
    }))
  );

  const course = useMemo(() => courses[id as string], [courses]);
  const courseSyllabus = useMemo(() => syllabus[id as string], [syllabus]);

  const [editSyllabus, setEditSyllabus] = useState<number>();

  useEffect(() => {
    if (!course) {
      getCourse(id as string);
    }
    if (!courseSyllabus) {
      getSyllabus(id as string);
    }
  }, [id, course, courseSyllabus]);

  const handleSaveSyllabus = (data: any) => {
    const currentSyllabus = courseSyllabus?.styllabus || [];
    if (editSyllabus === -1) {
      currentSyllabus.push(data);
    } else {
      _.set(currentSyllabus, [editSyllabus!], data);
    }
    if (courseSyllabus) {
      updateSyllabus(courseSyllabus.course, {
        styllabus: currentSyllabus,
      });
    } else {
      createSyllabus({
        course: id as string,
        styllabus: currentSyllabus,
      });
    }
    setEditSyllabus(undefined);
  };

  return (
    <div className="container mx-auto p-4 space-y-6">
      {handling ? <Waiting /> : null}
      {editSyllabus ? (
        <SyllabusEditor
          initialData={
            editSyllabus !== -1
              ? courseSyllabus?.styllabus[editSyllabus]
              : undefined
          }
          onSave={handleSaveSyllabus}
          onCancel={() => setEditSyllabus(undefined)}
        />
      ) : null}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-3xl">{course?.name}</CardTitle>
            </div>
            <Badge variant="secondary" className="text-lg px-3 py-1">
              Level: {courseLevels[course?.level || '']}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-muted-foreground" />
              <span>Duration: {course?.duration} week</span>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-muted-foreground" />
              <span>Status: {courseStatuses[course?.status || '']}</span>
            </div>
          </div>

          <Separator />

          <div>
            <h3 className="font-semibold text-lg mb-2 flex items-center">
              <GraduationCap className="h-5 w-5 mr-2" />
              Description
            </h3>
            <div className="flex items-center space-x-4">
              {course?.description}
            </div>
          </div>

          <Separator />

          <div>
            <div className="flex justify-between">
              <h3 className="font-semibold text-lg mb-2 flex items-center ">
                <Book className="h-5 w-5 mr-2" />
                Course Syllabus
              </h3>
              <Button onClick={() => setEditSyllabus(-1)}>Add Syllabus</Button>
            </div>
            <div className="space-y-2">
              {courseSyllabus ? (
                courseSyllabus.styllabus.map((item, index) => (
                  <div key={index} className="flex items-center ml-4">
                    <CircleDot className="w-5 h-5 mr-2" />
                    <span>
                      Week {item.week}: {item.description}
                    </span>
                  </div>
                ))
              ) : (
                <p>No syllabus available.</p>
              )}
            </div>
          </div>

          <Separator />

          <div>
            <h3 className="font-semibold text-lg mb-2 flex items-center">
              <DollarSign className="h-5 w-5 mr-2" />
              Pricing
            </h3>
            <p className="font-semibold">
              Full Payment: ${format(course?.price)}
            </p>
          </div>

          <Separator />
        </CardContent>
      </Card>
    </div>
  );
}
