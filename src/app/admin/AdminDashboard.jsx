import React, { useState } from 'react';
import Sidebar from './Sidebar';
import UserTable from './UserTable';
import FinanceSection from './FinanceSection';
import SecuritySection from './SecuritySection';
import SystemTools from './SystemTools';
import OptionalFeatures from './OptionalFeatures';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('users');

  return (
    <div className="flex h-screen">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="flex-1 p-4 overflow-y-auto">
        <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="finance">Finance</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="system">System</TabsTrigger>
            <TabsTrigger value="optional">Optional</TabsTrigger>
          </TabsList>

          <TabsContent value="users"><UserTable /></TabsContent>
          <TabsContent value="finance"><FinanceSection /></TabsContent>
          <TabsContent value="security"><SecuritySection /></TabsContent>
          <TabsContent value="system"><SystemTools /></TabsContent>
          <TabsContent value="optional"><OptionalFeatures /></TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
