'use client';

import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Section } from '@/components/Section';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { MotionReveal } from '@/components/MotionReveal';
import { TrendingUp, TrendingDown, Users, ShoppingCart, DollarSign, Eye, CheckCircle, ArrowRight } from 'lucide-react';

export default function DashboardsDemoPage() {
  const metrics = [
    { title: 'Total Revenue', value: '£24,580', change: '+12.5%', trend: 'up', icon: DollarSign },
    { title: 'Orders', value: '342', change: '+8.2%', trend: 'up', icon: ShoppingCart },
    { title: 'Visitors', value: '12,483', change: '-3.1%', trend: 'down', icon: Users },
    { title: 'Page Views', value: '45,291', change: '+15.8%', trend: 'up', icon: Eye },
  ];

  const recentOrders = [
    { id: '#8392', customer: 'John Smith', amount: '£156.00', status: 'completed' },
    { id: '#8391', customer: 'Emma Johnson', amount: '£89.50', status: 'processing' },
    { id: '#8390', customer: 'Michael Brown', amount: '£234.00', status: 'completed' },
    { id: '#8389', customer: 'Sarah Wilson', amount: '£67.25', status: 'pending' },
  ];

  const topProducts = [
    { name: 'Premium Package', sales: 145, revenue: '£12,905' },
    { name: 'Standard Package', sales: 98, revenue: '£6,860' },
    { name: 'Basic Package', sales: 67, revenue: '£2,680' },
  ];

  const salesData = [
    { day: 'Mon', value: 65 },
    { day: 'Tue', value: 82 },
    { day: 'Wed', value: 71 },
    { day: 'Thu', value: 95 },
    { day: 'Fri', value: 88 },
    { day: 'Sat', value: 45 },
    { day: 'Sun', value: 52 },
  ];

  const maxValue = Math.max(...salesData.map(d => d.value));

  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <Section background="gradient" spacing="loose">
          <div className="max-w-4xl mx-auto text-center">
            <MotionReveal>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight mb-6">
                <span className="text-gradient">Analytics Dashboard</span>
                <br />
                Interactive Demo
              </h1>
            </MotionReveal>

            <MotionReveal delay={0.1}>
              <p className="text-lg md:text-xl text-text-secondary leading-relaxed mb-8 max-w-2xl mx-auto">
                Try a live analytics dashboard. See how businesses track sales, orders, visitors, and performance metrics in real-time.
              </p>
            </MotionReveal>
          </div>
        </Section>

        {/* Demo Section */}
        <Section background="primary" spacing="normal">
          <div className="max-w-6xl mx-auto">
            <MotionReveal>
              <div className="text-center mb-8">
                <h2 className="text-2xl md:text-3xl font-semibold mb-2">Business Overview</h2>
                <p className="text-text-secondary">Demo: E-Commerce Analytics Dashboard</p>
              </div>
            </MotionReveal>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {metrics.map((metric, index) => {
                const Icon = metric.icon;
                return (
                  <MotionReveal key={metric.title} delay={0.1 + index * 0.05}>
                    <Card variant="elevated">
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-10 h-10 rounded-lg bg-accent-primary/10 flex items-center justify-center">
                          <Icon className="w-5 h-5 text-accent-primary" />
                        </div>
                        <div className={`flex items-center gap-1 text-sm ${
                          metric.trend === 'up' ? 'text-green-500' : 'text-red-500'
                        }`}>
                          {metric.trend === 'up' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                          {metric.change}
                        </div>
                      </div>
                      <div className="text-2xl font-bold mb-1">{metric.value}</div>
                      <div className="text-sm text-text-secondary">{metric.title}</div>
                    </Card>
                  </MotionReveal>
                );
              })}
            </div>

            {/* Chart and Orders */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              {/* Sales Chart */}
              <MotionReveal delay={0.3} className="lg:col-span-2">
                <Card variant="elevated">
                  <h3 className="text-lg font-semibold mb-6">Sales This Week</h3>
                  <div className="h-64 flex items-end justify-between gap-2">
                    {salesData.map((data, index) => (
                      <div key={data.day} className="flex-1 flex flex-col items-center gap-2">
                        <div className="w-full relative" style={{ height: '200px' }}>
                          <div
                            className="absolute bottom-0 w-full bg-gradient-to-t from-accent-primary to-accent-secondary rounded-t-lg transition-all duration-500 hover:opacity-80"
                            style={{ height: `${(data.value / maxValue) * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-xs text-text-secondary">{data.day}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              </MotionReveal>

              {/* Top Products */}
              <MotionReveal delay={0.4}>
                <Card variant="elevated">
                  <h3 className="text-lg font-semibold mb-6">Top Products</h3>
                  <div className="space-y-4">
                    {topProducts.map((product, index) => (
                      <div key={product.name}>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium">{product.name}</span>
                          <span className="text-sm text-accent-primary">{product.revenue}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="flex-1 h-2 bg-bg-secondary rounded-full overflow-hidden">
                            <div
                              className="h-full bg-accent-primary rounded-full"
                              style={{ width: `${(product.sales / 145) * 100}%` }}
                            ></div>
                          </div>
                          <span className="text-xs text-text-secondary w-12 text-right">{product.sales}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </MotionReveal>
            </div>

            {/* Recent Orders */}
            <MotionReveal delay={0.5}>
              <Card variant="elevated">
                <h3 className="text-lg font-semibold mb-6">Recent Orders</h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-white/10">
                        <th className="text-left text-sm font-medium text-text-secondary pb-3">Order ID</th>
                        <th className="text-left text-sm font-medium text-text-secondary pb-3">Customer</th>
                        <th className="text-left text-sm font-medium text-text-secondary pb-3">Amount</th>
                        <th className="text-left text-sm font-medium text-text-secondary pb-3">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentOrders.map((order) => (
                        <tr key={order.id} className="border-b border-white/5">
                          <td className="py-4 text-sm font-mono">{order.id}</td>
                          <td className="py-4 text-sm">{order.customer}</td>
                          <td className="py-4 text-sm font-semibold">{order.amount}</td>
                          <td className="py-4">
                            <span className={`text-xs px-3 py-1 rounded-full ${
                              order.status === 'completed' ? 'bg-green-500/20 text-green-500' :
                              order.status === 'processing' ? 'bg-accent-primary/20 text-accent-primary' :
                              'bg-orange-500/20 text-orange-500'
                            }`}>
                              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
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
                  <CheckCircle className="w-6 h-6 text-accent-primary mb-3" />
                  <h3 className="text-lg font-semibold mb-2">Real-Time Data</h3>
                  <p className="text-sm text-text-secondary">
                    Metrics update automatically as new data comes in—no manual refreshing needed.
                  </p>
                </Card>
              </MotionReveal>

              <MotionReveal delay={0.2}>
                <Card variant="glass">
                  <CheckCircle className="w-6 h-6 text-accent-primary mb-3" />
                  <h3 className="text-lg font-semibold mb-2">Visual Charts</h3>
                  <p className="text-sm text-text-secondary">
                    Data displayed clearly with graphs, charts, and progress bars for quick insights.
                  </p>
                </Card>
              </MotionReveal>

              <MotionReveal delay={0.3}>
                <Card variant="glass">
                  <CheckCircle className="w-6 h-6 text-accent-primary mb-3" />
                  <h3 className="text-lg font-semibold mb-2">Custom Metrics</h3>
                  <p className="text-sm text-text-secondary">
                    Track whatever matters to your business—sales, traffic, conversions, or anything else.
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
                Need a Custom Dashboard?
              </h2>
              <p className="text-text-secondary text-lg mb-8">
                I can build dashboards that display your key metrics clearly�"sales, analytics, performance data, or whatever you need to track for your business.
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
