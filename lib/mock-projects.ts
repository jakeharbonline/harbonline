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

// Mock data
export const mockProjects: Project[] = [
  {
    id: 'p001',
    title: 'E-Commerce Platform for Local Retailer',
    description: 'Built a modern e-commerce website with Shopify integration, custom product filters, and seamless checkout experience. Increased online sales by 45% in the first quarter.',
    image: '/images/projects/project1.jpg',
    url: 'https://example-store.com',
    tags: ['E-Commerce', 'Shopify', 'Web Design'],
    featured: true,
    published: true,
    createdAt: '2024-10-15T10:00:00Z',
  },
  {
    id: 'p002',
    title: 'Custom Booking System for Salon',
    description: 'Developed a custom appointment booking system with automated reminders, staff management, and client portal. Reduced no-shows by 60%.',
    image: '/images/projects/project2.jpg',
    tags: ['Custom Software', 'Web Application', 'Booking System'],
    featured: true,
    published: true,
    createdAt: '2024-09-20T10:00:00Z',
  },
  {
    id: 'p003',
    title: 'Professional Website Redesign',
    description: 'Complete redesign and rebuild of a consulting firm website. Modern design, improved navigation, and optimized for SEO. Page load time reduced from 8s to under 2s.',
    image: '/images/projects/project3.jpg',
    url: 'https://example-consulting.co.uk',
    tags: ['Web Design', 'Web Development', 'SEO'],
    featured: false,
    published: true,
    createdAt: '2024-08-10T10:00:00Z',
  },
];

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
