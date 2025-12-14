import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Wrench, ShieldCheck, Presentation } from "lucide-react";
import Link from "next/link";

const supportOptions = [
    {
        title: "Service Request",
        description: "Facing an issue with your device? Our expert technicians are here to help. Submit a service request for a swift resolution.",
        icon: Wrench,
        buttonText: "Request Service",
        href: "/contact?inquiry=service"
    },
    {
        title: "Warranty Information",
        description: "All our products come with a manufacturer's warranty. Find out more about the warranty terms and conditions for your product.",
        icon: ShieldCheck,
        buttonText: "View Warranty Policy",
        href: "/faq"
    },
    {
        title: "Demo & Installation",
        description: "Need help setting up your new equipment or want a full product demonstration? Book a session with our specialists.",
        icon: Presentation,
        buttonText: "Book a Demo",
        href: "/contact?inquiry=demo"
    }
];

export default function SupportPage() {
    return (
        <div className="container mx-auto py-16 px-4 sm:px-6 lg:py-24 lg:px-8">
            <div className="text-center mb-16">
                <h1 className="text-4xl font-bold font-headline tracking-tight text-primary sm:text-5xl lg:text-6xl">
                    Support & Services
                </h1>
                <p className="mt-6 max-w-2xl mx-auto text-xl text-muted-foreground">
                    We are committed to providing you with the best post-sales support and services.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {supportOptions.map((option) => (
                    <Card key={option.title} className="flex flex-col">
                        <CardHeader className="flex-row items-center gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                                <option.icon className="h-6 w-6" />
                            </div>
                            <CardTitle>{option.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="flex flex-col flex-1">
                            <CardDescription className="flex-1">{option.description}</CardDescription>
                            <Button className="mt-6 w-full" asChild>
                                <Link href={option.href}>{option.buttonText}</Link>
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="mt-20 text-center bg-card p-8 rounded-lg">
                <h2 className="text-2xl font-bold text-foreground">Can't find what you're looking for?</h2>
                <p className="mt-2 text-muted-foreground">Our support team is always ready to assist you. Contact us directly for any specific queries.</p>
                <div className="mt-6">
                    <Button asChild>
                        <Link href="/contact">Contact Support</Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}
