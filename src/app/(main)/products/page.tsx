import { collection, getDocs, query, where, DocumentData } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { Product } from '@/types';
import { ProductCard } from '@/components/product-card';
import { ProductFilters } from '@/components/product-filters';
import { Suspense } from 'react';

async function getProducts(
  category?: string,
  search?: string
): Promise<Product[]> {
    try {
        const productsRef = collection(db, 'products');
        let q = query(productsRef);

        if (category) {
            q = query(q, where('category', '==', category));
        }

        const querySnapshot = await getDocs(q);
        let products: Product[] = [];
        querySnapshot.forEach((doc: DocumentData) => {
            products.push({ id: doc.id, ...doc.data() } as Product);
        });

        if (search) {
            products = products.filter(product => 
                product.title.toLowerCase().includes(search.toLowerCase())
            );
        }

        return products;
    } catch (error) {
        console.error("Error fetching products: ", error);
        return [];
    }
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams?: {
    category?: string;
    search?: string;
  };
}) {
  const category = searchParams?.category;
  const search = searchParams?.search;
  const products = await getProducts(category, search);

  return (
    <div className="container mx-auto py-16 px-4 sm:px-6 lg:py-24 lg:px-8">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold font-headline tracking-tight text-primary sm:text-5xl lg:text-6xl">
          Our Products
        </h1>
        <p className="mt-6 max-w-2xl mx-auto text-xl text-muted-foreground">
          Browse our extensive catalog of high-quality medical equipment.
        </p>
      </div>
      
      <Suspense fallback={<div>Loading filters...</div>}>
        <ProductFilters />
      </Suspense>
      
      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-xl text-muted-foreground">No products found.</p>
          <p className="mt-2 text-muted-foreground">Try adjusting your search or filter criteria.</p>
        </div>
      )}
    </div>
  );
}

export const revalidate = 60; // Revalidate every 60 seconds
