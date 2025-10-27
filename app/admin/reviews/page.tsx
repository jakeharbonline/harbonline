'use client';

import { useState } from 'react';
import { Star, Plus, Edit2, Trash2, Eye, EyeOff } from 'lucide-react';
import { getAllReviews, addReview, updateReview, deleteReview, type Review } from '@/lib/mock-reviews';

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>(getAllReviews());
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    company: '',
    role: '',
    rating: 5,
    text: '',
    featured: false,
    published: true,
  });

  const resetForm = () => {
    setFormData({
      name: '',
      company: '',
      role: '',
      rating: 5,
      text: '',
      featured: false,
      published: true,
    });
    setIsAdding(false);
    setEditingId(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingId) {
      updateReview(editingId, formData);
    } else {
      addReview(formData);
    }

    setReviews(getAllReviews());
    resetForm();
  };

  const handleEdit = (review: Review) => {
    setFormData({
      name: review.name,
      company: review.company || '',
      role: review.role || '',
      rating: review.rating,
      text: review.text,
      featured: review.featured,
      published: review.published,
    });
    setEditingId(review.id);
    setIsAdding(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this review?')) {
      deleteReview(id);
      setReviews(getAllReviews());
    }
  };

  const togglePublished = (review: Review) => {
    updateReview(review.id, { published: !review.published });
    setReviews(getAllReviews());
  };

  const toggleFeatured = (review: Review) => {
    updateReview(review.id, { featured: !review.featured });
    setReviews(getAllReviews());
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Reviews</h1>
          <p className="text-text-secondary mt-2">
            Manage customer testimonials and reviews
          </p>
        </div>
        <button
          onClick={() => setIsAdding(true)}
          className="px-4 py-2 bg-accent-primary hover:bg-accent-primary-hover text-white rounded-lg flex items-center gap-2 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Add Review
        </button>
      </div>

      {/* Add/Edit Form */}
      {isAdding && (
        <div className="bg-bg-secondary p-6 rounded-lg border border-white/10">
          <h2 className="text-xl font-semibold mb-4">
            {editingId ? 'Edit Review' : 'Add New Review'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 bg-bg-primary border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-primary"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Company
                </label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full px-4 py-2 bg-bg-primary border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Role
                </label>
                <input
                  type="text"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full px-4 py-2 bg-bg-primary border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-primary"
                  placeholder="e.g., CEO, Founder"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Rating *
                </label>
                <select
                  value={formData.rating}
                  onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value) })}
                  className="w-full px-4 py-2 bg-bg-primary border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-primary"
                  required
                >
                  {[5, 4, 3, 2, 1].map((num) => (
                    <option key={num} value={num}>
                      {num} Star{num !== 1 ? 's' : ''}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Review Text *
              </label>
              <textarea
                value={formData.text}
                onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                className="w-full px-4 py-2 bg-bg-primary border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-primary min-h-[120px]"
                required
                placeholder="Customer's testimonial..."
              />
            </div>

            <div className="flex gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  className="w-4 h-4"
                />
                <span className="text-sm">Feature on homepage</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.published}
                  onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                  className="w-4 h-4"
                />
                <span className="text-sm">Published</span>
              </label>
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                className="px-6 py-2 bg-accent-primary hover:bg-accent-primary-hover text-white rounded-lg transition-colors"
              >
                {editingId ? 'Update Review' : 'Add Review'}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="px-6 py-2 bg-bg-primary hover:bg-white/5 border border-white/10 rounded-lg transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Reviews List */}
      <div className="space-y-4">
        {reviews.length === 0 ? (
          <div className="text-center py-12 bg-bg-secondary rounded-lg border border-white/10">
            <p className="text-text-secondary">No reviews yet. Add your first review!</p>
          </div>
        ) : (
          reviews.map((review) => (
            <div
              key={review.id}
              className="bg-bg-secondary p-6 rounded-lg border border-white/10 hover:border-white/20 transition-colors"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold">{review.name}</h3>
                    {review.featured && (
                      <span className="px-2 py-1 bg-accent-primary/20 text-accent-primary text-xs rounded-full">
                        Featured
                      </span>
                    )}
                    {!review.published && (
                      <span className="px-2 py-1 bg-white/10 text-text-secondary text-xs rounded-full">
                        Draft
                      </span>
                    )}
                  </div>
                  {(review.role || review.company) && (
                    <p className="text-sm text-text-secondary mb-3">
                      {review.role}{review.role && review.company ? ' at ' : ''}{review.company}
                    </p>
                  )}
                  <div className="flex gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < review.rating ? 'fill-yellow-500 text-yellow-500' : 'text-gray-600'
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-text-secondary leading-relaxed">{review.text}</p>
                  <p className="text-xs text-text-tertiary mt-3">
                    Added: {new Date(review.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => togglePublished(review)}
                    className="p-2 hover:bg-white/5 rounded-lg transition-colors"
                    title={review.published ? 'Unpublish' : 'Publish'}
                  >
                    {review.published ? (
                      <Eye className="w-5 h-5 text-green-500" />
                    ) : (
                      <EyeOff className="w-5 h-5 text-gray-500" />
                    )}
                  </button>
                  <button
                    onClick={() => handleEdit(review)}
                    className="p-2 hover:bg-white/5 rounded-lg transition-colors"
                    title="Edit"
                  >
                    <Edit2 className="w-5 h-5 text-accent-primary" />
                  </button>
                  <button
                    onClick={() => handleDelete(review.id)}
                    className="p-2 hover:bg-white/5 rounded-lg transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="w-5 h-5 text-red-500" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
