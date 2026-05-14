'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Header from '@/components/layout/Header';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { Plus, Users } from 'lucide-react';

export default function ContactsPage() {
  const router = useRouter();
  
  return (
    <DashboardLayout>
      <Header 
        title="Contacts" 
        subtitle="Manage your contact database"
        actions={
          <Button size="md" onClick={() => alert('Add Contact functionality coming soon!')}>
            <Plus className="w-4 h-4" />
            Add Contact
          </Button>
        }
      />
      
      <div className="p-8">
        <Card className="p-12 text-center">
          <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Contacts Management</h3>
          <p className="text-gray-600 mb-6">This page will display and manage all your contacts</p>
          <Button onClick={() => alert('Import Contacts functionality coming soon!')}>Import Contacts</Button>
        </Card>
      </div>
    </DashboardLayout>
  );
}
