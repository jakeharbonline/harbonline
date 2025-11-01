'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LayoutDashboard, FileText, Settings, LogOut, Menu, X, Phone, Star, Loader2, Receipt } from 'lucide-react';
import { AuthProvider, useAuth } from '@/lib/auth-context';

function AdminLayoutContent({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, loading, signOut } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!loading && !user && pathname !== '/admin/login') {
      router.push('/admin/login');
    }
  }, [user, loading, pathname, router]);

  const handleLogout = async () => {
    try {
      await signOut();
      router.push('/admin/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const navItems = [
    { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/admin/quotes', label: 'Quote Requests', icon: FileText },
    { href: '/admin/invoices', label: 'Invoices', icon: Receipt },
    { href: '/admin/callbacks', label: 'Callbacks', icon: Phone },
    { href: '/admin/reviews', label: 'Reviews', icon: Star },
    { href: '/admin/projects', label: 'Projects', icon: FileText },
    { href: '/admin/settings', label: 'Settings', icon: Settings },
  ];

  // Show loading screen while checking auth
  if (loading) {
    return (
      <div className="min-h-screen bg-bg-primary flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-accent-primary animate-spin mx-auto mb-4" />
          <p className="text-text-secondary">Loading...</p>
        </div>
      </div>
    );
  }

  // Show login page for unauthenticated users (handled by redirect, but this is a safeguard)
  if (!user && pathname !== '/admin/login') {
    return null;
  }

  // Allow login page to render without admin layout
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  // Admin panel layout (only shown when authenticated)
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
              {user?.email && (
                <p className="text-xs text-text-tertiary mt-2 truncate">
                  {user.email}
                </p>
              )}
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

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <AdminLayoutContent>{children}</AdminLayoutContent>
    </AuthProvider>
  );
}
