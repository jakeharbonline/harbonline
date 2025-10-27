'use client';

import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Section } from '@/components/Section';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { MotionReveal } from '@/components/MotionReveal';
import { Package, AlertTriangle, TrendingUp, Search, Plus, Minus, CheckCircle, ArrowRight } from 'lucide-react';
import { useState } from 'react';

export default function InventoryManagementDemoPage() {
  const [inventory, setInventory] = useState([
    { id: 1, name: 'Laptop Pro 15"', sku: 'LAP-001', stock: 24, reorderLevel: 10, price: '£1,299' },
    { id: 2, name: 'Wireless Mouse', sku: 'MOU-042', stock: 156, reorderLevel: 50, price: '£29' },
    { id: 3, name: 'USB-C Cable', sku: 'CAB-089', stock: 8, reorderLevel: 20, price: '£15' },
    { id: 4, name: 'Monitor 27"', sku: 'MON-015', stock: 3, reorderLevel: 5, price: '£349' },
    { id: 5, name: 'Keyboard Mechanical', sku: 'KEY-031', stock: 45, reorderLevel: 15, price: '£89' },
  ]);

  const adjustStock = (id: number, amount: number) => {
    setInventory(prev => prev.map(item =>
      item.id === id ? { ...item, stock: Math.max(0, item.stock + amount) } : item
    ));
  };

  const lowStockCount = inventory.filter(item => item.stock <= item.reorderLevel).length;
  const totalValue = inventory.reduce((sum, item) => sum + item.stock * parseFloat(item.price.replace('£', '').replace(',', '')), 0);

  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <Section background="gradient" spacing="loose">
          <div className="max-w-4xl mx-auto text-center">
            <MotionReveal>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight mb-6">
                <span className="text-gradient">Inventory Management</span>
                <br />
                Interactive Demo
              </h1>
            </MotionReveal>

            <MotionReveal delay={0.1}>
              <p className="text-lg md:text-xl text-text-secondary leading-relaxed mb-8 max-w-2xl mx-auto">
                Try a live inventory system. Track stock levels, get low-stock alerts, and manage products in real-time.
              </p>
            </MotionReveal>
          </div>
        </Section>

        {/* Demo Section */}
        <Section background="primary" spacing="normal">
          <div className="max-w-5xl mx-auto">
            <MotionReveal>
              <div className="text-center mb-8">
                <h2 className="text-2xl md:text-3xl font-semibold mb-2">Stock Management</h2>
                <p className="text-text-secondary">Demo: Product Inventory System</p>
              </div>
            </MotionReveal>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <MotionReveal delay={0.1}>
                <Card variant="elevated">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-accent-primary/10 flex items-center justify-center">
                      <Package className="w-6 h-6 text-accent-primary" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold">{inventory.length}</div>
                      <div className="text-sm text-text-secondary">Total Products</div>
                    </div>
                  </div>
                </Card>
              </MotionReveal>

              <MotionReveal delay={0.2}>
                <Card variant="elevated">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-orange-500/10 flex items-center justify-center">
                      <AlertTriangle className="w-6 h-6 text-orange-500" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold">{lowStockCount}</div>
                      <div className="text-sm text-text-secondary">Low Stock Alerts</div>
                    </div>
                  </div>
                </Card>
              </MotionReveal>

              <MotionReveal delay={0.3}>
                <Card variant="elevated">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-green-500/10 flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-green-500" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold">£{totalValue.toLocaleString()}</div>
                      <div className="text-sm text-text-secondary">Inventory Value</div>
                    </div>
                  </div>
                </Card>
              </MotionReveal>
            </div>

            {/* Inventory Table */}
            <MotionReveal delay={0.4}>
              <Card variant="elevated">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold">Current Inventory</h3>
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-text-secondary" />
                      <input
                        type="text"
                        placeholder="Search products..."
                        className="pl-10 pr-4 py-2 bg-bg-secondary rounded-lg border border-white/10 focus:border-accent-primary outline-none text-sm"
                      />
                    </div>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-white/10">
                        <th className="text-left text-sm font-medium text-text-secondary pb-3">Product</th>
                        <th className="text-left text-sm font-medium text-text-secondary pb-3">SKU</th>
                        <th className="text-left text-sm font-medium text-text-secondary pb-3">Stock</th>
                        <th className="text-left text-sm font-medium text-text-secondary pb-3">Status</th>
                        <th className="text-left text-sm font-medium text-text-secondary pb-3">Price</th>
                        <th className="text-right text-sm font-medium text-text-secondary pb-3">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {inventory.map((item) => (
                        <tr key={item.id} className="border-b border-white/5">
                          <td className="py-4 text-sm font-medium">{item.name}</td>
                          <td className="py-4 text-sm font-mono text-text-secondary">{item.sku}</td>
                          <td className="py-4 text-sm">
                            <span className={`font-semibold ${
                              item.stock <= item.reorderLevel ? 'text-orange-500' : 'text-text-primary'
                            }`}>
                              {item.stock}
                            </span>
                          </td>
                          <td className="py-4">
                            {item.stock <= item.reorderLevel ? (
                              <span className="inline-flex items-center gap-1 text-xs px-3 py-1 rounded-full bg-orange-500/20 text-orange-500">
                                <AlertTriangle className="w-3 h-3" />
                                Low Stock
                              </span>
                            ) : (
                              <span className="text-xs px-3 py-1 rounded-full bg-green-500/20 text-green-500">
                                In Stock
                              </span>
                            )}
                          </td>
                          <td className="py-4 text-sm font-semibold">{item.price}</td>
                          <td className="py-4">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => adjustStock(item.id, -1)}
                                className="p-2 hover:bg-white/5 rounded-lg transition-colors"
                                disabled={item.stock === 0}
                              >
                                <Minus className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => adjustStock(item.id, 1)}
                                className="p-2 hover:bg-white/5 rounded-lg transition-colors"
                              >
                                <Plus className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {lowStockCount > 0 && (
                  <div className="mt-6 p-4 bg-orange-500/10 border border-orange-500/20 rounded-lg">
                    <div className="flex items-center gap-3">
                      <AlertTriangle className="w-5 h-5 text-orange-500" />
                      <div>
                        <div className="font-semibold text-orange-500">Low Stock Alert</div>
                        <div className="text-sm text-text-secondary">
                          {lowStockCount} product{lowStockCount > 1 ? 's' : ''} need reordering
                        </div>
                      </div>
                    </div>
                  </div>
                )}
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
                  <h3 className="text-lg font-semibold mb-2">Real-Time Tracking</h3>
                  <p className="text-sm text-text-secondary">
                    Stock levels update instantly as items are added or removed from inventory.
                  </p>
                </Card>
              </MotionReveal>

              <MotionReveal delay={0.2}>
                <Card variant="glass">
                  <CheckCircle className="w-6 h-6 text-accent-primary mb-3" />
                  <h3 className="text-lg font-semibold mb-2">Low Stock Alerts</h3>
                  <p className="text-sm text-text-secondary">
                    Automatic warnings when products hit reorder levels so you never run out.
                  </p>
                </Card>
              </MotionReveal>

              <MotionReveal delay={0.3}>
                <Card variant="glass">
                  <CheckCircle className="w-6 h-6 text-accent-primary mb-3" />
                  <h3 className="text-lg font-semibold mb-2">Easy Management</h3>
                  <p className="text-sm text-text-secondary">
                    Simple interface to search, filter, and adjust stock with just a few clicks.
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
                Need Inventory Management?
              </h2>
              <p className="text-text-secondary text-lg mb-8">
                I can build custom inventory systems that track stock, manage suppliers, sync across locations, and integrate with your existing tools.
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
