import { BookOpen, Calendar, Users } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function Home() {
  const stats = [
    { title: 'Total Students', value: '1,234', icon: Users },
    { title: 'Active Courses', value: '56', icon: BookOpen },
    { title: 'Teachers', value: '38', icon: Users },
    { title: 'Upcoming Classes', value: '12', icon: Calendar },
  ];

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 mb-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
            <CardDescription>You have 3 new notifications</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
                <span>New student enrolled in Advanced English</span>
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-green-600 rounded-full mr-2"></span>
                <span>IELTS Preparation course starts tomorrow</span>
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-yellow-600 rounded-full mr-2"></span>
                <span>Teacher meeting scheduled for Friday</span>
              </li>
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Frequently used actions</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col space-y-2">
            <Button>Add New Student</Button>
            <Button variant="outline">Create Course</Button>
            <Button variant="outline">Schedule Class</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
