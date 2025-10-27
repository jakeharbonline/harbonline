'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save } from 'lucide-react';
import { addProject } from '@/lib/mock-projects';

export default function NewProjectPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    url: '',
    tags: '',
    featured: false,
    published: true,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const project = {
      title: formData.title,
      description: formData.description,
      image: formData.image,
      url: formData.url || undefined,
      tags: formData.tags.split(',').map((tag) => tag.trim()).filter(Boolean),
      featured: formData.featured,
      published: formData.published,
    };

    addProject(project);
    router.push('/admin/projects');
  };

  return (
    <div className="p-6 md:p-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <Link
          href="/admin/projects"
          className="inline-flex items-center gap-2 text-text-secondary hover:text-text-primary mb-4 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to projects
        </Link>

        <h1 className="text-3xl md:text-4xl font-bold mb-2">Add New Project</h1>
        <p className="text-text-secondary">Add a new project to your portfolio</p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-bg-secondary border border-white/10 rounded-xl p-6 md:p-8">
        <div className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Project Title <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              placeholder="E-Commerce Platform for Local Retailer"
              className="w-full px-4 py-3 bg-bg-tertiary rounded-lg border border-white/10 focus:border-accent-primary outline-none"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Description <span className="text-red-400">*</span>
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={5}
              placeholder="Brief description of the project, what was built, and the results achieved..."
              className="w-full px-4 py-3 bg-bg-tertiary rounded-lg border border-white/10 focus:border-accent-primary outline-none resize-none"
            />
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-sm font-medium mb-2">Image URL</label>
            <input
              type="text"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="/images/projects/project1.jpg"
              className="w-full px-4 py-3 bg-bg-tertiary rounded-lg border border-white/10 focus:border-accent-primary outline-none"
            />
            <p className="text-xs text-text-tertiary mt-2">
              Upload images to /public/images/projects/ folder and reference them here
            </p>
          </div>

          {/* Project URL */}
          <div>
            <label className="block text-sm font-medium mb-2">Live URL (Optional)</label>
            <input
              type="url"
              name="url"
              value={formData.url}
              onChange={handleChange}
              placeholder="https://example.com"
              className="w-full px-4 py-3 bg-bg-tertiary rounded-lg border border-white/10 focus:border-accent-primary outline-none"
            />
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Tags <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              required
              placeholder="E-Commerce, Shopify, Web Design"
              className="w-full px-4 py-3 bg-bg-tertiary rounded-lg border border-white/10 focus:border-accent-primary outline-none"
            />
            <p className="text-xs text-text-tertiary mt-2">
              Separate multiple tags with commas
            </p>
          </div>

          {/* Checkboxes */}
          <div className="space-y-3 pt-4 border-t border-white/10">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                name="featured"
                checked={formData.featured}
                onChange={handleChange}
                className="w-5 h-5 rounded border-white/20 bg-bg-tertiary"
              />
              <div>
                <span className="text-sm font-medium">Featured Project</span>
                <p className="text-xs text-text-tertiary">Show this project prominently on the homepage</p>
              </div>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                name="published"
                checked={formData.published}
                onChange={handleChange}
                className="w-5 h-5 rounded border-white/20 bg-bg-tertiary"
              />
              <div>
                <span className="text-sm font-medium">Publish Immediately</span>
                <p className="text-xs text-text-tertiary">Make this project visible on your website</p>
              </div>
            </label>
          </div>

          {/* Submit */}
          <div className="flex gap-4 pt-6 border-t border-white/10">
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-accent-primary hover:bg-accent-primary-hover text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <Save className="w-5 h-5" />
              Add Project
            </button>
            <Link
              href="/admin/projects"
              className="px-6 py-3 bg-white/5 hover:bg-white/10 rounded-lg transition-colors font-medium"
            >
              Cancel
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}
