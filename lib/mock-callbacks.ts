export interface Callback {
  id: string;
  name: string;
  phone: string;
  status: 'pending' | 'contacted' | 'completed';
  createdAt: string;
  notes?: string;
}

// Mock data store
let mockCallbacks: Callback[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    phone: '07123 456789',
    status: 'pending',
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
  },
  {
    id: '2',
    name: 'Michael Brown',
    phone: '07234 567890',
    status: 'contacted',
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
    notes: 'Left voicemail, waiting for response',
  },
];

export function getCallbacks(): Callback[] {
  return mockCallbacks.sort((a, b) =>
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export function getCallbackById(id: string): Callback | undefined {
  return mockCallbacks.find((callback) => callback.id === id);
}

export function addCallback(data: Omit<Callback, 'id' | 'createdAt' | 'status'>): Callback {
  const newCallback: Callback = {
    ...data,
    id: Date.now().toString(),
    status: 'pending',
    createdAt: new Date().toISOString(),
  };
  mockCallbacks.unshift(newCallback);
  return newCallback;
}

export function updateCallbackStatus(
  id: string,
  status: Callback['status']
): Callback | undefined {
  const callback = mockCallbacks.find((c) => c.id === id);
  if (callback) {
    callback.status = status;
  }
  return callback;
}

export function updateCallbackNotes(id: string, notes: string): Callback | undefined {
  const callback = mockCallbacks.find((c) => c.id === id);
  if (callback) {
    callback.notes = notes;
  }
  return callback;
}

export function deleteCallback(id: string): boolean {
  const index = mockCallbacks.findIndex((c) => c.id === id);
  if (index !== -1) {
    mockCallbacks.splice(index, 1);
    return true;
  }
  return false;
}
