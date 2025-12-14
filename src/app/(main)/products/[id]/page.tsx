import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { Product } from '@/types';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { Download, Film, MessageCircle, Phone } from 'lucide-react';
import Link from 'next/link';
import { ProductImageGallery } from '@/components/product-image-gallery';

async function getProduct(id: string): Promise<Product | null> {
    try {
        const docRef = doc(db, 'products', id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return { id: docSnap.id, ...docSnap.data() } as Product;
        } else {
            return null;
        }
    } catch (error) {
        console.error("Error fetching product:", error);
        return null;
    }
}

export default async function ProductDetailsPage({ params }: { params: { id: string } }) {
    const product = await getProduct(params.id);

    if (!product) {
        notFound();
    }
    
    const specs = Array.isArray(product.specs) ? product.specs : [];

    return (
        <div className="container mx-auto py-16 px-4 sm:px-6 lg:py-24 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <ProductImageGallery imageUrls={product.imageUrls} title={product.title} />
                <div>
                    <Badge variant="secondary">{product.category}</Badge>
                    <h1 className="mt-2 text-3xl sm:text-4xl font-bold font-headline tracking-tight text-foreground">{product.title}</h1>
                    <p className="mt-4 text-lg text-muted-foreground">{product.description}</p>
                    
                    <div className="mt-8">
                        <Button size="lg" className="w-full sm:w-auto">Request COD Order</Button>
                    </div>

                    <div className="mt-10 space-y-8">
                        {specs.length > 0 && (
                            <Card>
                                <CardHeader><CardTitle>Specifications</CardTitle></CardHeader>
                                <CardContent>
                                    <Table>
                                        <TableBody>
                                            {specs.map((spec) => (
                                                <TableRow key={spec.name}>
                                                    <TableCell className="font-medium">{spec.name}</TableCell>
                                                    <TableCell>{spec.value}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </CardContent>
                            </Card>
                        )}

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {product.brochureUrl && (
                                <Button variant="outline" asChild>
                                    <a href={product.brochureUrl} target="_blank" rel="noopener noreferrer">
                                        <Download className="mr-2 h-4 w-4" /> Download Brochure
                                    </a>
                                </Button>
                            )}
                            {product.demo_link && (
                                <Button variant="outline" asChild>
                                    <a href={product.demo_link} target="_blank" rel="noopener noreferrer">
                                        <Film className="mr-2 h-4 w-4" /> Watch Demo Video
                                    </a>
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
             <Card className="mt-16">
                <CardHeader>
                    <CardTitle>Have Questions?</CardTitle>
                    <p className="text-muted-foreground">Our product specialists are here to help.</p>
                </CardHeader>
                <CardContent className="flex flex-col sm:flex-row gap-4">
                    <Button asChild className="flex-1">
                        <Link href={`/contact?productInterest=${encodeURIComponent(product.title)}`}>
                            <MessageCircle className="mr-2 h-4 w-4"/> Ask a Question
                        </Link>
                    </Button>
                    <Button variant="secondary" asChild className="flex-1">
                        <a href="tel:+911234567890">
                           <Phone className="mr-2 h-4 w-4"/> Call Us
                        </a>
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}

export const revalidate = 60; // Revalidate page every 60 seconds
