// Mock data store for portfolio projects
// This will be replaced with Firebase after deployment

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  url?: string;
  tags: string[];
  featured: boolean;
  createdAt: string;
  published: boolean;
}

// Mock data - cleaned for production
// Real projects will be stored in Firebase
export const mockProjects: Project[] = [];

// Helper functions for mock data management
export function getProjects(): Project[] {
  return mockProjects.filter(p => p.published);
}

export function getAllProjects(): Project[] {
  return mockProjects;
}

export function getProjectById(id: string): Project | undefined {
  return mockProjects.find((project) => project.id === id);
}

export function getFeaturedProjects(): Project[] {
  return mockProjects.filter((project) => project.featured && project.published);
}

export function addProject(project: Omit<Project, 'id' | 'createdAt'>): Project {
  const newProject: Project = {
    ...project,
    id: `p${String(mockProjects.length + 1).padStart(3, '0')}`,
    createdAt: new Date().toISOString(),
  };
  mockProjects.push(newProject);
  return newProject;
}

export function updateProject(id: string, updates: Partial<Project>): boolean {
  const index = mockProjects.findIndex((p) => p.id === id);
  if (index !== -1) {
    mockProjects[index] = { ...mockProjects[index], ...updates };
    return true;
  }
  return false;
}

export function deleteProject(id: string): boolean {
  const index = mockProjects.findIndex((p) => p.id === id);
  if (index !== -1) {
    mockProjects.splice(index, 1);
    return true;
  }
  return false;
}
