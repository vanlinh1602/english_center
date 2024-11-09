import { Book, Calendar, GraduationCap, Mail, Phone, Star } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export default function TeacherInfo({
  teacher = {
    id: 'T1001',
    name: 'Dr. Emily Johnson',
    avatar: 'https://i.pravatar.cc/300?img=47',
    email: 'emily.johnson@englishcenter.com',
    phone: '+1 (555) 123-4567',
    qualifications: [
      'Ph.D. in Applied Linguistics, Stanford University',
      'CELTA Certification',
      '10+ years of teaching experience',
    ],
    specializations: [
      'Business English',
      'IELTS Preparation',
      'Academic Writing',
    ],
    bio: 'Dr. Emily Johnson is a passionate educator with over a decade of experience in teaching English as a second language. Her research focuses on innovative teaching methodologies and cross-cultural communication.',
    courses: [
      {
        id: 'C1',
        name: 'Advanced Business English',
        level: 'C1',
        students: 15,
      },
      { id: 'C2', name: 'IELTS Preparation', level: 'B2-C1', students: 20 },
      {
        id: 'C3',
        name: 'Academic Writing Workshop',
        level: 'B2',
        students: 12,
      },
    ],
    schedule: [
      { day: 'Monday', slots: ['09:00 - 11:00', '14:00 - 16:00'] },
      { day: 'Wednesday', slots: ['09:00 - 11:00', '14:00 - 16:00'] },
      { day: 'Friday', slots: ['10:00 - 12:00', '15:00 - 17:00'] },
    ],
    ratings: {
      overall: 4.8,
      knowledge: 4.9,
      communication: 4.7,
      punctuality: 4.8,
    },
  },
}) {
  return (
    <div className="container mx-auto p-4 space-y-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center gap-4">
              <Avatar className="w-24 h-24">
                <AvatarImage src={teacher.avatar} alt={teacher.name} />
                <AvatarFallback>
                  {teacher.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')}
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-3xl">{teacher.name}</CardTitle>
                <CardDescription className="text-lg">
                  Teacher ID: {teacher.id}
                </CardDescription>
              </div>
            </div>
            <div className="flex flex-col items-end gap-2">
              <div className="flex items-center">
                <Star className="w-5 h-5 text-yellow-400 mr-1" />
                <span className="font-bold text-lg">
                  {teacher.ratings.overall}
                </span>
                <span className="text-muted-foreground ml-1">/ 5</span>
              </div>
              <Badge variant="outline">Top Rated</Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <Mail className="h-5 w-5 text-muted-foreground" />
              <span>{teacher.email}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Phone className="h-5 w-5 text-muted-foreground" />
              <span>{teacher.phone}</span>
            </div>
          </div>

          <Separator />

          <div>
            <h3 className="font-semibold text-lg mb-2 flex items-center">
              <GraduationCap className="h-5 w-5 mr-2" />
              Qualifications & Specializations
            </h3>
            <ul className="list-disc list-inside space-y-1">
              {teacher.qualifications.map((qual, index) => (
                <li key={index}>{qual}</li>
              ))}
            </ul>
            <div className="mt-2 flex flex-wrap gap-2">
              {teacher.specializations.map((spec, index) => (
                <Badge key={index} variant="secondary">
                  {spec}
                </Badge>
              ))}
            </div>
          </div>

          <Separator />

          <div>
            <h3 className="font-semibold text-lg mb-2">Bio</h3>
            <p>{teacher.bio}</p>
          </div>

          <Separator />

          <div>
            <h3 className="font-semibold text-lg mb-2 flex items-center">
              <Book className="h-5 w-5 mr-2" />
              Courses Taught
            </h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Course Name</TableHead>
                  <TableHead>Level</TableHead>
                  <TableHead>Students</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {teacher.courses.map((course) => (
                  <TableRow key={course.id}>
                    <TableCell className="font-medium">{course.name}</TableCell>
                    <TableCell>{course.level}</TableCell>
                    <TableCell>{course.students}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <Separator />

          <div>
            <h3 className="font-semibold text-lg mb-2 flex items-center">
              <Calendar className="h-5 w-5 mr-2" />
              Teaching Schedule
            </h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Day</TableHead>
                  <TableHead>Time Slots</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {teacher.schedule.map((day, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{day.day}</TableCell>
                    <TableCell>{day.slots.join(', ')}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <Separator />

          <div>
            <h3 className="font-semibold text-lg mb-2 flex items-center">
              <Star className="h-5 w-5 mr-2" />
              Teacher Ratings
            </h3>
            <div className="space-y-2">
              {Object.entries(teacher.ratings).map(([key, value]) => (
                <div key={key} className="flex items-center">
                  <span className="w-32 capitalize">{key}:</span>
                  <Progress value={value * 20} className="w-full max-w-xs" />
                  <span className="ml-2">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">
            <Calendar className="h-4 w-4 mr-2" />
            Book a Class
          </Button>
          <Button variant="outline">
            <Mail className="h-4 w-4 mr-2" />
            Contact Teacher
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
