'use client';

import { useEffect, useState } from 'react';
import { Settings as SettingsIcon, Database, Lock, Bell, CheckCircle, XCircle } from 'lucide-react';
import { Config } from '@/lib/config';

export default function SettingsPage() {
  const [firebaseStatus, setFirebaseStatus] = useState({
    client: false,
    admin: false,
  });

  useEffect(() => {
    // Check Firebase Client SDK
    const clientConfigured = Config.flags.enableFirebase;

    // Check Firebase Admin SDK
    const adminConfigured = !!(
      Config.firebase.admin.projectId &&
      Config.firebase.admin.clientEmail &&
      Config.firebase.admin.privateKey
    );

    setFirebaseStatus({
      client: clientConfigured,
      admin: adminConfigured,
    });
  }, []);
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
                Firebase provides authentication, real-time database, and storage capabilities for the application.
              </p>

              {/* Connection Status */}
              <div className={`${firebaseStatus.client && firebaseStatus.admin ? 'bg-green-500/10 border-green-500/20' : 'bg-yellow-500/10 border-yellow-500/20'} border rounded-lg p-4 mb-4`}>
                <div className="flex items-start gap-3">
                  {firebaseStatus.client && firebaseStatus.admin ? (
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                  ) : (
                    <div className="w-5 h-5 rounded-full bg-yellow-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-yellow-400 text-xs font-bold">!</span>
                    </div>
                  )}
                  <div className="flex-1">
                    <h3 className={`text-sm font-medium mb-1 ${firebaseStatus.client && firebaseStatus.admin ? 'text-green-400' : 'text-yellow-400'}`}>
                      {firebaseStatus.client && firebaseStatus.admin ? 'Firebase Fully Connected' : 'Firebase Partially Configured'}
                    </h3>
                    <p className="text-xs text-text-secondary mb-3">
                      {firebaseStatus.client && firebaseStatus.admin
                        ? 'Both client and server SDKs are configured and ready to use.'
                        : 'Some Firebase features may not be available.'}
                    </p>

                    {/* Status Details */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-xs">
                        {firebaseStatus.client ? (
                          <CheckCircle className="w-4 h-4 text-green-400" />
                        ) : (
                          <XCircle className="w-4 h-4 text-red-400" />
                        )}
                        <span className={firebaseStatus.client ? 'text-green-400' : 'text-red-400'}>
                          Client SDK (Browser)
                        </span>
                        <span className="text-text-secondary">
                          - Authentication, Firestore, Real-time updates
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                        {firebaseStatus.admin ? (
                          <CheckCircle className="w-4 h-4 text-green-400" />
                        ) : (
                          <XCircle className="w-4 h-4 text-red-400" />
                        )}
                        <span className={firebaseStatus.admin ? 'text-green-400' : 'text-red-400'}>
                          Admin SDK (Server)
                        </span>
                        <span className="text-text-secondary">
                          - Backend operations, Elevated privileges
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Configuration Details */}
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium mb-2">Project ID</label>
                  <input
                    type="text"
                    value={Config.firebase.client.projectId || 'Not configured'}
                    disabled
                    className="w-full px-4 py-3 bg-bg-tertiary/50 rounded-lg border border-white/10 outline-none cursor-not-allowed text-text-secondary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Auth Domain</label>
                  <input
                    type="text"
                    value={Config.firebase.client.authDomain || 'Not configured'}
                    disabled
                    className="w-full px-4 py-3 bg-bg-tertiary/50 rounded-lg border border-white/10 outline-none cursor-not-allowed text-text-secondary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Admin Client Email</label>
                  <input
                    type="text"
                    value={Config.firebase.admin.clientEmail || 'Not configured'}
                    disabled
                    className="w-full px-4 py-3 bg-bg-tertiary/50 rounded-lg border border-white/10 outline-none cursor-not-allowed text-text-secondary"
                  />
                </div>
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
                Firebase Authentication is configured and ready for user management.
              </p>
              <div className={`${firebaseStatus.client ? 'bg-green-500/10 border-green-500/20' : 'bg-blue-500/10 border-blue-500/20'} border rounded-lg p-4 mb-4`}>
                <div className="flex items-start gap-3">
                  {firebaseStatus.client ? (
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                  ) : (
                    <div className="w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-blue-400 text-xs font-bold">i</span>
                    </div>
                  )}
                  <div>
                    <h3 className={`text-sm font-medium mb-1 ${firebaseStatus.client ? 'text-green-400' : 'text-blue-400'}`}>
                      {firebaseStatus.client ? 'Firebase Auth Active' : 'Firebase Auth Not Configured'}
                    </h3>
                    <p className="text-xs text-text-secondary">
                      {firebaseStatus.client
                        ? 'Email/password authentication is enabled. You can create admin users in the Firebase Console.'
                        : 'Configure Firebase to enable authentication features.'}
                    </p>
                  </div>
                </div>
              </div>
              {firebaseStatus.client && (
                <div className="text-xs text-text-secondary">
                  <p className="mb-2">To add admin users:</p>
                  <ol className="list-decimal list-inside space-y-1">
                    <li>Go to Firebase Console → Authentication</li>
                    <li>Enable Email/Password provider</li>
                    <li>Add users manually or use the admin panel</li>
                  </ol>
                </div>
              )}
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
              <h2 className="text-xl font-semibold mb-2">Deployment Checklist</h2>
              <p className="text-text-secondary mb-4">
                Steps to deploy and finalize your Firebase setup:
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  {firebaseStatus.client ? (
                    <CheckCircle className="w-4 h-4 text-green-400 mt-0.5" />
                  ) : (
                    <span className="text-accent-primary mt-0.5">1.</span>
                  )}
                  <span className={firebaseStatus.client ? 'line-through text-text-secondary' : ''}>
                    Create a Firebase project at console.firebase.google.com
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent-primary mt-0.5">2.</span>
                  <span>Enable Firestore Database and set up security rules</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent-primary mt-0.5">3.</span>
                  <span>Enable Firebase Authentication (Email/Password provider)</span>
                </li>
                <li className="flex items-start gap-2">
                  {firebaseStatus.client && firebaseStatus.admin ? (
                    <CheckCircle className="w-4 h-4 text-green-400 mt-0.5" />
                  ) : (
                    <span className="text-accent-primary mt-0.5">4.</span>
                  )}
                  <span className={firebaseStatus.client && firebaseStatus.admin ? 'line-through text-text-secondary' : ''}>
                    Configure Firebase environment variables locally
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent-primary mt-0.5">5.</span>
                  <span>Add Firebase environment variables to Vercel/hosting platform</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent-primary mt-0.5">6.</span>
                  <span>Deploy to production and test Firebase integration</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent-primary mt-0.5">7.</span>
                  <span>Create your first admin user in Firebase Console</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
