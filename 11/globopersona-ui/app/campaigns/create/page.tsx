'use client';

import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Header from '@/components/layout/Header';
import Card, { CardHeader, CardBody } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Badge from '@/components/ui/Badge';
import { ArrowLeft, ArrowRight, Sparkles, Mail, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export default function CreateCampaignPage() {
  const [step, setStep] = useState(1);
  const [campaignName, setCampaignName] = useState('');
  const [targetAudience, setTargetAudience] = useState('');
  const [approach, setApproach] = useState<'standard' | 'ai' | null>(null);

  const totalSteps = 3;
  const progress = (step / totalSteps) * 100;

  return (
    <DashboardLayout>
      <Header 
        title="Create New Campaign" 
        subtitle="Set up your campaign name and choose which audience to target"
      />
      
      <div className="p-8">
        <div className="max-w-5xl mx-auto">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Step {step} of {totalSteps}</span>
              <span className="text-sm font-medium text-gray-700">{Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {step === 1 && (
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <Mail className="w-5 h-5 text-primary-600" />
                      <h2 className="text-xl font-semibold text-gray-900">Campaign Details</h2>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">Enter your campaign information and select your target audience</p>
                  </CardHeader>
                  <CardBody className="space-y-6">
                    <Input
                      label="Campaign Name"
                      placeholder="e.g., Summer Sale 2024"
                      value={campaignName}
                      onChange={(e) => setCampaignName(e.target.value)}
                      helperText="Choose a descriptive name that helps you identify this campaign later"
                    />

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Target Audience
                      </label>
                      <select 
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                        value={targetAudience}
                        onChange={(e) => setTargetAudience(e.target.value)}
                      >
                        <option value="">Select which email list to send this campaign to</option>
                        <option value="final-test">final test (5 contacts)</option>
                        <option value="newsletter">Newsletter Subscribers (1,234 contacts)</option>
                        <option value="customers">Active Customers (856 contacts)</option>
                      </select>
                      {targetAudience && (
                        <p className="mt-2 text-sm text-gray-600">
                          <span className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            5 contacts
                          </span>
                        </p>
                      )}
                    </div>

                    <div className="pt-4 border-t border-gray-200">
                      <Button 
                        onClick={() => setStep(2)} 
                        disabled={!campaignName || !targetAudience}
                        className="w-full sm:w-auto"
                      >
                        Next: Choose Your Approach
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardBody>
                </Card>
              )}

              {step === 2 && (
                <Card>
                  <CardHeader>
                    <h2 className="text-xl font-semibold text-gray-900">Choose Your Approach</h2>
                    <p className="text-sm text-gray-600 mt-1">
                      How would you like to create content for "{campaignName}"?<br />
                      Select between standard content creation or AI-powered personalization
                    </p>
                  </CardHeader>
                  <CardBody className="space-y-4">
                    {/* Standard Content */}
                    <button
                      onClick={() => setApproach('standard')}
                      className={`w-full p-6 rounded-xl border-2 text-left transition-all ${
                        approach === 'standard' 
                          ? 'border-primary-500 bg-primary-50' 
                          : 'border-gray-200 hover:border-gray-300 bg-white'
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-gray-100 rounded-lg">
                          <Mail className="w-6 h-6 text-gray-700" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 text-lg mb-2">Standard Content</h3>
                          <p className="text-sm text-gray-600 mb-3">Single template for all recipients</p>
                          <ul className="space-y-2 text-sm text-gray-700">
                            <li className="flex items-center gap-2">
                              <CheckCircle2 className="w-4 h-4 text-green-600" />
                              Quick and easy setup
                            </li>
                            <li className="flex items-center gap-2">
                              <CheckCircle2 className="w-4 h-4 text-green-600" />
                              Consistent messaging
                            </li>
                            <li className="flex items-center gap-2">
                              <CheckCircle2 className="w-4 h-4 text-green-600" />
                              Perfect for announcements
                            </li>
                            <li className="flex items-center gap-2">
                              <CheckCircle2 className="w-4 h-4 text-green-600" />
                              Full content control
                            </li>
                          </ul>
                          <div className="mt-4 pt-4 border-t border-gray-200">
                            <p className="text-xs text-gray-600 font-medium">BEST FOR:</p>
                            <p className="text-xs text-gray-600">Newsletters, product launches, event invitations</p>
                          </div>
                        </div>
                      </div>
                    </button>

                    {/* AI Personalization */}
                    <button
                      onClick={() => setApproach('ai')}
                      className={`w-full p-6 rounded-xl border-2 text-left transition-all relative overflow-hidden ${
                        approach === 'ai' 
                          ? 'border-primary-500 bg-primary-50' 
                          : 'border-gray-200 hover:border-gray-300 bg-white'
                      }`}
                    >
                      <Badge variant="purple" size="sm" className="absolute top-4 right-4">
                        AI POWERED
                      </Badge>
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg">
                          <Sparkles className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 text-lg mb-2">AI Personalization</h3>
                          <p className="text-sm text-gray-600 mb-3">Tailored emails for each recipient</p>
                          <ul className="space-y-2 text-sm text-gray-700">
                            <li className="flex items-center gap-2">
                              <CheckCircle2 className="w-4 h-4 text-primary-600" />
                              Personalized subject lines
                            </li>
                            <li className="flex items-center gap-2">
                              <CheckCircle2 className="w-4 h-4 text-primary-600" />
                              Higher engagement rates
                            </li>
                            <li className="flex items-center gap-2">
                              <CheckCircle2 className="w-4 h-4 text-primary-600" />
                              Smart content recommendations
                            </li>
                            <li className="flex items-center gap-2">
                              <CheckCircle2 className="w-4 h-4 text-primary-600" />
                              Automated A/B testing
                            </li>
                          </ul>
                          <div className="mt-4 pt-4 border-t border-gray-200">
                            <p className="text-xs text-gray-600 font-medium">BEST FOR:</p>
                            <p className="text-xs text-gray-600">Sales outreach, customer retention, recommendations</p>
                            <div className="flex items-center gap-2 mt-2">
                              <Badge variant="info" size="sm">Better targeting</Badge>
                              <Badge variant="success" size="sm">Higher ROI</Badge>
                            </div>
                          </div>
                        </div>
                      </div>
                    </button>

                    <div className="flex items-center gap-3 pt-4 border-t border-gray-200">
                      <Button variant="outline" onClick={() => setStep(1)}>
                        <ArrowLeft className="w-4 h-4" />
                        Back
                      </Button>
                      <Button 
                        onClick={() => setStep(3)} 
                        disabled={!approach}
                        className="flex-1"
                      >
                        {approach === 'ai' ? 'Configure AI Assistant' : 'Create Email Content Template'}
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardBody>
                </Card>
              )}

              {step === 3 && (
                <Card>
                  <CardHeader>
                    <h2 className="text-xl font-semibold text-gray-900">Review & Launch</h2>
                    <p className="text-sm text-gray-600 mt-1">Review your campaign setup before launching</p>
                  </CardHeader>
                  <CardBody className="space-y-6">
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <div className="flex items-center gap-2 text-green-800 mb-2">
                        <CheckCircle2 className="w-5 h-5" />
                        <span className="font-semibold">Campaign Ready!</span>
                      </div>
                      <p className="text-sm text-green-700">Your campaign is configured and ready to launch.</p>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <p className="text-sm font-medium text-gray-600 mb-1">Campaign Name</p>
                        <p className="text-base text-gray-900">{campaignName}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-600 mb-1">Target Audience</p>
                        <p className="text-base text-gray-900">{targetAudience}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-600 mb-1">Approach</p>
                        <Badge variant={approach === 'ai' ? 'purple' : 'default'}>
                          {approach === 'ai' ? 'AI Personalization' : 'Standard Content'}
                        </Badge>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 pt-4 border-t border-gray-200">
                      <Button variant="outline" onClick={() => setStep(2)}>
                        <ArrowLeft className="w-4 h-4" />
                        Back
                      </Button>
                      <Link href="/campaigns" className="flex-1">
                        <Button className="w-full">
                          Launch Campaign
                        </Button>
                      </Link>
                    </div>
                  </CardBody>
                </Card>
              )}
            </div>

            {/* Campaign Preview Sidebar */}
            <div>
              <Card className="sticky top-24">
                <CardHeader>
                  <h3 className="font-semibold text-gray-900">Campaign Preview</h3>
                </CardHeader>
                <CardBody className="space-y-4">
                  <div>
                    <p className="text-xs font-medium text-gray-600 mb-1">CAMPAIGN NAME</p>
                    <p className="text-sm text-gray-900">{campaignName || 'Not set'}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-600 mb-1">TARGET AUDIENCE</p>
                    <p className="text-sm text-gray-900">{targetAudience || 'Not selected'}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-600 mb-1">PROGRESS</p>
                    <p className="text-sm text-gray-900">Step {step} of {totalSteps}</p>
                    <p className="text-xs text-gray-600 mt-1">{Math.round(progress)}% complete</p>
                  </div>
                  
                  <div className="pt-4 border-t border-gray-200">
                    <h4 className="text-xs font-medium text-gray-600 mb-2">NEXT STEPS</h4>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className={`w-4 h-4 ${step > 1 ? 'text-green-600' : 'text-gray-300'}`} />
                        <span className="text-xs text-gray-700">Choose Your Approach</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className={`w-4 h-4 ${step > 2 ? 'text-green-600' : 'text-gray-300'}`} />
                        <span className="text-xs text-gray-700">Review & Launch</span>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </div>
          </div>

          {/* Back to Campaigns */}
          <div className="mt-6">
            <Link href="/campaigns">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4" />
                Back to Campaigns
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

function Users({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  );
}
