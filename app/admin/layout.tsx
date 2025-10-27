'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, FileText, Settings, LogOut, Menu, X, Phone, Star } from 'lucide-react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const pathname = usePathname();

  // Simple password auth placeholder (replace with Firebase auth later)
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin123') {
      setIsAuthenticated(true);
    } else {
      alert('Incorrect password');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPassword('');
  };

  const navItems = [
    { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/admin/quotes', label: 'Quote Requests', icon: FileText },
    { href: '/admin/callbacks', label: 'Callbacks', icon: Phone },
    { href: '/admin/reviews', label: 'Reviews', icon: Star },
    { href: '/admin/projects', label: 'Projects', icon: FileText },
    { href: '/admin/settings', label: 'Settings', icon: Settings },
  ];

  // Login screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-bg-primary flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-bg-secondary border border-white/10 rounded-2xl p-8 shadow-2xl">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-2">Admin Login</h1>
              <p className="text-text-secondary text-sm">
                Enter password to access admin panel
              </p>
              <p className="text-text-tertiary text-xs mt-2">
                (Temporary auth - will use Firebase after deployment)
              </p>
            </div>

            <form onSubmit={handleLogin}>
              <div className="mb-6">
                <label htmlFor="password" className="block text-sm font-medium mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password"
                  className="w-full px-4 py-3 bg-bg-tertiary rounded-lg border border-white/10 focus:border-accent-primary outline-none"
                  autoFocus
                />
                <p className="text-xs text-text-tertiary mt-2">
                  Demo password: admin123
                </p>
              </div>

              <button
                type="submit"
                className="w-full px-6 py-3 bg-accent-primary hover:bg-accent-primary-hover text-white font-semibold rounded-lg transition-colors"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // Admin panel
  return (
    <div className="min-h-screen bg-bg-primary">
      {/* Mobile Header */}
      <div className="md:hidden sticky top-0 z-50 bg-bg-secondary border-b border-white/10 px-4 py-4 flex items-center justify-between">
        <h1 className="text-xl font-bold text-gradient">harbonline admin</h1>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 hover:bg-white/5 rounded-lg transition-colors"
        >
          {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`fixed md:sticky top-0 left-0 z-40 h-screen w-64 bg-bg-secondary border-r border-white/10 transition-transform ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
          }`}
        >
          <div className="flex flex-col h-full">
            {/* Logo */}
            <div className="p-6 border-b border-white/10 hidden md:block">
              <h1 className="text-2xl font-bold text-gradient">harbonline</h1>
              <p className="text-sm text-text-secondary mt-1">Admin Panel</p>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-accent-primary/10 text-accent-primary border border-accent-primary/20'
                        : 'hover:bg-white/5 text-text-secondary hover:text-text-primary'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Logout */}
            <div className="p-4 border-t border-white/10">
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-red-500/10 text-text-secondary hover:text-red-400 transition-colors w-full"
              >
                <LogOut className="w-5 h-5" />
                <span className="font-medium">Logout</span>
              </button>
            </div>
          </div>
        </aside>

        {/* Backdrop for mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-30 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 min-h-screen">
          {children}
        </main>
      </div>
    </div>
  );
}
