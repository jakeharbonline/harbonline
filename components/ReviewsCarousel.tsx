'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { getReviews, type Review } from '@/lib/mock-reviews';

export function ReviewsCarousel() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setReviews(getReviews());
  }, []);

  if (reviews.length === 0) {
    return null; // Don't show section if no reviews
  }

  const showNavigation = reviews.length > 2;

  const nextReview = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  const prevReview = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  // Auto-advance every 8 seconds if more than 2 reviews
  useEffect(() => {
    if (!showNavigation) return;

    const interval = setInterval(nextReview, 8000);
    return () => clearInterval(interval);
  }, [showNavigation, currentIndex]);

  // Render stars
  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-5 h-5 ${
              star <= rating
                ? 'fill-accent-primary text-accent-primary'
                : 'text-white/20'
            }`}
          />
        ))}
      </div>
    );
  };

  // For 1-2 reviews, show them side by side
  if (!showNavigation) {
    return (
      <div className="grid md:grid-cols-2 gap-6">
        {reviews.map((review, index) => (
          <motion.div
            key={review.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-bg-secondary border border-white/10 rounded-2xl p-8"
          >
            <div className="mb-4">{renderStars(review.rating)}</div>
            <p className="text-text-secondary mb-6 italic">"{review.text}"</p>
            <div>
              <p className="font-semibold">{review.name}</p>
              {(review.role || review.company) && (
                <p className="text-sm text-text-tertiary">
                  {review.role}
                  {review.role && review.company && ' at '}
                  {review.company}
                </p>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    );
  }

  // For 3+ reviews, show carousel with navigation
  return (
    <div className="relative">
      {/* Carousel Container */}
      <div className="overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="bg-bg-secondary border border-white/10 rounded-2xl p-8 md:p-12"
          >
            <div className="max-w-3xl mx-auto text-center">
              <div className="mb-6 flex justify-center">
                {renderStars(reviews[currentIndex].rating)}
              </div>
              <p className="text-xl md:text-2xl text-text-secondary mb-8 italic">
                "{reviews[currentIndex].text}"
              </p>
              <div>
                <p className="font-semibold text-lg">{reviews[currentIndex].name}</p>
                {(reviews[currentIndex].role || reviews[currentIndex].company) && (
                  <p className="text-text-tertiary">
                    {reviews[currentIndex].role}
                    {reviews[currentIndex].role && reviews[currentIndex].company && ' at '}
                    {reviews[currentIndex].company}
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={prevReview}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 w-12 h-12 bg-bg-secondary border border-white/10 rounded-full flex items-center justify-center hover:bg-white/5 transition-colors"
        aria-label="Previous review"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={nextReview}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 w-12 h-12 bg-bg-secondary border border-white/10 rounded-full flex items-center justify-center hover:bg-white/5 transition-colors"
        aria-label="Next review"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Dots Indicator */}
      <div className="flex justify-center gap-2 mt-6">
        {reviews.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentIndex ? 'bg-accent-primary' : 'bg-white/20'
            }`}
            aria-label={`Go to review ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
