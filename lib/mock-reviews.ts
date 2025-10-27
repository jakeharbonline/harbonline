export interface Review {
  id: string;
  name: string;
  company?: string;
  role?: string;
  rating: number; // 1-5 stars
  text: string;
  featured: boolean;
  published: boolean;
  createdAt: string;
}

// Mock data store - cleaned for production
// Real reviews will be stored in Firebase
let mockReviews: Review[] = [];

export function getReviews(): Review[] {
  return mockReviews
    .filter(r => r.published)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export function getAllReviews(): Review[] {
  return mockReviews.sort((a, b) =>
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export function getReviewById(id: string): Review | undefined {
  return mockReviews.find((review) => review.id === id);
}

export function getFeaturedReviews(): Review[] {
  return mockReviews.filter((review) => review.featured && review.published);
}

export function addReview(data: Omit<Review, 'id' | 'createdAt'>): Review {
  const newReview: Review = {
    ...data,
    id: `r${String(mockReviews.length + 1).padStart(3, '0')}`,
    createdAt: new Date().toISOString(),
  };
  mockReviews.push(newReview);
  return newReview;
}

export function updateReview(id: string, updates: Partial<Review>): boolean {
  const index = mockReviews.findIndex((r) => r.id === id);
  if (index !== -1) {
    mockReviews[index] = { ...mockReviews[index], ...updates };
    return true;
  }
  return false;
}

export function deleteReview(id: string): boolean {
  const index = mockReviews.findIndex((r) => r.id === id);
  if (index !== -1) {
    mockReviews.splice(index, 1);
    return true;
  }
  return false;
}

export function getReviewStats() {
  const published = mockReviews.filter(r => r.published);
  const avgRating = published.length > 0
    ? published.reduce((sum, r) => sum + r.rating, 0) / published.length
    : 0;

  return {
    total: mockReviews.length,
    published: published.length,
    featured: mockReviews.filter(r => r.featured).length,
    averageRating: Math.round(avgRating * 10) / 10,
  };
}
