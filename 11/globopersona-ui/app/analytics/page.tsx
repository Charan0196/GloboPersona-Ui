'use client';

import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Header from '@/components/layout/Header';
import Card from '@/components/ui/Card';
import { BarChart3 } from 'lucide-react';

export default function AnalyticsPage() {
  return (
    <DashboardLayout>
      <Header 
        title="Analytics" 
        subtitle="Track your campaign performance and insights"
      />
      
      <div className="p-8">
        <Card className="p-12 text-center">
          <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Analytics Dashboard</h3>
          <p className="text-gray-600">Detailed analytics and reporting will be displayed here</p>
        </Card>
      </div>
    </DashboardLayout>
  );
}
