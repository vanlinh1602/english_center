'use client';

import { onAuthStateChanged } from 'firebase/auth';
import _ from 'lodash';
import {
  BookOpen,
  Calendar,
  Layout,
  LogOut,
  UserRoundCog,
  Users,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { useShallow } from 'zustand/shallow';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useUserStore } from '@/features/user/hooks';
import { auth } from '@/lib/firebase';

type Props = {
  children: React.ReactNode;
};

export const MainLayout = ({ children }: Props) => {
  const pathName = usePathname();
  const [currentTab, setCurrentTab] = useState('/');
  const router = useRouter();

  const { user, role, login, singOut } = useUserStore(
    useShallow((state) => ({
      user: state.user,
      role: state.role,
      login: state.login,
      singOut: state.signOut,
    }))
  );

  const activeTab = useMemo(() => {
    const tab = pathName.split('/')[1];
    return tab === '' ? 'dashboard' : tab;
  }, [pathName]);

  useEffect(() => {
    if (!user && activeTab !== 'login') {
      router.push('/login');
      setCurrentTab(pathName);
    }
    return onAuthStateChanged(auth, (userData) => {
      if (userData) {
        login();
      }
    });
  }, [activeTab]);

  useEffect(() => {
    if (user && activeTab === 'login') {
      router.push(currentTab);
    }
  }, [user]);

  if (activeTab === 'login') {
    return <>{children}</>;
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="hidden md:flex flex-col w-64 bg-white border-r">
        <div className="flex items-center justify-center h-16 border-b">
          <span className="text-2xl font-bold text-primary">
            English Center
          </span>
        </div>
        <nav className="flex-grow">
          {[
            'dashboard',
            // 'Schedule',
            'courses',
            'classrooms',
            'students',
            'teachers',
            'reports',
            // 'Revenue',
            ...(role === 'admin' ? ['staffs'] : []),
          ].map((item) => (
            <Link
              href={item === 'dashboard' ? '/' : `/${item.toLowerCase()}`}
              key={item}
              className={`flex items-center px-6 py-3 text-gray-700 w-full ${
                activeTab === item ? 'bg-blue-50 text-blue-600' : ''
              }`}
            >
              {item === 'dashboard' && <Layout className="mr-3 h-5 w-5" />}
              {item === 'students' && <Users className="mr-3 h-5 w-5" />}
              {item === 'courses' && <BookOpen className="mr-3 h-5 w-5" />}
              {item === 'teachers' && <Users className="mr-3 h-5 w-5" />}
              {item === 'schedule' && <Calendar className="mr-3 h-5 w-5" />}
              {item === 'reports' && <Layout className="mr-3 h-5 w-5" />}
              {item === 'classrooms' && <Layout className="mr-3 h-5 w-5" />}
              {item === 'revenue' && <Layout className="mr-3 h-5 w-5" />}
              {item === 'staffs' && <UserRoundCog className="mr-3 h-5 w-5" />}
              {_.upperFirst(item)}
            </Link>
          ))}
        </nav>
      </aside>
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="flex items-center justify-between px-6 py-4 bg-white border-b h-16">
          <div className="flex items-center">
            <h1 className="text-2xl font-semibold text-gray-800">
              {_.upperFirst(activeTab || '')}
            </h1>
          </div>
          <div className="flex items-center">
            {/* <Button variant="ghost" size="icon" className="mr-2">
              <Bell className="h-5 w-5" />
            </Button> */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-8 w-8 rounded-full"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user?.avatar} alt="User" />
                    <AvatarFallback>
                      {user?.name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuItem onClick={() => router.push('/profile')}>
                  <Users className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                {/* <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem> */}
                <DropdownMenuItem
                  onClick={async () => {
                    await singOut();
                    router.replace('/login');
                  }}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Main content area */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          {children}
        </main>
      </div>
    </div>
  );
};
