'use client';

import React, { useState } from 'react';
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
  Grid3x3, 
  List,
  MoreVertical,
  Users,
  Mail,
  TrendingUp
} from 'lucide-react';

export default function CampaignsPage() {
  const router = useRouter();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  const campaigns = [
    {
      id: 1,
      name: 'test final',
      description: 'No description available',
      status: 'draft',
      type: 'AI Personalized',
      recipients: 5,
      openRate: 0,
      clickRate: 0,
      sent: 0,
      opened: 0,
      clicked: 0,
      createdAt: 'Just now'
    },
    {
      id: 2,
      name: 'madhu hero',
      description: 'No description available',
      status: 'draft',
      type: 'AI Personalized',
      recipients: 5,
      openRate: 0,
      clickRate: 0,
      sent: 0,
      opened: 0,
      clicked: 0,
      createdAt: 'Just now'
    },
    {
      id: 3,
      name: 'ravi kojja',
      description: 'No description available',
      status: 'completed',
      type: 'AI Personalized',
      recipients: 5,
      openRate: 120.0,
      clickRate: 0,
      sent: 5,
      opened: 6,
      clicked: 0,
      createdAt: 'Just now'
    },
  ];

  const stats = [
    { label: 'Total Campaigns', value: '11', sublabel: 'All campaigns', color: 'bg-blue-100 text-blue-600' },
    { label: 'Manual Campaigns', value: '0', sublabel: 'User created', color: 'bg-green-100 text-green-600' },
    { label: 'AI Campaigns', value: '11', sublabel: 'AI personalized', color: 'bg-purple-100 text-purple-600' },
    { label: 'Total Recipients', value: '55', sublabel: 'Total contacts', color: 'bg-orange-100 text-orange-600' },
  ];

  return (
    <DashboardLayout>
      <Header 
        title="Email Campaigns" 
        subtitle="Create, manage, and track your email marketing campaigns"
        actions={
          <Button size="md" onClick={() => router.push('/campaigns/create')}>
            <Plus className="w-4 h-4" />
            New Campaign
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
                  {index === 0 && <Mail className="w-6 h-6" />}
                  {index === 1 && <Grid3x3 className="w-6 h-6" />}
                  {index === 2 && <TrendingUp className="w-6 h-6" />}
                  {index === 3 && <Users className="w-6 h-6" />}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Filters and View Toggle */}
        <Card className="mb-6">
          <div className="p-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 flex-1">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search campaigns by name, description, or email list..."
                  className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              <select className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500">
                <option>All Status</option>
                <option>Draft</option>
                <option>Active</option>
                <option>Completed</option>
              </select>
              <select className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500">
                <option>All Types</option>
                <option>AI Personalized</option>
                <option>Standard</option>
              </select>
              <Button variant="outline" size="md">
                <Filter className="w-4 h-4" />
                Filters
              </Button>
            </div>
            
            <div className="flex items-center gap-2 border border-gray-300 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded ${viewMode === 'grid' ? 'bg-primary-100 text-primary-600' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                <Grid3x3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded ${viewMode === 'list' ? 'bg-primary-100 text-primary-600' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </Card>

        {/* Campaigns Grid */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {campaigns.map((campaign) => (
              <Card key={campaign.id} hover className="overflow-hidden">
                {/* Header with gradient */}
                <div className={`h-2 ${
                  campaign.status === 'completed' ? 'bg-gradient-to-r from-green-400 to-green-600' :
                  campaign.status === 'draft' ? 'bg-gradient-to-r from-gray-400 to-gray-600' :
                  'bg-gradient-to-r from-blue-400 to-blue-600'
                }`} />
                
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant={campaign.status === 'completed' ? 'success' : 'default'} size="sm">
                          {campaign.status}
                        </Badge>
                        <Badge variant="purple" size="sm">
                          {campaign.type}
                        </Badge>
                      </div>
                      <h3 className="font-semibold text-gray-900 text-lg mb-1">{campaign.name}</h3>
                      <p className="text-sm text-gray-500">{campaign.description}</p>
                    </div>
                    <button className="p-1 hover:bg-gray-100 rounded">
                      <MoreVertical className="w-4 h-4 text-gray-500" />
                    </button>
                  </div>

                  <div className="space-y-3 mb-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Recipients</span>
                      <span className="font-semibold text-gray-900">{campaign.recipients} contacts</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Open Rate</span>
                      <span className="font-semibold text-gray-900">{campaign.openRate}%</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3 pt-4 border-t border-gray-200">
                    <div className="text-center">
                      <p className="text-xs text-gray-600 mb-1">Sent</p>
                      <p className="text-lg font-bold text-gray-900">{campaign.sent}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-gray-600 mb-1">Opens</p>
                      <p className="text-lg font-bold text-gray-900">{campaign.opened}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-gray-600 mb-1">Clicks</p>
                      <p className="text-lg font-bold text-gray-900">{campaign.clicked}</p>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <p className="text-xs text-gray-500">{campaign.createdAt}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Campaign</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Recipients</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Sent</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Opens</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Clicks</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Open Rate</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-600 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {campaigns.map((campaign) => (
                    <tr key={campaign.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-medium text-gray-900">{campaign.name}</p>
                          <p className="text-sm text-gray-500">{campaign.description}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <Badge variant={campaign.status === 'completed' ? 'success' : 'default'} size="sm">
                          {campaign.status}
                        </Badge>
                      </td>
                      <td className="px-6 py-4">
                        <Badge variant="purple" size="sm">{campaign.type}</Badge>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">{campaign.recipients}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{campaign.sent}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{campaign.opened}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{campaign.clicked}</td>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">{campaign.openRate}%</td>
                      <td className="px-6 py-4 text-right">
                        <button className="p-1 hover:bg-gray-100 rounded">
                          <MoreVertical className="w-4 h-4 text-gray-500" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}
