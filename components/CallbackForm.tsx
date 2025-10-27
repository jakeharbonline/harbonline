'use client';

import { useState } from 'react';
import { addCallback } from '@/lib/mock-callbacks';

export function CallbackForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    preferredTime: '',
    notes: '',
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    try {
      // Add callback to mock data store
      const callback = addCallback({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        preferredTime: formData.preferredTime,
        notes: formData.notes,
      });

      // Send confirmation email
      try {
        await fetch('/api/send-callback-confirmation', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(callback),
        });
      } catch (error) {
        console.error('Failed to send confirmation email:', error);
      }

      setStatus('success');
      setFormData({ name: '', email: '', phone: '', preferredTime: '', notes: '' });

      // Reset success message after 3 seconds
      setTimeout(() => setStatus('idle'), 3000);
    } catch (error) {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium mb-2">
          Your Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 rounded-lg border border-border bg-background-primary text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-accent-primary"
          placeholder="John Smith"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-2">
          Email Address
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 rounded-lg border border-border bg-background-primary text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-accent-primary"
          placeholder="john@example.com"
        />
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium mb-2">
          Phone Number
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 rounded-lg border border-border bg-background-primary text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-accent-primary"
          placeholder="07340 917384"
        />
      </div>

      <div>
        <label htmlFor="preferredTime" className="block text-sm font-medium mb-2">
          Preferred Time
        </label>
        <select
          id="preferredTime"
          name="preferredTime"
          value={formData.preferredTime}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 rounded-lg border border-border bg-background-primary text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-accent-primary"
        >
          <option value="">Select a time...</option>
          <option value="Morning (9am-12pm)">Morning (9am-12pm)</option>
          <option value="Afternoon (12pm-5pm)">Afternoon (12pm-5pm)</option>
          <option value="Evening (5pm-7pm)">Evening (5pm-7pm)</option>
          <option value="Anytime">Anytime</option>
        </select>
      </div>

      <div>
        <label htmlFor="notes" className="block text-sm font-medium mb-2">
          Notes (Optional)
        </label>
        <textarea
          id="notes"
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          rows={3}
          className="w-full px-4 py-3 rounded-lg border border-border bg-background-primary text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-accent-primary"
          placeholder="Anything I should know before calling?"
        />
      </div>

      {status === 'success' && (
        <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
          <p className="text-green-600 dark:text-green-400 text-sm font-medium">
            Thanks! I'll call you back as soon as possible. Check your email for confirmation.
          </p>
        </div>
      )}

      {status === 'error' && (
        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
          <p className="text-red-600 dark:text-red-400 text-sm font-medium">
            Something went wrong. Please try again or email me directly.
          </p>
        </div>
      )}

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="w-full px-8 py-4 bg-accent-primary hover:bg-accent-primary-hover disabled:bg-accent-primary/50 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all disabled:cursor-not-allowed"
      >
        {status === 'submitting' ? 'Sending...' : 'Request a Call Back'}
      </button>
    </form>
  );
}
