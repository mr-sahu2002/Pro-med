'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Phone, Mail, MapPin, MessageCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { submitContactForm } from '@/lib/actions';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

const contactFormSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  phone: z.string().min(10, { message: 'Please enter a valid phone number.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  productInterest: z.string().optional(),
  message: z.string().min(10, { message: 'Message must be at least 10 characters.' }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export default function ContactPage() {
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const inquiry = searchParams.get('inquiry');

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      phone: '',
      email: '',
      productInterest: '',
      message: inquiry === 'demo' ? 'I would like to request a product demo.' : '',
    },
  });
  
  useEffect(() => {
    if (inquiry === 'demo') {
      form.setValue('message', 'I would like to request a product demo.');
    }
  }, [inquiry, form]);


  async function onSubmit(data: ContactFormValues) {
    const result = await submitContactForm(data);
    if (result.success) {
      toast({
        title: 'Form Submitted!',
        description: 'Thank you for contacting us. We will get back to you shortly.',
      });
      form.reset();
    } else {
      toast({
        title: 'Submission Failed',
        description: result.message,
        variant: 'destructive',
      });
    }
  }

  return (
    <div className="container mx-auto py-16 px-4 sm:px-6 lg:py-24 lg:px-8">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold font-headline tracking-tight text-primary sm:text-5xl lg:text-6xl">
          Contact Us
        </h1>
        <p className="mt-6 max-w-2xl mx-auto text-xl text-muted-foreground">
          We're here to help. Reach out to us for any inquiries or support.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <Card>
          <CardHeader>
            <CardTitle>Send us a message</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input placeholder="+91 1234567890" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <Input placeholder="you@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="productInterest"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Product of Interest (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Oxygen Concentrator" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Tell us how we can help"
                          className="min-h-[120px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={form.formState.isSubmitting}>
                  {form.formState.isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        <div className="space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle>Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-start gap-4">
                        <Mail className="h-6 w-6 text-primary mt-1"/>
                        <div>
                            <h3 className="font-semibold">Email</h3>
                            <a href="mailto:sales@promedindia.com" className="text-muted-foreground hover:text-primary">sales@promedindia.com</a>
                        </div>
                    </div>
                     <div className="flex items-start gap-4">
                        <Phone className="h-6 w-6 text-primary mt-1"/>
                        <div>
                            <h3 className="font-semibold">Phone</h3>
                            <a href="tel:+911234567890" className="text-muted-foreground hover:text-primary">+91 123 456 7890</a>
                        </div>
                    </div>
                     <div className="flex items-start gap-4">
                        <MapPin className="h-6 w-6 text-primary mt-1"/>
                        <div>
                            <h3 className="font-semibold">Address</h3>
                            <p className="text-muted-foreground">123 Medical Lane, Health City, New Delhi, 110001, India</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
            
            <div className="flex gap-4">
                <Button className="flex-1" asChild>
                    <a href="https://wa.me/911234567890" target="_blank" rel="noopener noreferrer">
                        <MessageCircle className="mr-2 h-5 w-5"/> WhatsApp Us
                    </a>
                </Button>
                <Button variant="outline" className="flex-1" asChild>
                    <a href="tel:+911234567890">
                        <Phone className="mr-2 h-5 w-5"/> Call Now
                    </a>
                </Button>
            </div>
        </div>
      </div>
    </div>
  );
}
