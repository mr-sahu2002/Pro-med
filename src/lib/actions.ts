'use server';

import { z } from 'zod';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from './firebase';
import { revalidatePath } from 'next/cache';
import { validateProductDetails } from '@/ai/flows/validate-product-details';
import { generateProductSpecs } from '@/ai/flows/generate-product-specs';

const contactFormSchema = z.object({
  name: z.string().min(2),
  phone: z.string().min(10),
  email: z.string().email(),
  productInterest: z.string().optional(),
  message: z.string().min(10),
});

export async function submitContactForm(data: unknown) {
  const parsedData = contactFormSchema.safeParse(data);

  if (!parsedData.success) {
    return { success: false, message: 'Invalid form data.' };
  }

  try {
    await addDoc(collection(db, 'enquiries'), {
      ...parsedData.data,
      createdAt: serverTimestamp(),
    });
    return { success: true, message: 'Enquiry submitted successfully.' };
  } catch (error) {
    return { success: false, message: 'Failed to submit enquiry.' };
  }
}

export async function addProduct(formData: FormData) {
  const title = formData.get('title') as string;
  const description = formData.get('description') as string;
  const category = formData.get('category') as string;
  const price = formData.get('price');
  const demo_link = formData.get('demo_link');
  const images = formData.getAll('images') as File[];

  try {
    // 1. AI Validation
    const validationResult = await validateProductDetails({ title, description });
    if (!validationResult.isValid) {
      return { success: false, aiValidation: false, message: validationResult.reason };
    }

    // 2. Image Upload
    if (images.length === 0 || images.every(img => img.size === 0)) {
      return { success: false, message: 'At least one image is required' };
    }
    
    if (images.length > 4) {
      return { success: false, message: 'You can upload a maximum of 4 images.' };
    }

    const imageUrls: string[] = [];
    for (const image of images) {
      if (image.size === 0) continue;
      const storageRef = ref(storage, `products/${Date.now()}-${image.name}`);
      const snapshot = await uploadBytes(storageRef, image);
      const downloadURL = await getDownloadURL(snapshot.ref);
      imageUrls.push(downloadURL);
    }
    
    // 3. AI Spec Generation
    let specs = [];
    try {
      specs = await generateProductSpecs({ title, description });
    } catch (e) {
      console.warn('AI spec generation failed, but continuing without specs.', e);
    }
    

    // 4. Save to Firestore
    const productData: any = {
      title,
      description,
      category,
      imageUrls,
      specs: Array.isArray(specs) ? specs : [],
      createdAt: serverTimestamp(),
    };

    if (price) productData.price = Number(price);
    if (demo_link) productData.demo_link = demo_link;

    await addDoc(collection(db, 'products'), productData);

    revalidatePath('/products');
    revalidatePath('/admin');
    
    return { success: true, message: 'Product added successfully' };

  } catch (error: any) {
    console.error("Error in addProduct:", error);
    let errorMessage = 'Failed to add product.';
    if (error instanceof Error) {
        errorMessage = `Failed to add product: ${error.message}`;
        if (error.cause) {
            errorMessage += ` Cause: ${error.cause}`;
        }
    }
    return { success: false, message: errorMessage };
  }
}
