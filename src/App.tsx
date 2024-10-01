import { Suspense, lazy } from 'react';

import { useAuthentication } from '@/hooks/use-authentication';
import { useRouter } from '@/hooks/use-router';

import LoadingPage from './pages/loading.page';
import LoginPage from './pages/login.page';

const AssetsPage = lazy(() => import('./pages/assets.page'));
const NotFoundPage = lazy(() => import('./pages/404.page'));

function Routes() {
  const { pathname } = useRouter();

  switch (pathname) {
    case '/assets':
    case '/':
      return <AssetsPage />;
    case '/login':
      return <LoginPage />;
    default:
      return <NotFoundPage />;
  }
}

function App() {
  const { isAuthenticated } = useAuthentication();

  if (!isAuthenticated) {
    return <LoginPage />;
  }

  return (
    <Suspense fallback={<LoadingPage />}>
      <Routes />
    </Suspense>
  );
}

export default App;
