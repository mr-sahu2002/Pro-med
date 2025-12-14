'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { addProduct } from '@/lib/actions';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal } from 'lucide-react';

const MAX_IMAGES = 4;

const productSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  category: z.enum(['Diagnostic Devices', 'Respiratory Care', 'Mobility Aids', 'Hospital Supplies', 'disposal']),
  price: z.coerce.number().positive('Price must be a positive number').optional(),
  demo_link: z.string().url('Must be a valid URL').optional().or(z.literal('')),
  images: z.any()
    .refine((files) => files?.length > 0, 'At least one image is required.')
    .refine((files) => files?.length <= MAX_IMAGES, `You can upload a maximum of ${MAX_IMAGES} images.`)
    .refine((files) => Array.from(files).every((file: any) => file.size < 5 * 1024 * 1024), 'Each file must be less than 5MB.'),
});

type ProductFormValues = z.infer<typeof productSchema>;

const categories = ['Diagnostic Devices', 'Respiratory Care', 'Mobility Aids', 'Hospital Supplies', 'disposal'];

export function ProductForm() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      title: '',
      description: '',
      category: 'Diagnostic Devices',
      demo_link: '',
    },
  });

  async function onSubmit(data: ProductFormValues) {
    setIsLoading(true);
    setAiError(null);

    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (key === 'images') {
        Array.from(value as FileList).forEach(file => {
          formData.append('images', file);
        });
      } else if (value !== undefined) {
        formData.append(key, String(value));
      }
    });

    const result = await addProduct(formData);

    if (result.success) {
      toast({
        title: 'Product Added',
        description: 'The new product has been successfully added.',
      });
      form.reset();
    } else {
        if (result.aiValidation === false) {
             setAiError(result.message);
             toast({
                title: 'AI Validation Failed',
                description: 'Please review the suggestions and resubmit.',
                variant: 'destructive',
             });
        } else {
            toast({
                title: 'Error',
                description: result.message,
                variant: 'destructive',
            });
        }
    }
    setIsLoading(false);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add New Product</CardTitle>
      </CardHeader>
      <CardContent>
        {aiError && (
            <Alert variant="destructive" className="mb-6">
                <Terminal className="h-4 w-4" />
                <AlertTitle>AI Content Suggestion</AlertTitle>
                <AlertDescription>{aiError}</AlertDescription>
            </Alert>
        )}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Title</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Digital Blood Pressure Monitor" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Describe the product, its features, and benefits." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid md:grid-cols-2 gap-8">
                <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                        <SelectTrigger>
                            <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                        {categories.map(cat => <SelectItem key={cat} value={cat}>{cat}</SelectItem>)}
                        </SelectContent>
                    </Select>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Price (Optional)</FormLabel>
                    <FormControl>
                        <Input type="number" placeholder="Enter price in INR" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
            </div>
            <FormField
                control={form.control}
                name="demo_link"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Demo Video URL (Optional)</FormLabel>
                    <FormControl>
                        <Input type="url" placeholder="https://youtube.com/watch?v=..." {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
            <FormField
                control={form.control}
                name="images"
                render={({ field: { onChange, value, ...rest } }) => (
                    <FormItem>
                    <FormLabel>Product Images</FormLabel>
                    <FormControl>
                        <Input type="file" multiple accept="image/*" onChange={(e) => onChange(e.target.files)} {...rest} />
                    </FormControl>
                    <FormDescription>Upload up to 4 images (max 5MB each).</FormDescription>
                    <FormMessage />
                    </FormItem>
                )}
                />
            
            <Button type="submit" disabled={isLoading}>
                {isLoading ? 'Adding Product...' : 'Add Product'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
