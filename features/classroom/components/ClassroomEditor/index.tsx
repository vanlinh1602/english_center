import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { useState } from 'react';
import { DateRange } from 'react-day-picker';
import { useShallow } from 'zustand/shallow';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useCourseStore } from '@/features/courses/hooks';
import { toast } from '@/hooks/use-toast';
import { classStatuses } from '@/lib/options';
import { cn } from '@/lib/utils';

import { Classroom } from '../../types';

type Props = {
  classroom?: Partial<Classroom>;
  onCancel: () => void;
  onSave: (classroom: Omit<Classroom, 'id'>, id?: string) => void;
};

const ClassroomEditor = ({ classroom, onCancel, onSave }: Props) => {
  const { courses } = useCourseStore(
    useShallow((state) => ({
      courses: state.courses,
    }))
  );

  const [edit, setEdit] = useState<Partial<Classroom>>(classroom || {});
  const [date, setDate] = useState<DateRange | undefined>({
    from: classroom?.dateStart ? new Date(classroom.dateStart) : new Date(),
    to: classroom?.dateEnd ? new Date(classroom.dateEnd) : undefined,
  });

  const handleSave = () => {
    if (!edit?.name || !edit?.course || !edit?.teacher) {
      toast({
        title: 'Error',
        description: 'Name, course, teacher, and schedule are required',
        variant: 'destructive',
      });
      return;
    }
    const classUpdate: Omit<Classroom, 'id'> = {
      name: edit.name,
      course: edit.course,
      teacher: edit.teacher,
      students: [],
      daysInWeek: [],
      hoursInDay: '',
      dateStart: date?.from?.getTime() || Date.now(),
      dateEnd: date?.to?.getTime() || Date.now(),
      status: edit.status || 'active',
    };
    onSave(classUpdate, classroom?.id);
  };

  return (
    <Dialog
      open={true}
      onOpenChange={(open) => {
        if (!open) {
          onCancel();
        }
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {classroom?.id ? 'Edit Class' : 'Add New Class'}
          </DialogTitle>
          <DialogDescription>
            Enter the details of the class here.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              value={edit.name}
              onChange={(e) => setEdit({ ...edit, name: e.target.value })}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="course" className="text-right">
              Course
            </Label>
            <Select
              onValueChange={(value) => setEdit({ ...edit, course: value })}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select a course" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(courses).map(([id, course]) => (
                  <SelectItem key={id} value={id}>
                    {course.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="teacher" className="text-right">
              Teacher
            </Label>
            <Input
              id="teacher"
              value={edit.teacher?.[0]}
              onChange={(e) => setEdit({ ...edit, teacher: [e.target.value] })}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="teacher" className="text-right">
              Schedule
            </Label>
            <Popover>
              <PopoverTrigger asChild className="col-span-3">
                <Button
                  variant={'outline'}
                  className={cn(
                    'justify-start text-left font-normal',
                    !date && 'text-muted-foreground col-span-3'
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date?.from ? (
                    date.to ? (
                      <>
                        {format(date.from, 'LLL dd, y')} -{' '}
                        {format(date.to, 'LLL dd, y')}
                      </>
                    ) : (
                      format(date.from, 'LLL dd, y')
                    )
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 col-span-3">
                <Calendar
                  className="w-full"
                  mode="range"
                  selected={date}
                  onSelect={(newDate) => setDate(newDate)}
                  initialFocus
                  numberOfMonths={2}
                />
              </PopoverContent>
            </Popover>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="course" className="text-right">
              Status
            </Label>
            <Select
              onValueChange={(value) => setEdit({ ...edit, status: value })}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select a course" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(classStatuses).map(([id, status]) => (
                  <SelectItem key={id} value={id}>
                    {status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSave}>
            {classroom?.id ? 'Save Changes' : 'Create Class'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ClassroomEditor;
