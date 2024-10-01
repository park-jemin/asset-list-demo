import { useAuthentication } from '@/hooks/use-authentication';

import AssetsPage from '@/pages/assets.page';
import LoginPage from '@/pages/login.page';

function App() {
  const { isAuthenticated } = useAuthentication();

  if (!isAuthenticated) {
    return <LoginPage />;
  }

  return <AssetsPage />;
}

export default App;
