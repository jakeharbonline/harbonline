'use client';

import { Settings as SettingsIcon, Database, Lock, Bell } from 'lucide-react';

export default function SettingsPage() {
  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Settings</h1>
        <p className="text-text-secondary">Configure your admin panel preferences</p>
      </div>

      {/* Settings Sections */}
      <div className="space-y-6">
        {/* Firebase Integration */}
        <div className="bg-bg-secondary border border-white/10 rounded-xl p-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-lg bg-accent-primary/10 flex items-center justify-center flex-shrink-0">
              <Database className="w-6 h-6 text-accent-primary" />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-semibold mb-2">Firebase Integration</h2>
              <p className="text-text-secondary mb-4">
                Connect Firebase to store quote requests, enable real-time updates, and manage authentication.
              </p>
              <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4 mb-4">
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-yellow-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-yellow-400 text-xs font-bold">!</span>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-yellow-400 mb-1">
                      Currently Using Mock Data
                    </h3>
                    <p className="text-xs text-text-secondary">
                      Quote requests are stored in memory and will be lost on page refresh. Connect Firebase after deploying to Vercel.
                    </p>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium mb-2">Firebase API Key</label>
                  <input
                    type="password"
                    placeholder="Not configured"
                    disabled
                    className="w-full px-4 py-3 bg-bg-tertiary/50 rounded-lg border border-white/10 outline-none cursor-not-allowed"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Project ID</label>
                  <input
                    type="text"
                    placeholder="Not configured"
                    disabled
                    className="w-full px-4 py-3 bg-bg-tertiary/50 rounded-lg border border-white/10 outline-none cursor-not-allowed"
                  />
                </div>
                <button
                  disabled
                  className="px-6 py-3 bg-white/5 text-text-secondary rounded-lg cursor-not-allowed"
                >
                  Configure After Deployment
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Authentication */}
        <div className="bg-bg-secondary border border-white/10 rounded-xl p-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-lg bg-accent-secondary/10 flex items-center justify-center flex-shrink-0">
              <Lock className="w-6 h-6 text-accent-secondary" />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-semibold mb-2">Authentication</h2>
              <p className="text-text-secondary mb-4">
                Manage admin access and authentication settings. Currently using temporary password authentication.
              </p>
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 mb-4">
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-blue-400 text-xs font-bold">i</span>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-blue-400 mb-1">
                      Temporary Authentication
                    </h3>
                    <p className="text-xs text-text-secondary">
                      Current password: <code className="px-1 py-0.5 bg-white/10 rounded">admin123</code>
                      <br />
                      This will be replaced with Firebase Auth after deployment.
                    </p>
                  </div>
                </div>
              </div>
              <button
                disabled
                className="px-6 py-3 bg-white/5 text-text-secondary rounded-lg cursor-not-allowed"
              >
                Configure Firebase Auth
              </button>
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-bg-secondary border border-white/10 rounded-xl p-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-lg bg-green-500/10 flex items-center justify-center flex-shrink-0">
              <Bell className="w-6 h-6 text-green-400" />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-semibold mb-2">Notifications</h2>
              <p className="text-text-secondary mb-4">
                Get notified when new quote requests are submitted. Configure email notifications after Firebase setup.
              </p>
              <div className="space-y-3">
                <label className="flex items-center gap-3 cursor-not-allowed opacity-50">
                  <input
                    type="checkbox"
                    disabled
                    className="w-5 h-5 rounded border-white/20"
                  />
                  <span className="text-sm">Email notifications for new quotes</span>
                </label>
                <label className="flex items-center gap-3 cursor-not-allowed opacity-50">
                  <input
                    type="checkbox"
                    disabled
                    className="w-5 h-5 rounded border-white/20"
                  />
                  <span className="text-sm">Daily summary of quote requests</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Deployment Checklist */}
        <div className="bg-gradient-to-br from-accent-primary/10 to-accent-secondary/10 border border-accent-primary/20 rounded-xl p-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-lg bg-accent-primary/20 flex items-center justify-center flex-shrink-0">
              <SettingsIcon className="w-6 h-6 text-accent-primary" />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-semibold mb-2">Post-Deployment Setup</h2>
              <p className="text-text-secondary mb-4">
                Complete these steps after deploying to Vercel and connecting your domain:
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-accent-primary mt-0.5">1.</span>
                  <span>Create a Firebase project at console.firebase.google.com</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent-primary mt-0.5">2.</span>
                  <span>Enable Firestore Database for storing quote requests</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent-primary mt-0.5">3.</span>
                  <span>Enable Firebase Authentication (Email/Password)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent-primary mt-0.5">4.</span>
                  <span>Add Firebase config to your Vercel environment variables</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent-primary mt-0.5">5.</span>
                  <span>Update lib/mock-quotes.ts to use Firebase SDK instead of mock data</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent-primary mt-0.5">6.</span>
                  <span>Configure email notifications using Firebase Functions or SendGrid</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
