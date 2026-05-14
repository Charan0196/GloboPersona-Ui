'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Header from '@/components/layout/Header';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import { 
  Plus, 
  Search, 
  Filter, 
  Upload,
  Users,
  Mail,
  Star,
  TrendingUp,
  MoreVertical
} from 'lucide-react';

export default function EmailListsPage() {
  const router = useRouter();
  const stats = [
    { label: 'Total Lists', value: '7', sublabel: 'Active campaigns', color: 'bg-blue-100 text-blue-600', icon: Mail },
    { label: 'Total Contacts', value: '74', sublabel: 'Valid contacts', color: 'bg-green-100 text-green-600', icon: Users },
    { label: 'Avg. Quality', value: '40%', sublabel: 'Data quality score', color: 'bg-yellow-100 text-yellow-600', icon: Star },
    { label: 'Open Rate', value: '0%', sublabel: 'Average opens', color: 'bg-purple-100 text-purple-600', icon: TrendingUp },
  ];

  const emailLists = [
    {
      id: 1,
      name: 'final test',
      description: 'No description provided',
      status: 'active',
      quality: 'poor',
      contacts: 5,
      validContacts: 5,
      openRate: 0,
      clickRate: 0,
      createdAt: 'Just now'
    },
    {
      id: 2,
      name: 'madhu',
      description: 'No description provided',
      status: 'active',
      quality: 'poor',
      contacts: 24,
      validContacts: 24,
      openRate: 0,
      clickRate: 0,
      createdAt: 'Just now'
    },
    {
      id: 3,
      name: 'test vercel',
      description: 'No description provided',
      status: 'active',
      quality: 'poor',
      contacts: 24,
      validContacts: 24,
      openRate: 0,
      clickRate: 0,
      createdAt: 'Just now'
    },
  ];

  return (
    <DashboardLayout>
      <Header 
        title="Email Lists" 
        subtitle="Welcome back, ravi! Manage your email campaigns"
        actions={
          <Button size="md" onClick={() => alert('Upload Email List functionality coming soon!')}>
            <Upload className="w-4 h-4" />
            Upload Email List
          </Button>
        }
      />
      
      <div className="p-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</p>
                  <p className="text-sm text-gray-500">{stat.sublabel}</p>
                </div>
                <div className={`p-3 rounded-lg ${stat.color}`}>
                  <stat.icon className="w-6 h-6" />
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Search and Filters */}
        <Card className="mb-6">
          <div className="p-4 flex items-center gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search lists by name, description, or tags..."
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
            <select className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500">
              <option>All Status</option>
              <option>Active</option>
              <option>Inactive</option>
            </select>
            <Button variant="outline" size="md">
              <Filter className="w-4 h-4" />
              Filters
            </Button>
          </div>
        </Card>

        {/* Email Lists Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {emailLists.map((list) => (
            <Card key={list.id} hover className="overflow-hidden">
              {/* Header with gradient */}
              <div className="h-2 bg-gradient-to-r from-blue-400 to-purple-600" />
              
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="success" size="sm">{list.status}</Badge>
                      <Badge 
                        variant={list.quality === 'poor' ? 'warning' : 'success'} 
                        size="sm"
                      >
                        {list.quality}
                      </Badge>
                    </div>
                    <h3 className="font-semibold text-gray-900 text-lg mb-1">{list.name}</h3>
                    <p className="text-sm text-gray-500">{list.description}</p>
                  </div>
                  <button className="p-1 hover:bg-gray-100 rounded">
                    <MoreVertical className="w-4 h-4 text-gray-500" />
                  </button>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-600">Valid Contacts</span>
                    </div>
                    <span className="font-semibold text-gray-900">{list.validContacts}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-600">Total Contacts</span>
                    </div>
                    <span className="font-semibold text-gray-900">{list.contacts}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-4 border-t border-gray-200">
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Open Rate</p>
                    <p className="text-lg font-bold text-gray-900">{list.openRate}%</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Click Rate</p>
                    <p className="text-lg font-bold text-gray-900">{list.clickRate}%</p>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200 flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1" onClick={() => alert('Create Segment functionality coming soon!')}>
                    <Users className="w-4 h-4" />
                    Create Segment
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1" onClick={() => router.push('/campaigns/create')}>
                    <Mail className="w-4 h-4" />
                    Start Campaign
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
