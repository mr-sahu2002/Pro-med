import { SignupForm } from '@/components/auth/signup-form';
import { Logo } from '@/components/icons/logo';
import Link from 'next/link';

export default function SignupPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
       <div className='absolute top-8 left-8'>
        <Link href="/">
            <Logo />
        </Link>
      </div>
      <SignupForm />
    </div>
  );
}
