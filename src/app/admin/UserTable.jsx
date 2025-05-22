import React, { useEffect, useState } from 'react';
import { collection, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../../firebase';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
} from '@/components/ui/table';

export default function UserTable() {
  const [users, setUsers] = useState([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const snapshot = await getDocs(collection(db, 'users'));
    setUsers(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
  };

  const handleStatusChange = async (id, newStatus) => {
    const userRef = doc(db, 'users', id);
    await updateDoc(userRef, { status: newStatus });
    fetchUsers();
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this user?');
    if (!confirmDelete) return;

    await deleteDoc(doc(db, 'users', id));
    fetchUsers();
  };

  const filteredUsers = users.filter(
    (u) =>
      u.firstName?.toLowerCase().includes(query.toLowerCase()) ||
      u.lastName?.toLowerCase().includes(query.toLowerCase()) ||
      u.email?.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <Card>
      <CardContent>
        <div className="flex gap-2 items-center mb-4">
          <Input
            placeholder="Search by name or email"
            className="w-64"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <Button onClick={() => setQuery('')}>Clear</Button>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>First Name</TableHead>
              <TableHead>Last Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.firstName}</TableCell>
                <TableCell>{user.lastName}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.status || 'active'}</TableCell>
                <TableCell className="space-x-2">
                  {user.status === 'suspended' ? (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleStatusChange(user.id, 'active')}
                    >
                      Reactivate
                    </Button>
                  ) : (
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleStatusChange(user.id, 'suspended')}
                    >
                      Suspend
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(user.id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
