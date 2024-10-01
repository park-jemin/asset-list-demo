import { buttonVariants } from '@/components/ui/button';
import { useAuthentication } from '@/hooks/use-authentication';
import { formatURL } from '@/hooks/use-router';

export default function NotFoundPage() {
  const { isAuthenticated } = useAuthentication();

  return (
    <main className="relative flex min-h-screen min-w-80 flex-col bg-background">
      <div className="flex h-screen w-full items-center justify-center bg-background px-4">
        <div className="grid gap-4">
          <h1 className="font-bold text-3xl">404 Not Found</h1>
          <p>The page you are looking for does not exist.</p>
          <a
            className={buttonVariants({ variant: 'outline', class: 'w-2/3' })}
            href={formatURL(isAuthenticated ? '/assets' : '/login')}
          >
            Go back to the main page
          </a>
        </div>
      </div>
    </main>
  );
}
