'use client';

import {
  Book,
  Calendar,
  MoreHorizontal,
  Plus,
  Search,
  Users,
} from 'lucide-react';
import { useState } from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export default function ClassSection() {
  const [searchTerm, setSearchTerm] = useState('');
  const [classes, setClasses] = useState([
    {
      id: 1,
      name: 'Advanced English A',
      course: 'Advanced English',
      teacher: 'John Doe',
      schedule: 'Mon, Wed, Fri 10:00-12:00',
      students: 15,
      status: 'Active',
    },
    {
      id: 2,
      name: 'IELTS Preparation B',
      course: 'IELTS Preparation',
      teacher: 'Jane Smith',
      schedule: 'Tue, Thu 14:00-16:00',
      students: 12,
      status: 'Active',
    },
    {
      id: 3,
      name: 'Business English C',
      course: 'Business English',
      teacher: 'Mike Johnson',
      schedule: 'Mon, Wed 18:00-20:00',
      students: 10,
      status: 'Active',
    },
    {
      id: 4,
      name: 'Beginner English D',
      course: 'Beginner English',
      teacher: 'Sarah Brown',
      schedule: 'Tue, Thu, Sat 09:00-11:00',
      students: 18,
      status: 'Upcoming',
    },
    {
      id: 5,
      name: 'Conversational English E',
      course: 'Conversational English',
      teacher: 'David Wilson',
      schedule: 'Wed, Fri 16:00-18:00',
      students: 8,
      status: 'Active',
    },
  ]);

  const filteredClasses = classes.filter(
    (cls) =>
      cls.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cls.course.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cls.teacher.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const [isAddClassOpen, setIsAddClassOpen] = useState(false);
  const [newClass, setNewClass] = useState({
    name: '',
    course: '',
    teacher: '',
    schedule: '',
    status: 'Upcoming',
  });

  const handleAddClass = () => {
    if (
      newClass.name &&
      newClass.course &&
      newClass.teacher &&
      newClass.schedule
    ) {
      setClasses([
        ...classes,
        { ...newClass, id: classes.length + 1, students: 0 },
      ]);
      setNewClass({
        name: '',
        course: '',
        teacher: '',
        schedule: '',
        status: 'Upcoming',
      });
      setIsAddClassOpen(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Classes</CardTitle>
          <Dialog open={isAddClassOpen} onOpenChange={setIsAddClassOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" /> Add Class
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Class</DialogTitle>
                <DialogDescription>
                  Enter the details of the new class here.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input
                    id="name"
                    value={newClass.name}
                    onChange={(e) =>
                      setNewClass({ ...newClass, name: e.target.value })
                    }
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="course" className="text-right">
                    Course
                  </Label>
                  <Select
                    onValueChange={(value) =>
                      setNewClass({ ...newClass, course: value })
                    }
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select a course" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Advanced English">
                        Advanced English
                      </SelectItem>
                      <SelectItem value="IELTS Preparation">
                        IELTS Preparation
                      </SelectItem>
                      <SelectItem value="Business English">
                        Business English
                      </SelectItem>
                      <SelectItem value="Beginner English">
                        Beginner English
                      </SelectItem>
                      <SelectItem value="Conversational English">
                        Conversational English
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="teacher" className="text-right">
                    Teacher
                  </Label>
                  <Input
                    id="teacher"
                    value={newClass.teacher}
                    onChange={(e) =>
                      setNewClass({ ...newClass, teacher: e.target.value })
                    }
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="schedule" className="text-right">
                    Schedule
                  </Label>
                  <Input
                    id="schedule"
                    value={newClass.schedule}
                    onChange={(e) =>
                      setNewClass({ ...newClass, schedule: e.target.value })
                    }
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button onClick={handleAddClass}>Add Class</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <div className="flex items-center mb-4">
            <Search className="mr-2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search classes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Course</TableHead>
                <TableHead>Teacher</TableHead>
                <TableHead>Schedule</TableHead>
                <TableHead>Students</TableHead>
                <TableHead>Status</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredClasses.map((cls) => (
                <TableRow key={cls.id}>
                  <TableCell className="font-medium">{cls.name}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Book className="mr-2 h-4 w-4 text-muted-foreground" />
                      {cls.course}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Avatar className="h-8 w-8 mr-2">
                        <AvatarImage
                          src={`https://api.dicebear.com/6.x/initials/svg?seed=${cls.teacher}`}
                        />
                        <AvatarFallback>
                          {cls.teacher
                            .split(' ')
                            .map((n) => n[0])
                            .join('')}
                        </AvatarFallback>
                      </Avatar>
                      {cls.teacher}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                      {cls.schedule}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Users className="mr-2 h-4 w-4 text-muted-foreground" />
                      {cls.students}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        cls.status === 'Active'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {cls.status}
                    </div>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>View details</DropdownMenuItem>
                        <DropdownMenuItem>Edit class</DropdownMenuItem>
                        <DropdownMenuItem>Manage students</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600">
                          Cancel class
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
