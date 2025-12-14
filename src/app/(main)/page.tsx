import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Stethoscope, HeartPulse, Pill, Syringe } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import promedBanner from './promed_bg.jpg';

const categories = [
  { name: 'Diagnostic Devices', icon: Stethoscope, href: '/products?category=Diagnostic+Devices', description: 'Accurate and reliable diagnostic tools.' },
  { name: 'Respiratory Care', icon: HeartPulse, href: '/products?category=Respiratory+Care', description: 'Advanced solutions for respiratory health.' },
  { name: 'Mobility Aids', icon: Pill, href: '/products?category=Mobility+Aids', description: 'Enhancing independence and mobility.' },
  { name: 'Hospital Supplies', icon: Syringe, href: '/products?category=Hospital+Supplies', description: 'Comprehensive supplies for medical facilities.' },
];

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <section className="relative w-full h-[60vh] md:h-[80vh] bg-gradient-to-r from-teal-50 to-blue-50">
        <Image
          src={promedBanner} 
          alt="Medical Equipment"
          fill
          className="object-cover opacity-20"
          data-ai-hint="medical equipment"
          priority
        />
        <div className="relative container mx-auto flex flex-col items-center justify-center h-full text-center px-4">
          <h1 className="text-4xl md:text-6xl font-headline font-bold text-primary tracking-tight">
            ProMed Devices
          </h1>
          <p className="mt-4 max-w-2xl text-lg md:text-xl text-foreground">
            Your trusted partner for high-quality medical equipment and supplies in India.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button size="lg" asChild>
              <Link href="/products">Shop Now</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/contact?inquiry=demo">Request a Demo</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/support">Service</Link>
            </Button>
          </div>
        </div>
      </section>

      <section id="categories" className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold font-headline tracking-tight text-foreground sm:text-4xl">
              Our Product Categories
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
              Explore our wide range of medical devices and supplies.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((category) => (
              <Link href={category.href} key={category.name}>
                <Card className="text-center hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
                  <CardHeader>
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <category.icon className="h-6 w-6" aria-hidden="true" />
                    </div>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <CardTitle className="text-lg font-semibold text-foreground">{category.name}</CardTitle>
                    <CardDescription className="mt-2 text-base text-muted-foreground">{category.description}</CardDescription>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-card py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-3xl font-bold font-headline tracking-tight text-foreground sm:text-4xl">
              Committed to Quality and Care
            </h2>
            <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
              At ProMed Devices, our mission is to enhance healthcare across the nation by providing reliable, state-of-the-art medical equipment. We are dedicated to supporting healthcare professionals and improving patient outcomes with every product we deliver.
            </p>
            <div className="mt-8">
              <Button size="lg" variant="outline" asChild>
                <Link href="/about">Learn More About Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
