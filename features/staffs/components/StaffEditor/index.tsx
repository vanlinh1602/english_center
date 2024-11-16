import { useState } from 'react';

import { Button } from '@/components/ui/button';
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';

import { Staff } from '../../types';

type Props = {
  staff?: Partial<Staff>;
  onCancel: () => void;
  onSave: (staff: Omit<Staff, 'id'>, id?: string) => void;
};

const StaffEditor = ({ staff, onCancel, onSave }: Props) => {
  const [edit, setEdit] = useState<Partial<Staff>>(staff || {});

  const handleAddStaff = () => {
    if (!edit?.name || !edit.role || !edit?.email) {
      toast({
        title: 'Error',
        description: 'Please fill in all the required fields',
        variant: 'destructive',
      });
      return;
    }
    const staffUpdate: Omit<Staff, 'id'> = {
      ...staff,
      name: edit.name,
      role: edit.role || '',
      email: edit.email,
      gender: edit.gender || '',
      address: edit.address || '',
      phone: edit.phone || '',
    };
    onSave(staffUpdate, staff?.id);
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
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Staff Member</DialogTitle>
          <DialogDescription>
            Enter the details of the new staff member here. Click save when
            you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
              <span className="text-red-600">*</span>
            </Label>
            <Input
              id="name"
              name="name"
              value={edit.name}
              onChange={(e) => setEdit({ ...edit, name: e.target.value })}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="role" className="text-right">
              Role
              <span className="text-red-600">*</span>
            </Label>
            <Select
              value={edit.role}
              onValueChange={(value) => setEdit({ ...edit, role: value })}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select a role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="admin" key="admin">
                  Admin
                </SelectItem>
                <SelectItem value="staff" key="staff">
                  Staff
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              Email
              <span className="text-red-600">*</span>
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={edit.email}
              onChange={(e) => setEdit({ ...edit, email: e.target.value })}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="phone" className="text-right">
              Phone
            </Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              value={edit.phone}
              onChange={(e) => setEdit({ ...edit, phone: e.target.value })}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleAddStaff}>
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default StaffEditor;
