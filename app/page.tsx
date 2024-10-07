'use client';
import {
  Bell,
  BookOpen,
  Calendar,
  Layout,
  LogOut,
  Settings,
  Users,
} from 'lucide-react';
import { useState } from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function Home() {
  const [activeTab, setActiveTab] = useState('Dashboard');
  const stats = [
    { title: 'Total Students', value: '1,234', icon: Users },
    { title: 'Active Courses', value: '56', icon: BookOpen },
    { title: 'Teachers', value: '38', icon: Users },
    { title: 'Upcoming Classes', value: '12', icon: Calendar },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r">
        <div className="flex items-center justify-center h-16 border-b">
          <span className="text-2xl font-bold text-blue-600">EduCenter</span>
        </div>
        <nav className="flex-grow">
          {[
            'Dashboard',
            'Students',
            'Courses',
            'Teachers',
            'Schedule',
            'Reports',
          ].map((item) => (
            <button
              key={item}
              className={`flex items-center px-6 py-3 text-gray-700 w-full ${
                activeTab === item ? 'bg-blue-50 text-blue-600' : ''
              }`}
              onClick={() => setActiveTab(item)}
            >
              {item === 'Dashboard' && <Layout className="mr-3 h-5 w-5" />}
              {item === 'Students' && <Users className="mr-3 h-5 w-5" />}
              {item === 'Courses' && <BookOpen className="mr-3 h-5 w-5" />}
              {item === 'Teachers' && <Users className="mr-3 h-5 w-5" />}
              {item === 'Schedule' && <Calendar className="mr-3 h-5 w-5" />}
              {item === 'Reports' && <Layout className="mr-3 h-5 w-5" />}
              {item}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="flex items-center justify-between px-6 py-4 bg-white border-b">
          <div className="flex items-center">
            <h1 className="text-2xl font-semibold text-gray-800">
              {activeTab}
            </h1>
          </div>
          <div className="flex items-center">
            <Button variant="ghost" size="icon" className="mr-2">
              <Bell className="h-5 w-5" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-8 w-8 rounded-full"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src="https://act-upload.hoyoverse.com/event-ugc-hoyowiki/2024/07/24/15884296/d36e559a0a718d050fc2c911fa3d3365_8529512733030822447.png"
                      alt="User"
                    />
                    <AvatarFallback>AD</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuItem>
                  <Users className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Main content area */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
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
                  <CardDescription>
                    You have 3 new notifications
                  </CardDescription>
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
        </main>
      </div>
    </div>
  );
}
