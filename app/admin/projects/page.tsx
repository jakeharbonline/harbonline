'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Plus, Edit, Trash2, Eye, EyeOff, Star } from 'lucide-react';
import { getAllProjects, deleteProject, updateProject } from '@/lib/mock-projects';
import type { Project } from '@/lib/mock-projects';

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>(getAllProjects());

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this project?')) {
      deleteProject(id);
      setProjects(getAllProjects());
    }
  };

  const togglePublished = (id: string, currentStatus: boolean) => {
    updateProject(id, { published: !currentStatus });
    setProjects(getAllProjects());
  };

  const toggleFeatured = (id: string, currentStatus: boolean) => {
    updateProject(id, { featured: !currentStatus });
    setProjects(getAllProjects());
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Projects</h1>
          <p className="text-text-secondary">Manage your portfolio work</p>
        </div>
        <Link
          href="/admin/projects/new"
          className="flex items-center gap-2 px-6 py-3 bg-accent-primary hover:bg-accent-primary-hover text-white font-semibold rounded-lg transition-colors"
        >
          <Plus className="w-5 h-5" />
          Add Project
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-bg-secondary border border-white/10 rounded-xl p-6">
          <div className="text-sm text-text-secondary mb-1">Total Projects</div>
          <div className="text-3xl font-bold">{projects.length}</div>
        </div>
        <div className="bg-bg-secondary border border-green-500/20 rounded-xl p-6">
          <div className="text-sm text-text-secondary mb-1">Published</div>
          <div className="text-3xl font-bold text-green-400">
            {projects.filter((p) => p.published).length}
          </div>
        </div>
        <div className="bg-bg-secondary border border-accent-primary/20 rounded-xl p-6">
          <div className="text-sm text-text-secondary mb-1">Featured</div>
          <div className="text-3xl font-bold text-accent-primary">
            {projects.filter((p) => p.featured).length}
          </div>
        </div>
      </div>

      {/* Projects List */}
      <div className="space-y-4">
        {projects.map((project) => (
          <div
            key={project.id}
            className="bg-bg-secondary border border-white/10 rounded-xl p-6 hover:border-white/20 transition-colors"
          >
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Image */}
              <div className="w-full lg:w-48 h-32 bg-white/5 rounded-lg flex items-center justify-center text-text-tertiary flex-shrink-0">
                {project.image ? (
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover rounded-lg"
                  />
                ) : (
                  <span className="text-sm">No image</span>
                )}
              </div>

              {/* Content */}
              <div className="flex-1">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                    <p className="text-text-secondary text-sm mb-3">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-white/5 rounded text-xs text-text-secondary"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Status Badges */}
                  <div className="flex flex-col gap-2">
                    {project.featured && (
                      <span className="px-2 py-1 bg-accent-primary/10 text-accent-primary text-xs font-medium rounded flex items-center gap-1">
                        <Star className="w-3 h-3" />
                        Featured
                      </span>
                    )}
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded ${
                        project.published
                          ? 'bg-green-500/10 text-green-400'
                          : 'bg-yellow-500/10 text-yellow-400'
                      }`}
                    >
                      {project.published ? 'Published' : 'Draft'}
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-sm text-text-tertiary">
                  <span>Created: {formatDate(project.createdAt)}</span>
                  {project.url && (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent-primary hover:underline"
                    >
                      View Live Site →
                    </a>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex lg:flex-col gap-2">
                <button
                  onClick={() => togglePublished(project.id, project.published)}
                  className="flex-1 lg:flex-none px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors flex items-center justify-center gap-2 text-sm"
                  title={project.published ? 'Unpublish' : 'Publish'}
                >
                  {project.published ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                  {project.published ? 'Hide' : 'Publish'}
                </button>

                <button
                  onClick={() => toggleFeatured(project.id, project.featured)}
                  className="flex-1 lg:flex-none px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors flex items-center justify-center gap-2 text-sm"
                  title={project.featured ? 'Unfeature' : 'Feature'}
                >
                  <Star
                    className={`w-4 h-4 ${project.featured ? 'fill-accent-primary text-accent-primary' : ''}`}
                  />
                </button>

                <Link
                  href={`/admin/projects/${project.id}/edit`}
                  className="flex-1 lg:flex-none px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors flex items-center justify-center gap-2 text-sm"
                >
                  <Edit className="w-4 h-4" />
                  Edit
                </Link>

                <button
                  onClick={() => handleDelete(project.id)}
                  className="flex-1 lg:flex-none px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg transition-colors flex items-center justify-center gap-2 text-sm"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {projects.length === 0 && (
        <div className="bg-bg-secondary border border-white/10 rounded-xl p-12 text-center">
          <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
            <Plus className="w-8 h-8 text-text-tertiary" />
          </div>
          <h3 className="text-lg font-semibold mb-2">No projects yet</h3>
          <p className="text-text-secondary mb-6">Get started by adding your first portfolio project</p>
          <Link
            href="/admin/projects/new"
            className="inline-flex items-center gap-2 px-6 py-3 bg-accent-primary hover:bg-accent-primary-hover text-white font-semibold rounded-lg transition-colors"
          >
            <Plus className="w-5 h-5" />
            Add Your First Project
          </Link>
        </div>
      )}
    </div>
  );
}
