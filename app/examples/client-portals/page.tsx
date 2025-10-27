'use client';

import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Section } from '@/components/Section';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { MotionReveal } from '@/components/MotionReveal';
import { FileText, Download, MessageCircle, User, Lock, CheckCircle, ArrowRight, Bell } from 'lucide-react';
import { useState } from 'react';

export default function ClientPortalsDemoPage() {
  const [selectedTab, setSelectedTab] = useState('documents');

  const documents = [
    { name: 'Project Proposal.pdf', date: '2024-10-20', size: '2.3 MB' },
    { name: 'Contract_Signed.pdf', date: '2024-10-18', size: '1.1 MB' },
    { name: 'Invoice_October.pdf', date: '2024-10-15', size: '156 KB' },
    { name: 'Design_Mockups.zip', date: '2024-10-12', size: '45.2 MB' },
  ];

  const messages = [
    { from: 'Jake (Harbonline)', time: '10:34 AM', message: 'Your new website design is ready for review. Check the Documents tab!' },
    { from: 'You', time: '9:52 AM', message: 'Can you update the homepage hero image?' },
    { from: 'Jake (Harbonline)', time: 'Yesterday', message: 'All changes are live now. Let me know what you think!' },
  ];

  const projectStatus = [
    { task: 'Design Homepage', status: 'complete' },
    { task: 'Build Contact Form', status: 'complete' },
    { task: 'Setup Hosting', status: 'in-progress' },
    { task: 'Launch Website', status: 'pending' },
  ];

  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <Section background="gradient" spacing="loose">
          <div className="max-w-4xl mx-auto text-center">
            <MotionReveal>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight mb-6">
                <span className="text-gradient">Client Portal</span>
                <br />
                Interactive Demo
              </h1>
            </MotionReveal>

            <MotionReveal delay={0.1}>
              <p className="text-lg md:text-xl text-text-secondary leading-relaxed mb-8 max-w-2xl mx-auto">
                Try a live client portal demo. See how clients can access documents, track project progress, and communicate—all in one secure place.
              </p>
            </MotionReveal>
          </div>
        </Section>

        {/* Demo Section */}
        <Section background="primary" spacing="normal">
          <div className="max-w-5xl mx-auto">
            <MotionReveal>
              <div className="text-center mb-8">
                <h2 className="text-2xl md:text-3xl font-semibold mb-2">Your Project Dashboard</h2>
                <p className="text-text-secondary">Demo: Website Development Portal</p>
              </div>
            </MotionReveal>

            {/* User Header */}
            <MotionReveal delay={0.1}>
              <Card variant="elevated" className="mb-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-accent-primary/20 flex items-center justify-center">
                      <User className="w-6 h-6 text-accent-primary" />
                    </div>
                    <div>
                      <div className="font-semibold">Welcome back, Sarah!</div>
                      <div className="text-sm text-text-secondary">Last login: Today at 10:15 AM</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Bell className="w-5 h-5 text-text-secondary" />
                    <div className="w-2 h-2 rounded-full bg-accent-primary"></div>
                  </div>
                </div>
              </Card>
            </MotionReveal>

            {/* Tabs */}
            <MotionReveal delay={0.2}>
              <Card variant="elevated">
                <div className="border-b border-white/10">
                  <div className="flex gap-6">
                    <button
                      onClick={() => setSelectedTab('documents')}
                      className={`pb-3 px-1 border-b-2 transition-colors ${
                        selectedTab === 'documents'
                          ? 'border-accent-primary text-text-primary'
                          : 'border-transparent text-text-secondary hover:text-text-primary'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4" />
                        <span>Documents</span>
                      </div>
                    </button>
                    <button
                      onClick={() => setSelectedTab('messages')}
                      className={`pb-3 px-1 border-b-2 transition-colors ${
                        selectedTab === 'messages'
                          ? 'border-accent-primary text-text-primary'
                          : 'border-transparent text-text-secondary hover:text-text-primary'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <MessageCircle className="w-4 h-4" />
                        <span>Messages</span>
                        <span className="text-xs bg-accent-primary text-white px-2 py-0.5 rounded-full">2</span>
                      </div>
                    </button>
                    <button
                      onClick={() => setSelectedTab('progress')}
                      className={`pb-3 px-1 border-b-2 transition-colors ${
                        selectedTab === 'progress'
                          ? 'border-accent-primary text-text-primary'
                          : 'border-transparent text-text-secondary hover:text-text-primary'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4" />
                        <span>Progress</span>
                      </div>
                    </button>
                  </div>
                </div>

                <div className="mt-6">
                  {/* Documents Tab */}
                  {selectedTab === 'documents' && (
                    <div className="space-y-3">
                      {documents.map((doc, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-4 rounded-lg bg-bg-secondary hover:bg-bg-tertiary transition-colors"
                        >
                          <div className="flex items-center gap-4">
                            <FileText className="w-5 h-5 text-accent-primary" />
                            <div>
                              <div className="font-medium">{doc.name}</div>
                              <div className="text-sm text-text-secondary">{doc.date} • {doc.size}</div>
                            </div>
                          </div>
                          <button className="p-2 hover:bg-white/5 rounded-lg transition-colors">
                            <Download className="w-5 h-5 text-text-secondary" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Messages Tab */}
                  {selectedTab === 'messages' && (
                    <div className="space-y-4">
                      {messages.map((msg, index) => (
                        <div
                          key={index}
                          className={`p-4 rounded-lg ${
                            msg.from === 'You' ? 'bg-accent-primary/10 ml-8' : 'bg-bg-secondary mr-8'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium text-sm">{msg.from}</span>
                            <span className="text-xs text-text-secondary">{msg.time}</span>
                          </div>
                          <p className="text-text-secondary">{msg.message}</p>
                        </div>
                      ))}
                      <div className="flex gap-2 mt-6">
                        <input
                          type="text"
                          placeholder="Type your message..."
                          className="flex-1 px-4 py-2 bg-bg-secondary rounded-lg border border-white/10 focus:border-accent-primary outline-none"
                        />
                        <Button variant="primary">Send</Button>
                      </div>
                    </div>
                  )}

                  {/* Progress Tab */}
                  {selectedTab === 'progress' && (
                    <div className="space-y-4">
                      <div className="mb-6">
                        <div className="flex justify-between text-sm mb-2">
                          <span>Project Progress</span>
                          <span className="text-accent-primary">50% Complete</span>
                        </div>
                        <div className="h-2 bg-bg-secondary rounded-full overflow-hidden">
                          <div className="h-full bg-accent-primary w-1/2"></div>
                        </div>
                      </div>

                      {projectStatus.map((item, index) => (
                        <div key={index} className="flex items-center justify-between p-4 bg-bg-secondary rounded-lg">
                          <div className="flex items-center gap-3">
                            {item.status === 'complete' && <CheckCircle className="w-5 h-5 text-green-500" />}
                            {item.status === 'in-progress' && <div className="w-5 h-5 rounded-full border-2 border-accent-primary border-t-transparent animate-spin"></div>}
                            {item.status === 'pending' && <div className="w-5 h-5 rounded-full border-2 border-white/20"></div>}
                            <span>{item.task}</span>
                          </div>
                          <span className={`text-sm px-3 py-1 rounded-full ${
                            item.status === 'complete' ? 'bg-green-500/20 text-green-500' :
                            item.status === 'in-progress' ? 'bg-accent-primary/20 text-accent-primary' :
                            'bg-white/5 text-text-secondary'
                          }`}>
                            {item.status === 'complete' ? 'Complete' : item.status === 'in-progress' ? 'In Progress' : 'Pending'}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </Card>
            </MotionReveal>
          </div>
        </Section>

        {/* Features Section */}
        <Section background="secondary" spacing="normal">
          <div className="max-w-4xl mx-auto">
            <MotionReveal>
              <h2 className="text-3xl md:text-4xl font-semibold mb-8 text-center">What This Demo Shows</h2>
            </MotionReveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <MotionReveal delay={0.1}>
                <Card variant="glass">
                  <Lock className="w-6 h-6 text-accent-primary mb-3" />
                  <h3 className="text-lg font-semibold mb-2">Secure Access</h3>
                  <p className="text-sm text-text-secondary">
                    Clients log in with their own credentials to access only their information.
                  </p>
                </Card>
              </MotionReveal>

              <MotionReveal delay={0.2}>
                <Card variant="glass">
                  <FileText className="w-6 h-6 text-accent-primary mb-3" />
                  <h3 className="text-lg font-semibold mb-2">Document Management</h3>
                  <p className="text-sm text-text-secondary">
                    Upload, organise, and share files�"contracts, invoices, deliverables, and more.
                  </p>
                </Card>
              </MotionReveal>

              <MotionReveal delay={0.3}>
                <Card variant="glass">
                  <MessageCircle className="w-6 h-6 text-accent-primary mb-3" />
                  <h3 className="text-lg font-semibold mb-2">Direct Communication</h3>
                  <p className="text-sm text-text-secondary">
                    Message clients directly in the portal�"no more scattered emails.
                  </p>
                </Card>
              </MotionReveal>
            </div>
          </div>
        </Section>

        {/* CTA Section */}
        <Section background="gradient" spacing="normal">
          <div className="max-w-3xl mx-auto text-center">
            <MotionReveal>
              <h2 className="text-3xl md:text-4xl font-semibold mb-4">
                Need a Client Portal?
              </h2>
              <p className="text-text-secondary text-lg mb-8">
                I can build a custom portal for your business�"file sharing, messaging, project tracking, invoicing, or whatever features help you work with clients better.
              </p>
              <Button href="/contact" size="lg">
                Let's Build Yours
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </MotionReveal>
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}
