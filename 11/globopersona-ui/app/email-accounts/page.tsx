'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Header from '@/components/layout/Header';
import Card, { CardHeader, CardBody } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import { 
  Plus, 
  Mail, 
  CheckCircle2, 
  Activity,
  Settings as SettingsIcon,
  Edit,
  Trash2
} from 'lucide-react';

export default function EmailAccountsPage() {
  const router = useRouter();
  const stats = [
    { label: 'Active Accounts', value: '3', sublabel: 'of 3 total', color: 'bg-green-100 text-green-600' },
    { label: 'Daily Limit', value: '300', sublabel: 'emails per day', color: 'bg-blue-100 text-blue-600' },
    { label: 'Sent Today', value: '0', sublabel: 'across all accounts', color: 'bg-purple-100 text-purple-600' },
    { label: 'Utilization', value: '0%', sublabel: 'of daily capacity', color: 'bg-orange-100 text-orange-600' },
  ];

  const emailAccounts = [
    {
      id: 1,
      email: 'madhu.k@globopersona.com',
      status: 'active',
      verified: true,
      protocol: 'SMTP/IMAP',
      sentToday: 0,
      dailyLimit: 100,
      lastUsed: '6/25/2025'
    },
    {
      id: 2,
      email: 'test@globopersona.com',
      status: 'active',
      verified: true,
      protocol: 'SMTP/IMAP',
      sentToday: 0,
      dailyLimit: 100,
      lastUsed: 'Never'
    },
    {
      id: 3,
      email: 'kotlamadhu0614@gmail.com',
      status: 'active',
      verified: true,
      protocol: 'Gmail OAuth',
      sentToday: 0,
      dailyLimit: 100,
      lastUsed: '6/25/2025'
    },
  ];

  return (
    <DashboardLayout>
      <Header 
        title="Email Configuration" 
        subtitle="Manage your email accounts and SMTP settings"
        actions={
          <Button size="md" onClick={() => alert('Add Email Account functionality coming soon!')}>
            <Plus className="w-4 h-4" />
            Add Email Account
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
                  {index === 0 && <CheckCircle2 className="w-6 h-6" />}
                  {index === 1 && <Mail className="w-6 h-6" />}
                  {index === 2 && <Activity className="w-6 h-6" />}
                  {index === 3 && <SettingsIcon className="w-6 h-6" />}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Email Accounts */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Email Accounts</h2>
                <p className="text-sm text-gray-600 mt-0.5">Manage your configured email accounts</p>
              </div>
              <Badge variant="info" size="sm">{emailAccounts.length} accounts</Badge>
            </div>
          </CardHeader>
          <CardBody className="p-0">
            <div className="divide-y divide-gray-200">
              {emailAccounts.map((account) => (
                <div key={account.id} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4 flex-1">
                      <div className="p-3 bg-primary-100 rounded-lg">
                        <Mail className="w-6 h-6 text-primary-600" />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold text-gray-900 text-lg">{account.email}</h3>
                          <Badge variant="success" size="sm">
                            <CheckCircle2 className="w-3 h-3 mr-1" />
                            {account.status}
                          </Badge>
                          {account.verified && (
                            <Badge variant="info" size="sm">Verified</Badge>
                          )}
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                          <div>
                            <p className="text-xs text-gray-600 mb-1">Protocol</p>
                            <p className="text-sm font-medium text-gray-900">{account.protocol}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-600 mb-1">Sent Today</p>
                            <p className="text-sm font-medium text-gray-900">
                              {account.sentToday}/{account.dailyLimit}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-600 mb-1">Daily Limit</p>
                            <p className="text-sm font-medium text-gray-900">{account.dailyLimit} emails</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-600 mb-1">Last Used</p>
                            <p className="text-sm font-medium text-gray-900">{account.lastUsed}</p>
                          </div>
                        </div>

                        {/* Usage Bar */}
                        <div className="mt-4">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs text-gray-600">Usage</span>
                            <span className="text-xs font-medium text-gray-900">
                              {((account.sentToday / account.dailyLimit) * 100).toFixed(0)}%
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-primary-600 h-2 rounded-full transition-all"
                              style={{ width: `${(account.sentToday / account.dailyLimit) * 100}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 ml-4">
                      <Button variant="ghost" size="sm" onClick={() => alert('View Activity functionality coming soon!')}>
                        <Activity className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => alert('Edit Account functionality coming soon!')}>
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => alert('Delete Account functionality coming soon!')}>
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      </div>
    </DashboardLayout>
  );
}
