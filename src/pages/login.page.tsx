import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuthentication } from '@/hooks/use-authentication';
import { navigate } from '@/hooks/use-router';

import type { FormEventHandler } from 'react';

export default function LoginPage() {
  const { login } = useAuthentication();

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    const email = (form.elements.namedItem('email') as HTMLInputElement).value;
    const password = (form.elements.namedItem('password') as HTMLInputElement).value;

    // Ignore failing cases for now, don't need to be exhaustive
    login({ email, password, onSuccess: () => navigate('/assets') });
  };

  return (
    <main className="relative flex min-h-screen min-w-80 flex-col bg-background">
      <div className="flex h-screen w-full flex-col items-center justify-center gap-16 bg-background px-4">
        <Card as="form" onSubmit={handleSubmit} className="w-full max-w-sm">
          <CardHeader>
            <CardTitle as="h1" className="text-2xl">
              Login
            </CardTitle>
            <CardDescription>Enter your email below to login to your account.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="hello@example.com" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder="*********" required />
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full">Sign in</Button>
          </CardFooter>
        </Card>
      </div>
    </main>
  );
}
