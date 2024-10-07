'use client';

import { DollarSign, MoreHorizontal, Plus, Search, Users } from 'lucide-react';
import { useState } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
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

export default function TuitionFeeSection() {
  const [searchTerm, setSearchTerm] = useState('');
  const [tuitionFees, setTuitionFees] = useState([
    {
      id: 1,
      course: 'Advanced English',
      duration: '12 weeks',
      fee: 1200,
      currency: 'USD',
      students: 15,
    },
    {
      id: 2,
      course: 'IELTS Preparation',
      duration: '8 weeks',
      fee: 1000,
      currency: 'USD',
      students: 20,
    },
    {
      id: 3,
      course: 'Business English',
      duration: '10 weeks',
      fee: 1100,
      currency: 'USD',
      students: 12,
    },
    {
      id: 4,
      course: 'Beginner English',
      duration: '16 weeks',
      fee: 1400,
      currency: 'USD',
      students: 18,
    },
    {
      id: 5,
      course: 'Conversational English',
      duration: '6 weeks',
      fee: 800,
      currency: 'USD',
      students: 10,
    },
  ]);

  const filteredTuitionFees = tuitionFees.filter((fee) =>
    fee.course.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const [isAddFeeOpen, setIsAddFeeOpen] = useState(false);
  const [newFee, setNewFee] = useState({
    course: '',
    duration: '',
    fee: '',
    currency: 'USD',
    students: 0,
  });

  const handleAddFee = () => {
    if (newFee.course && newFee.duration && newFee.fee) {
      setTuitionFees([
        ...tuitionFees,
        {
          ...newFee,
          id: tuitionFees.length + 1,
          fee: parseFloat(newFee.fee),
          students: parseInt(newFee.students as any),
        },
      ]);
      setNewFee({
        course: '',
        duration: '',
        fee: '',
        currency: 'USD',
        students: 0,
      });
      setIsAddFeeOpen(false);
    }
  };

  const chartData = tuitionFees.map((fee) => ({
    name: fee.course,
    revenue: fee.fee * fee.students,
  }));

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Revenue by Course</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              revenue: {
                label: 'Revenue',
                color: 'hsl(var(--chart-1))',
              },
            }}
            className="h-[300px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="revenue" fill="var(--color-revenue)" />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Tuition Fees</CardTitle>
          <Dialog open={isAddFeeOpen} onOpenChange={setIsAddFeeOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" /> Add Tuition Fee
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Tuition Fee</DialogTitle>
                <DialogDescription>
                  Enter the details of the new tuition fee here.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="course" className="text-right">
                    Course
                  </Label>
                  <Input
                    id="course"
                    value={newFee.course}
                    onChange={(e) =>
                      setNewFee({ ...newFee, course: e.target.value })
                    }
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="duration" className="text-right">
                    Duration
                  </Label>
                  <Input
                    id="duration"
                    value={newFee.duration}
                    onChange={(e) =>
                      setNewFee({ ...newFee, duration: e.target.value })
                    }
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="fee" className="text-right">
                    Fee
                  </Label>
                  <Input
                    id="fee"
                    type="number"
                    value={newFee.fee}
                    onChange={(e) =>
                      setNewFee({ ...newFee, fee: e.target.value })
                    }
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="currency" className="text-right">
                    Currency
                  </Label>
                  <Select
                    onValueChange={(value) =>
                      setNewFee({ ...newFee, currency: value })
                    }
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select currency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USD">USD</SelectItem>
                      <SelectItem value="EUR">EUR</SelectItem>
                      <SelectItem value="GBP">GBP</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="students" className="text-right">
                    Students
                  </Label>
                  <Input
                    id="students"
                    type="number"
                    value={newFee.students}
                    onChange={(e) =>
                      setNewFee({ ...newFee, students: e.target.value as any })
                    }
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button onClick={handleAddFee}>Add Tuition Fee</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <div className="flex items-center mb-4">
            <Search className="mr-2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Course</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Fee</TableHead>
                <TableHead>Students</TableHead>
                <TableHead>Total Revenue</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTuitionFees.map((fee) => (
                <TableRow key={fee.id}>
                  <TableCell className="font-medium">{fee.course}</TableCell>
                  <TableCell>{fee.duration}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <DollarSign className="mr-2 h-4 w-4 text-muted-foreground" />
                      {fee.fee.toLocaleString()} {fee.currency}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Users className="mr-2 h-4 w-4 text-muted-foreground" />
                      {fee.students}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center font-medium text-green-600">
                      <DollarSign className="mr-2 h-4 w-4" />
                      {(fee.fee * fee.students).toLocaleString()} {fee.currency}
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
                        <DropdownMenuItem>Edit fee</DropdownMenuItem>
                        <DropdownMenuItem>View details</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600">
                          Remove fee
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
