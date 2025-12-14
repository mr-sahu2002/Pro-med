import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { FaqItem } from "@/types";

// This data would ideally be fetched from Firestore
const faqItems: FaqItem[] = [
  {
    id: "faq-1",
    question: "How does Cash on Delivery (COD) work?",
    answer:
      "Cash on Delivery (COD) allows you to pay for your order in cash at the time of delivery. Simply select the 'Request COD Order' option on the product page, and our team will contact you to confirm the order and delivery details. Payment is made directly to the courier partner.",
  },
  {
    id: "faq-2",
    question: "What is the delivery time for orders?",
    answer:
      "Delivery times vary based on your location. Typically, orders are delivered within 5-7 business days for metro cities and 7-10 business days for other areas. You will receive a tracking link once your order is shipped.",
  },
  {
    id: "faq-3",
    question: "What is the warranty policy on your products?",
    answer:
      "All our products come with a manufacturer's warranty. The warranty period varies by product and is specified on the product details page. For warranty claims, please visit our Support page and fill out the service request form.",
  },
  {
    id: "faq-4",
    question: "What is your return policy?",
    answer:
      "We have a 10-day return policy for products that are damaged, defective, or different from what you ordered. The product must be in its original packaging and unused. Please contact our support team to initiate a return.",
  },
  {
    id: "faq-5",
    question: "How can I book a product demo or installation?",
    answer:
      "You can book a demo or installation by visiting our Support page and filling out the corresponding form. Our technical team will schedule a visit at your convenience. Some demos can also be conducted online.",
  },
    {
    id: "faq-6",
    question: "How do I troubleshoot common issues with my device?",
    answer:
      "Many common issues can be resolved by consulting the user manual provided with your device. We also have a series of Demo & Troubleshooting videos available on our website. If the issue persists, please do not hesitate to contact our technical support team.",
  },
];

export default function FaqPage() {
  return (
    <div className="container mx-auto max-w-4xl py-16 px-4 sm:px-6 lg:py-24 lg:px-8">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold font-headline tracking-tight text-primary sm:text-5xl lg:text-6xl">
          Frequently Asked Questions
        </h1>
        <p className="mt-6 max-w-2xl mx-auto text-xl text-muted-foreground">
          Find answers to common questions about our products and services.
        </p>
      </div>

      <Accordion type="single" collapsible className="w-full">
        {faqItems.map((item) => (
          <AccordionItem key={item.id} value={item.id}>
            <AccordionTrigger className="text-lg text-left font-medium">
              {item.question}
            </AccordionTrigger>
            <AccordionContent className="text-base text-muted-foreground">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
