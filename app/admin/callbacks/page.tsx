'use client';

import { useState } from 'react';
import {
  getCallbacks,
  updateCallbackStatus,
  updateCallbackNotes,
  deleteCallback,
  type Callback,
} from '@/lib/mock-callbacks';
import { Card } from '@/components/Card';
import { Phone, Trash2, CheckCircle, Clock, XCircle } from 'lucide-react';

export default function AdminCallbacksPage() {
  const [callbacks, setCallbacks] = useState<Callback[]>(getCallbacks());
  const [editingNotes, setEditingNotes] = useState<string | null>(null);
  const [notesText, setNotesText] = useState('');

  const handleStatusChange = (id: string, status: Callback['status']) => {
    updateCallbackStatus(id, status);
    setCallbacks(getCallbacks());
  };

  const handleNotesEdit = (callback: Callback) => {
    setEditingNotes(callback.id);
    setNotesText(callback.notes || '');
  };

  const handleNotesSave = (id: string) => {
    updateCallbackNotes(id, notesText);
    setEditingNotes(null);
    setCallbacks(getCallbacks());
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this callback request?')) {
      deleteCallback(id);
      setCallbacks(getCallbacks());
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) return `${diffMins} minute${diffMins !== 1 ? 's' : ''} ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
    if (diffDays < 7) return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  const getStatusIcon = (status: Callback['status']) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'contacted':
        return <Phone className="w-5 h-5 text-blue-500" />;
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
    }
  };

  const getStatusColor = (status: Callback['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/20';
      case 'contacted':
        return 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20';
      case 'completed':
        return 'bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20';
    }
  };

  const pendingCount = callbacks.filter((c) => c.status === 'pending').length;
  const contactedCount = callbacks.filter((c) => c.status === 'contacted').length;
  const completedCount = callbacks.filter((c) => c.status === 'completed').length;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Callback Requests</h1>
        <p className="text-text-secondary">
          Manage callback requests from the contact page
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-8">
        <Card variant="glass">
          <div className="text-sm text-text-secondary mb-1">Total</div>
          <div className="text-2xl font-bold">{callbacks.length}</div>
        </Card>
        <Card variant="glass">
          <div className="text-sm text-text-secondary mb-1">Pending</div>
          <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
            {pendingCount}
          </div>
        </Card>
        <Card variant="glass">
          <div className="text-sm text-text-secondary mb-1">Contacted</div>
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            {contactedCount}
          </div>
        </Card>
        <Card variant="glass">
          <div className="text-sm text-text-secondary mb-1">Completed</div>
          <div className="text-2xl font-bold text-green-600 dark:text-green-400">
            {completedCount}
          </div>
        </Card>
      </div>

      {/* Callbacks List */}
      <div className="space-y-4">
        {callbacks.length === 0 ? (
          <Card variant="glass">
            <p className="text-center text-text-secondary py-8">
              No callback requests yet
            </p>
          </Card>
        ) : (
          callbacks.map((callback) => (
            <Card key={callback.id} variant="glass">
              <div className="flex flex-col gap-4">
                {/* Header Row */}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      {getStatusIcon(callback.status)}
                      <h3 className="text-xl font-semibold">{callback.name}</h3>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                          callback.status
                        )}`}
                      >
                        {callback.status.charAt(0).toUpperCase() + callback.status.slice(1)}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-text-secondary">
                      <Phone className="w-4 h-4" />
                      <a
                        href={`tel:${callback.phone}`}
                        className="hover:text-accent-primary transition-colors"
                      >
                        {callback.phone}
                      </a>
                      <span className="text-sm">• {formatDate(callback.createdAt)}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleDelete(callback.id)}
                    className="p-2 text-red-600 hover:bg-red-500/10 rounded-lg transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>

                {/* Notes Section */}
                <div>
                  {editingNotes === callback.id ? (
                    <div className="space-y-2">
                      <textarea
                        value={notesText}
                        onChange={(e) => setNotesText(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border border-border bg-background-primary focus:outline-none focus:ring-2 focus:ring-accent-primary"
                        rows={3}
                        placeholder="Add notes..."
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleNotesSave(callback.id)}
                          className="px-4 py-2 bg-accent-primary hover:bg-accent-primary-hover text-white rounded-lg transition-colors text-sm font-medium"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditingNotes(null)}
                          className="px-4 py-2 bg-background-secondary hover:bg-background-tertiary rounded-lg transition-colors text-sm"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      {callback.notes ? (
                        <p className="text-sm text-text-secondary mb-2">{callback.notes}</p>
                      ) : (
                        <p className="text-sm text-text-secondary/50 italic mb-2">
                          No notes added
                        </p>
                      )}
                      <button
                        onClick={() => handleNotesEdit(callback)}
                        className="text-sm text-accent-primary hover:underline"
                      >
                        {callback.notes ? 'Edit notes' : 'Add notes'}
                      </button>
                    </div>
                  )}
                </div>

                {/* Status Actions */}
                <div className="flex gap-2 pt-2 border-t border-border">
                  <button
                    onClick={() => handleStatusChange(callback.id, 'pending')}
                    disabled={callback.status === 'pending'}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg bg-yellow-500/10 hover:bg-yellow-500/20 text-yellow-600 dark:text-yellow-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm"
                  >
                    <Clock className="w-4 h-4" />
                    Pending
                  </button>
                  <button
                    onClick={() => handleStatusChange(callback.id, 'contacted')}
                    disabled={callback.status === 'contacted'}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 text-blue-600 dark:text-blue-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm"
                  >
                    <Phone className="w-4 h-4" />
                    Contacted
                  </button>
                  <button
                    onClick={() => handleStatusChange(callback.id, 'completed')}
                    disabled={callback.status === 'completed'}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg bg-green-500/10 hover:bg-green-500/20 text-green-600 dark:text-green-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm"
                  >
                    <CheckCircle className="w-4 h-4" />
                    Completed
                  </button>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
