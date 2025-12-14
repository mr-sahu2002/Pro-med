import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { DemoVideo } from '@/types';

// This data would ideally be fetched from Firestore
const demoVideos: DemoVideo[] = [
  { id: '1', title: 'How to use a Digital Blood Pressure Monitor', embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
  { id: '2', title: 'Setting up your Portable Oxygen Concentrator', embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
  { id: '3', title: 'Assembling and Using a Wheelchair', embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
  { id: '4', title: 'Nebulizer: A Complete Guide for Home Use', embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
  { id: '5', title: 'Patient Monitor Setup and Basic Functions', embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
  { id: '6', title: 'Infusion Pump: Operation and Safety', embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
];

export default function DemoVideosPage() {
  return (
    <div className="container mx-auto py-16 px-4 sm:px-6 lg:py-24 lg:px-8">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold font-headline tracking-tight text-primary sm:text-5xl lg:text-6xl">
          Product Demo Videos
        </h1>
        <p className="mt-6 max-w-2xl mx-auto text-xl text-muted-foreground">
          Watch our tutorials to get the most out of your medical equipment.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {demoVideos.map((video) => (
          <Card key={video.id} className="overflow-hidden">
            <div className="aspect-w-16 aspect-h-9">
              <iframe
                src={video.embedUrl}
                title={video.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </div>
            <CardHeader>
              <CardTitle className="text-lg">{video.title}</CardTitle>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
}
