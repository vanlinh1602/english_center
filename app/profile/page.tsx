'use client';

import {
  Briefcase,
  Calendar,
  Edit2,
  Mail,
  MapPin,
  Phone,
  Save,
} from 'lucide-react';
import { useState } from 'react';

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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

// Mock user data
const initialUserData = {
  name: 'Alice Johnson',
  email: 'alice.johnson@example.com',
  phone: '+1 (555) 123-4567',
  role: 'Student',
  joinDate: 'September 2023',
  location: 'New York, USA',
  bio: 'Passionate language learner with a focus on business English. Always eager to improve my communication skills and expand my cultural knowledge.',
  avatar: 'https://i.pravatar.cc/150?img=5',
};

export default function UserProfile() {
  const [userData, setUserData] = useState(initialUserData);
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState(userData);

  const handleEdit = () => {
    setIsEditing(true);
    setEditedData(userData);
  };

  const handleSave = () => {
    setUserData(editedData);
    setIsEditing(false);
    // Here you would typically make an API call to update the user data in the backend
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setEditedData({ ...editedData, [e.target.name]: e.target.value });
  };

  return (
    <div className="container mx-auto p-4">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-3xl">Profile Information</CardTitle>
            {!isEditing && (
              <Button variant="outline" onClick={handleEdit}>
                <Edit2 className="mr-2 h-4 w-4" />
                Edit Profile
              </Button>
            )}
          </div>
          <CardDescription>
            View and manage your personal information
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Avatar className="w-24 h-24">
              <AvatarImage src={userData.avatar} alt={userData.name} />
              <AvatarFallback>
                {userData.name
                  .split(' ')
                  .map((n) => n[0])
                  .join('')}
              </AvatarFallback>
            </Avatar>
            <div className="space-y-1 text-center sm:text-left">
              {isEditing ? (
                <Input
                  name="name"
                  value={editedData.name}
                  onChange={handleInputChange}
                  className="text-2xl font-bold"
                />
              ) : (
                <h2 className="text-2xl font-bold">{userData.name}</h2>
              )}
              <p className="text-muted-foreground">{userData.role}</p>
            </div>
          </div>

          <div className="grid gap-4">
            <div className="flex items-center space-x-4">
              <Mail className="h-5 w-5 text-muted-foreground" />
              {isEditing ? (
                <Input
                  name="email"
                  value={editedData.email}
                  onChange={handleInputChange}
                  className="flex-grow"
                />
              ) : (
                <span>{userData.email}</span>
              )}
            </div>
            <div className="flex items-center space-x-4">
              <Phone className="h-5 w-5 text-muted-foreground" />
              {isEditing ? (
                <Input
                  name="phone"
                  value={editedData.phone}
                  onChange={handleInputChange}
                  className="flex-grow"
                />
              ) : (
                <span>{userData.phone}</span>
              )}
            </div>
            <div className="flex items-center space-x-4">
              <Briefcase className="h-5 w-5 text-muted-foreground" />
              <span>{userData.role}</span>
            </div>
            <div className="flex items-center space-x-4">
              <Calendar className="h-5 w-5 text-muted-foreground" />
              <span>Joined {userData.joinDate}</span>
            </div>
            <div className="flex items-center space-x-4">
              <MapPin className="h-5 w-5 text-muted-foreground" />
              {isEditing ? (
                <Input
                  name="location"
                  value={editedData.location}
                  onChange={handleInputChange}
                  className="flex-grow"
                />
              ) : (
                <span>{userData.location}</span>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            {isEditing ? (
              <Textarea
                id="bio"
                name="bio"
                value={editedData.bio}
                onChange={handleInputChange}
                rows={4}
              />
            ) : (
              <p className="text-sm text-muted-foreground">{userData.bio}</p>
            )}
          </div>
        </CardContent>
        {isEditing && (
          <CardFooter>
            <Button onClick={handleSave} className="ml-auto">
              <Save className="mr-2 h-4 w-4" />
              Save Changes
            </Button>
          </CardFooter>
        )}
      </Card>
    </div>
  );
}
