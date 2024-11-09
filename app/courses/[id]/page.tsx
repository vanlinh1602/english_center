'use client';

import { Book, Calendar, Clock, DollarSign, GraduationCap } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useShallow } from 'zustand/shallow';

import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useCourseStore } from '@/features/courses/hooks';
import { Courses } from '@/features/courses/types';
import { courseLevels, courseStatuses } from '@/lib/options';
import { format } from '@/utils/number';

export default function CourseInfo({
  course = {
    id: 'ENG202',
    name: 'Advanced Business English',
    description:
      'Master the art of professional communication in English. This course focuses on business writing, presentations, and negotiation skills.',
    level: 'C1',
    duration: '12 weeks',
    schedule: 'Tue, Thu 19:00-21:00',
    instructor: {
      name: 'Dr. Sarah Johnson',
      avatar: 'https://i.pravatar.cc/150?img=20',
      bio: 'PhD in Applied Linguistics with 15 years of experience teaching Business English.',
    },
    syllabus: [
      {
        week: 1,
        topic: 'Introduction to Business Communication',
        complete: true,
      },
      { week: 2, topic: 'Email Etiquette and Report Writing', complete: true },
      {
        week: 3,
        topic: 'Presentation Skills I: Structure and Content',
        complete: false,
      },
      {
        week: 4,
        topic: 'Presentation Skills II: Delivery and Body Language',
        complete: false,
      },
      { week: 5, topic: 'Negotiation Techniques', complete: false },
      {
        week: 6,
        topic: 'Cross-Cultural Communication in Business',
        complete: false,
      },
    ],
    pricing: {
      full: 1200,
      installments: [
        { amount: 450, dueDate: 'Before course starts' },
        { amount: 400, dueDate: 'Week 4' },
        { amount: 350, dueDate: 'Week 8' },
      ],
    },
    enrolledStudents: 18,
    maxCapacity: 25,
  },
}) {
  const { id } = useParams();

  const { courses, getCourse } = useCourseStore(
    useShallow((state) => ({
      courses: state.courses,
      getCourse: state.getCourse,
    }))
  );

  const [courseTmp, setCourse] = useState<Courses>();

  useEffect(() => {
    const courseId = id as string;
    if (!courses[courseId]) {
      getCourse(courseId);
    } else {
      setCourse(courses[courseId]);
    }
  }, [id]);

  return (
    <div className="container mx-auto p-4 space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-3xl">{courseTmp?.name}</CardTitle>
              <CardDescription className="text-lg mt-2">
                {courseTmp?.description}
              </CardDescription>
            </div>
            <Badge variant="secondary" className="text-lg px-3 py-1">
              Level: {courseLevels[courseTmp?.level || '']}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-muted-foreground" />
              <span>Duration: {courseTmp?.duration} week</span>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-muted-foreground" />
              <span>Status: {courseStatuses[courseTmp?.status || '']}</span>
            </div>
          </div>

          <Separator />

          <div>
            <h3 className="font-semibold text-lg mb-2 flex items-center">
              <GraduationCap className="h-5 w-5 mr-2" />
              Description
            </h3>
            <div className="flex items-center space-x-4">
              {courseTmp?.description}
            </div>
          </div>

          <Separator />

          <div>
            <h3 className="font-semibold text-lg mb-2 flex items-center">
              <Book className="h-5 w-5 mr-2" />
              Course Syllabus
            </h3>
            <div className="space-y-2">
              {course.syllabus.map((item, index) => (
                <div key={index} className="flex items-center">
                  <div
                    className={`w-6 h-6 rounded-full mr-2 flex items-center justify-center ${
                      item.complete ? 'bg-green-500' : 'bg-gray-300'
                    }`}
                  >
                    {item.complete && (
                      <span className="text-white text-xs">✓</span>
                    )}
                  </div>
                  <span
                    className={
                      item.complete ? 'line-through text-muted-foreground' : ''
                    }
                  >
                    Week {item.week}: {item.topic}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          <div>
            <h3 className="font-semibold text-lg mb-2 flex items-center">
              <DollarSign className="h-5 w-5 mr-2" />
              Pricing
            </h3>
            <p className="font-semibold">
              Full Payment: ${format(courseTmp?.price)}
            </p>
          </div>

          <Separator />
        </CardContent>
      </Card>
    </div>
  );
}
