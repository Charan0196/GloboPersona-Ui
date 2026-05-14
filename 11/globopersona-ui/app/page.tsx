'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Header from '@/components/layout/Header';
import StatCard from '@/components/ui/StatCard';
import Card, { CardHeader, CardBody } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import { 
  Mail, 
  Users, 
  Send, 
  TrendingUp, 
  Clock,
  CheckCircle2,
  AlertCircle,
  Plus
} from 'lucide-react';

export default function Dashboard() {
  const router = useRouter();
  
  const recentCampaigns = [
    { 
      id: 1, 
      name: 'Summer Sale 2024', 
      status: 'completed', 
      sent: 1250, 
      opened: 875, 
      clicked: 234,
      date: '2 hours ago'
    },
    { 
      id: 2, 
      name: 'Product Launch Newsletter', 
      status: 'active', 
      sent: 2100, 
      opened: 1456, 
      clicked: 412,
      date: '1 day ago'
    },
    { 
      id: 3, 
      name: 'Customer Feedback Survey', 
      status: 'draft', 
      sent: 0, 
      opened: 0, 
      clicked: 0,
      date: '3 days ago'
    },
  ];

  return (
    <DashboardLayout>
      <Header 
        title="Dashboard" 
        subtitle="Welcome back! Here's what's happening with your campaigns."
        actions={
          <Button size="md" onClick={() => router.push('/campaigns/create')}>
            <Plus className="w-4 h-4" />
            New Campaign
          </Button>
        }
      />
      
      <div className="p-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Campaigns"
            value="24"
            subtitle="8 active campaigns"
            icon={Send}
            iconColor="text-blue-600"
            iconBgColor="bg-blue-100"
            trend={{ value: '12%', isPositive: true }}
          />
          <StatCard
            title="Total Contacts"
            value="12,458"
            subtitle="2,341 new this month"
            icon={Users}
            iconColor="text-green-600"
            iconBgColor="bg-green-100"
            trend={{ value: '8%', isPositive: true }}
          />
          <StatCard
            title="Emails Sent"
            value="45,231"
            subtitle="This month"
            icon={Mail}
            iconColor="text-purple-600"
            iconBgColor="bg-purple-100"
            trend={{ value: '23%', isPositive: true }}
          />
          <StatCard
            title="Avg. Open Rate"
            value="42.5%"
            subtitle="Industry avg: 21.3%"
            icon={TrendingUp}
            iconColor="text-orange-600"
            iconBgColor="bg-orange-100"
            trend={{ value: '5%', isPositive: true }}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Campaigns */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">Recent Campaigns</h2>
                    <p className="text-sm text-gray-600 mt-0.5">Track your latest email campaigns</p>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => router.push('/campaigns')}>View All</Button>
                </div>
              </CardHeader>
              <CardBody className="p-0">
                <div className="divide-y divide-gray-200">
                  {recentCampaigns.map((campaign) => (
                    <div key={campaign.id} className="p-6 hover:bg-gray-50 transition-colors">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 mb-1">{campaign.name}</h3>
                          <div className="flex items-center gap-3 text-sm text-gray-600">
                            <span className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {campaign.date}
                            </span>
                          </div>
                        </div>
                        <Badge 
                          variant={
                            campaign.status === 'completed' ? 'success' : 
                            campaign.status === 'active' ? 'info' : 
                            'default'
                          }
                        >
                          {campaign.status}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4 mt-4">
                        <div>
                          <p className="text-xs text-gray-600 mb-1">Sent</p>
                          <p className="text-lg font-semibold text-gray-900">{campaign.sent.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-600 mb-1">Opened</p>
                          <p className="text-lg font-semibold text-gray-900">{campaign.opened.toLocaleString()}</p>
                          {campaign.sent > 0 && (
                            <p className="text-xs text-green-600 font-medium">
                              {((campaign.opened / campaign.sent) * 100).toFixed(1)}%
                            </p>
                          )}
                        </div>
                        <div>
                          <p className="text-xs text-gray-600 mb-1">Clicked</p>
                          <p className="text-lg font-semibold text-gray-900">{campaign.clicked.toLocaleString()}</p>
                          {campaign.sent > 0 && (
                            <p className="text-xs text-blue-600 font-medium">
                              {((campaign.clicked / campaign.sent) * 100).toFixed(1)}%
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardBody>
            </Card>
          </div>

          {/* Quick Actions & Activity */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <h2 className="text-lg font-semibold text-gray-900">Quick Actions</h2>
              </CardHeader>
              <CardBody className="space-y-3">
                <Button variant="outline" className="w-full justify-start" onClick={() => router.push('/campaigns/create')}>
                  <Send className="w-4 h-4" />
                  Create Campaign
                </Button>
                <Button variant="outline" className="w-full justify-start" onClick={() => router.push('/contacts')}>
                  <Users className="w-4 h-4" />
                  Add Contacts
                </Button>
                <Button variant="outline" className="w-full justify-start" onClick={() => router.push('/email-lists')}>
                  <Mail className="w-4 h-4" />
                  Upload Email List
                </Button>
              </CardBody>
            </Card>

            {/* System Status */}
            <Card>
              <CardHeader>
                <h2 className="text-lg font-semibold text-gray-900">System Status</h2>
              </CardHeader>
              <CardBody className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                    <span className="text-sm text-gray-700">Email Service</span>
                  </div>
                  <Badge variant="success" size="sm">Active</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                    <span className="text-sm text-gray-700">API Status</span>
                  </div>
                  <Badge variant="success" size="sm">Operational</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-yellow-600" />
                    <span className="text-sm text-gray-700">Daily Limit</span>
                  </div>
                  <Badge variant="warning" size="sm">75% Used</Badge>
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
