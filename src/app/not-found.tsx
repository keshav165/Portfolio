import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 text-center bg-background">
      <div className="max-w-md mx-auto space-y-6">
        <h1 className="text-8xl md:text-9xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
          404
        </h1>
        
        <h2 className="text-2xl md:text-3xl font-semibold">
          Page Not Found
        </h2>
        
        <p className="text-foreground/70">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>
        
        <div className="pt-6">
          <Button asChild className="group">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
              Back to Home
            </Link>
          </Button>
        </div>
      </div>
      
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-1/2 right-0 w-[800px] h-[800px] rounded-full bg-gradient-to-r from-primary/5 to-transparent blur-3xl" />
        <div className="absolute -bottom-1/3 -left-1/4 w-[600px] h-[600px] rounded-full bg-gradient-to-r from-primary/5 to-transparent blur-3xl" />
      </div>
    </div>
  );
}
