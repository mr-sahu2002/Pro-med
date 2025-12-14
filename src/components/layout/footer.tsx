import Link from 'next/link';
import { Logo } from '../icons/logo';
import { Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

const footerLinks = [
  {
    title: 'Company',
    links: [
      { label: 'About Us', href: '/about' },
      { label: 'Contact Us', href: '/contact' },
    ],
  },
  {
    title: 'Products',
    links: [
      { label: 'Diagnostic Devices', href: '/products?category=Diagnostic+Devices' },
      { label: 'Respiratory Care', href: '/products?category=Respiratory+Care' },
      { label: 'Mobility Aids', href: '/products?category=Mobility+Aids' },
      { label: 'Hospital Supplies', href: '/products?category=Hospital+Supplies' },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'FAQs', href: '/faq' },
      { label: 'Demo Videos', href: '/demo-videos' },
      { label: 'Service Request', href: '/support' },
    ],
  },
];

const socialLinks = [
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Instagram, href: '#', label: 'Instagram' },
];

export function Footer() {
  return (
    <footer className="bg-card border-t">
      <div className="container py-12 px-4 sm:px-6 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8 xl:col-span-1">
            <Logo className="h-auto" />
            <p className="text-muted-foreground text-base">
              Your trusted partner for medical equipment.
            </p>
            <div className="flex space-x-6">
              {socialLinks.map((social) => (
                <a key={social.label} href={social.href} className="text-muted-foreground hover:text-primary">
                  <span className="sr-only">{social.label}</span>
                  <social.icon className="h-6 w-6" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase">
                  {footerLinks[0].title}
                </h3>
                <ul className="mt-4 space-y-4">
                  {footerLinks[0].links.map((link) => (
                    <li key={link.label}>
                      <Link href={link.href} className="text-base text-muted-foreground hover:text-primary">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase">
                  {footerLinks[2].title}
                </h3>
                <ul className="mt-4 space-y-4">
                  {footerLinks[2].links.map((link) => (
                    <li key={link.label}>
                      <Link href={link.href} className="text-base text-muted-foreground hover:text-primary">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-1 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase">
                  {footerLinks[1].title}
                </h3>
                <ul className="mt-4 space-y-4">
                  {footerLinks[1].links.map((link) => (
                    <li key={link.label}>
                      <Link href={link.href} className="text-base text-muted-foreground hover:text-primary">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-border pt-8">
          <p className="text-base text-muted-foreground text-center">
            &copy; {new Date().getFullYear()} ProMed Devices. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
