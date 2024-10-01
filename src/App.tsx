import { Suspense, lazy } from 'react';

import { useAuthentication } from '@/hooks/use-authentication';

import LoadingPage from './pages/loading.page';
import LoginPage from './pages/login.page';

const AssetsPage = lazy(() => import('./pages/assets.page'));

function App() {
  const { isAuthenticated } = useAuthentication();

  if (!isAuthenticated) {
    return <LoginPage />;
  }

  return (
    <Suspense fallback={<LoadingPage />}>
      <AssetsPage />
    </Suspense>
  );
}

export default App;
