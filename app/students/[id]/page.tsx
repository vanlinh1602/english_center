'use client';

import {
  Book,
  Calendar,
  DollarSign,
  GraduationCap,
  Mail,
  Phone,
  User,
} from 'lucide-react';
import { useRouter } from 'next/navigation';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export default function StudentInfo({
  student = {
    id: 'S12345',
    name: 'Emily Johnson',
    email: 'emily.johnson@example.com',
    phone: '+1 (555) 123-4567',
    avatar: 'https://i.pravatar.cc/150?img=5',
    registeredCourses: [
      { id: 'C1', name: 'Intermediate English', level: 'B1', progress: 60 },
      { id: 'C2', name: 'Business English', level: 'B2', progress: 30 },
    ],
    registeredClasses: [
      {
        id: 'CL1',
        name: 'Speaking Practice',
        schedule: 'Mon, Wed 18:00-19:30',
        teacher: 'John Smith',
      },
      {
        id: 'CL2',
        name: 'Writing Workshop',
        schedule: 'Tue, Thu 17:00-18:30',
        teacher: 'Sarah Brown',
      },
    ],
    totalPaid: 1250,
  },
}) {
  const router = useRouter();
  console.log('id', router);

  return (
    <div className="container mx-auto p-4 space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center space-y-0 space-x-4">
          <Avatar className="w-20 h-20">
            <AvatarImage src={student.avatar} alt={student.name} />
            <AvatarFallback>
              {student.name
                .split(' ')
                .map((n) => n[0])
                .join('')}
            </AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-2xl">{student.name}</CardTitle>
            <CardDescription>Student ID: {student.id}</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <span>{student.email}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <span>{student.phone}</span>
            </div>
          </div>
          <Separator />
          <div>
            <h3 className="font-semibold text-lg mb-2 flex items-center">
              <Book className="h-5 w-5 mr-2" />
              Registered Courses
            </h3>
            <div className="grid gap-4">
              {student.registeredCourses.map((course) => (
                <Card key={course.id}>
                  <CardHeader className="py-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-base">
                          {course.name}
                        </CardTitle>
                        <CardDescription>Level: {course.level}</CardDescription>
                      </div>
                      <Badge variant="secondary">
                        {course.progress}% Complete
                      </Badge>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
          <Separator />
          <div>
            <h3 className="font-semibold text-lg mb-2 flex items-center">
              <Calendar className="h-5 w-5 mr-2" />
              Registered Classes
            </h3>
            <div className="grid gap-4">
              {student.registeredClasses.map((cls) => (
                <Card key={cls.id}>
                  <CardHeader className="py-4">
                    <CardTitle className="text-base">{cls.name}</CardTitle>
                    <CardDescription>
                      <div>{cls.schedule}</div>
                      <div>Teacher: {cls.teacher}</div>
                    </CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
          <Separator />
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <DollarSign className="h-5 w-5 text-muted-foreground" />
              <span className="text-lg font-semibold">Total Amount Paid</span>
            </div>
            <span className="text-2xl font-bold">
              ${student.totalPaid.toFixed(2)}
            </span>
          </div>
        </CardContent>
      </Card>
      <div className="flex justify-end space-x-4">
        <Button variant="outline">
          <User className="h-4 w-4 mr-2" />
          Edit Profile
        </Button>
        <Button>
          <GraduationCap className="h-4 w-4 mr-2" />
          View Progress Report
        </Button>
      </div>
    </div>
  );
}
