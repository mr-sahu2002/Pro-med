import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { Product } from '@/types';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const getImageUrl = () => {
    if (product.imageUrls && product.imageUrls.length > 0) {
      return product.imageUrls[0];
    }
    if (typeof product.image === 'string' && product.image.startsWith('http')) {
        return product.image;
    }
    // Fallback for gs:// URLs or missing images
    return 'https://picsum.photos/seed/product-placeholder/400/400';
  };

  const imageUrl = getImageUrl();


  return (
    <Card className="flex flex-col h-full overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <CardHeader className="p-0">
        <Link href={`/products/${product.id}`} className="block">
          <div className="aspect-square relative">
            <Image
              src={imageUrl}
              alt={product.title}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              data-ai-hint="medical device"
            />
          </div>
        </Link>
      </CardHeader>
      <CardContent className="p-4 flex-1 flex flex-col">
        <div className="flex-1">
            <Badge variant="secondary" className="mb-2">{product.category}</Badge>
            <CardTitle className="text-lg font-semibold leading-snug">
              <Link href={`/products/${product.id}`} className="hover:text-primary transition-colors">
                {product.title}
              </Link>
            </CardTitle>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button asChild className="w-full">
          <Link href={`/products/${product.id}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
