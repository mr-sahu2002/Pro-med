import { Building, Award, Target, Users } from "lucide-react";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const values = [
    {
        name: 'Our Mission',
        description: 'To enhance healthcare across India by providing accessible, reliable, and innovative medical technology.',
        icon: Target,
    },
    {
        name: 'Our Vision',
        description: 'To be India\'s most trusted medical equipment provider, recognized for our commitment to quality, service, and patient care.',
        icon: Building,
    },
    {
        name: 'Our Team',
        description: 'A dedicated group of professionals passionate about making a difference in the healthcare industry.',
        icon: Users,
    },
];

const certifications = [
    { name: 'ISO 9001:2015', description: 'Quality Management Systems', icon: Award },
    { name: 'ISO 13485:2016', description: 'Medical Devices Quality Management', icon: Award },
    { name: 'CE Certified', description: 'Conformity with European standards', icon: Award },
]

export default function AboutPage() {
    return (
        <div className="bg-background">
            <div className="container mx-auto py-16 px-4 sm:px-6 lg:py-24 lg:px-8">
                <div className="text-center">
                    <h1 className="text-4xl font-bold font-headline tracking-tight text-primary sm:text-5xl lg:text-6xl">About ProMed Devices</h1>
                    <p className="mt-6 max-w-2xl mx-auto text-xl text-muted-foreground">
                        Pioneering healthcare solutions with a commitment to quality and trust.
                    </p>
                </div>

                <div className="mt-16 lg:grid lg:grid-cols-2 lg:gap-16 lg:items-center">
                    <div className="relative h-96 rounded-lg overflow-hidden">
                        <Image
                            className="object-cover"
                            src="https://picsum.photos/seed/team/800/600"
                            alt="Our Team"
                            fill
                            data-ai-hint="medical team"
                        />
                    </div>
                    <div className="mt-12 lg:mt-0">
                        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Our Story</h2>
                        <p className="mt-4 text-lg text-muted-foreground">
                            Founded with the vision to bridge the gap in quality medical equipment availability, ProMed Devices has grown from a small enterprise into a leading national supplier. Our journey is driven by a passion for innovation and an unwavering commitment to the healthcare community. We believe that every hospital, clinic, and patient deserves access to the best medical technology, and we work tirelessly to make that a reality.
                        </p>
                    </div>
                </div>

                <div className="mt-24">
                    <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
                        {values.map((value) => (
                            <div key={value.name} className="text-center">
                                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-primary-foreground mx-auto">
                                    <value.icon className="h-6 w-6" aria-hidden="true" />
                                </div>
                                <div className="mt-5">
                                    <h3 className="text-lg leading-6 font-medium text-foreground">{value.name}</h3>
                                    <p className="mt-2 text-base text-muted-foreground">{value.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-24 bg-card p-8 rounded-lg">
                    <h2 className="text-3xl font-bold tracking-tight text-foreground text-center sm:text-4xl">Our Certifications & Trust</h2>
                    <p className="mt-4 text-lg text-muted-foreground text-center max-w-3xl mx-auto">
                        We adhere to the highest standards of quality and safety, ensuring all our products meet rigorous national and international certifications.
                    </p>
                    <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        {certifications.map(cert => (
                             <Card key={cert.name} className="text-center">
                                <CardHeader>
                                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                                        <cert.icon className="h-6 w-6" />
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <CardTitle className="text-lg font-semibold text-foreground">{cert.name}</CardTitle>
                                    <p className="mt-2 text-base text-muted-foreground">{cert.description}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
