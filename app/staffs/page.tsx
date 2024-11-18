'use client';

import { Edit, Trash2, UserPlus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useShallow } from 'zustand/shallow';

import { ConfirmModal } from '@/components/ComfirmModal';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import Waiting from '@/components/Waiting';
import { StaffEditor } from '@/features/staffs/components';
import { useStaffStore } from '@/features/staffs/hooks';
import { Staff } from '@/features/staffs/types';
import { useUserStore } from '@/features/user/hooks';

export default function ManagementStaffPage() {
  const router = useRouter();

  const { handling, staffs, getStaffs, deleteStaff, updateStaff, createStaff } =
    useStaffStore(
      useShallow((state) => ({
        handling: state.handling,
        staffs: state.staffs,
        getStaffs: state.getStaffs,
        createStaff: state.createStaff,
        updateStaff: state.updateStaff,
        deleteStaff: state.deleteStaff,
      }))
    );

  const { role } = useUserStore(
    useShallow((state) => ({
      role: state.role,
    }))
  );

  useEffect(() => {
    getStaffs();
  }, [getStaffs]);

  const [editStaff, setEditStaff] = useState<Partial<Staff>>();
  const [confirmDelete, setConfirmDelete] = useState<string>();

  if (role !== 'admin') {
    return (
      <div className="container mx-auto p-4 h-full items-center flex flex-col">
        <div className="text-center">
          <h1 className="text-3xl font-semibold">Unauthorized</h1>
          <p className="text-lg">You are not authorized to view this page</p>
        </div>
        <Button onClick={() => router.push('/')}>Go Home</Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 space-y-6">
      {handling ? <Waiting /> : null}
      {confirmDelete ? (
        <ConfirmModal
          title="Delete User"
          description="Are you sure you want to delete this user?. This action cannot be undone."
          onConfirm={() => {
            deleteStaff(confirmDelete);
            setConfirmDelete(undefined);
          }}
          onCancel={() => setConfirmDelete(undefined)}
        />
      ) : null}
      {editStaff ? (
        <StaffEditor
          staff={editStaff}
          onCancel={() => setEditStaff(undefined)}
          onSave={(staff) => {
            if (editStaff.id) {
              updateStaff(editStaff.id, staff);
            } else {
              createStaff(staff);
            }
            setEditStaff(undefined);
          }}
        />
      ) : null}
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">Management Staff</CardTitle>
          <CardDescription>
            Overview and management of English Center staff members.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Object.values(staffs ?? {}).map((staff) => (
                <TableRow key={staff.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarImage src={staff.avatar} />
                        <AvatarFallback>
                          {staff.name
                            .split(' ')
                            .map((n) => n[0])
                            .join('')}
                        </AvatarFallback>
                      </Avatar>
                      <span>{staff.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>{staff.role}</TableCell>
                  <TableCell>{staff.email}</TableCell>
                  <TableCell>{staff.phone}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setEditStaff(staff)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setConfirmDelete(staff.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter>
          <Button onClick={() => setEditStaff({})}>
            <UserPlus className="mr-2 h-4 w-4" />
            Add Staff Member
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
