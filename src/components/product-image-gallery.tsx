'use client';

import Image from 'next/image';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface ProductImageGalleryProps {
  imageUrls?: string[];
  title: string;
}

export function ProductImageGallery({ imageUrls, title }: ProductImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [imageError, setImageError] = useState(false);

  // Process image URLs
  const processedImageUrls = 
    Array.isArray(imageUrls) && imageUrls.length > 0 
      ? imageUrls.filter(url => typeof url === 'string' && url.length > 0)
      : [];

  const hasImages = processedImageUrls.length > 0;
  const mainImageUrl = hasImages 
    ? processedImageUrls[selectedImage] 
    : 'https://placehold.co/600x600/e2e8f0/94a3b8?text=No+Image';

  console.log('Image URLs:', processedImageUrls); // Debug log
  console.log('Main Image URL:', mainImageUrl); // Debug log

  return (
    <div>
      {/* Main Image */}
      <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-gray-100">
        {imageError ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500">Image failed to load</p>
          </div>
        ) : (
          // Temporarily using img tag for debugging
          <img
            src={mainImageUrl}
            alt={title}
            className="w-full h-full object-cover"
            onError={() => {
              console.error('Image failed to load:', mainImageUrl);
              setImageError(true);
            }}
          />
        )}
      </div>
      
      {/* Thumbnail Grid */}
      {processedImageUrls.length > 1 && (
        <div className="mt-4 grid grid-cols-5 gap-4">
          {processedImageUrls.map((url, index) => (
            <button
              key={`thumb-${index}`}
              type="button"
              className={cn(
                'relative aspect-square overflow-hidden rounded-lg transition-all bg-gray-100',
                'ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
                selectedImage === index && 'ring-2 ring-primary'
              )}
              onClick={() => {
                setSelectedImage(index);
                setImageError(false);
              }}
              aria-label={`View image ${index + 1}`}
            >
              <Image
                src={url}
                alt={`${title} - view ${index + 1}`}
                fill
                className="object-cover"
                sizes="20vw"
                unoptimized
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}