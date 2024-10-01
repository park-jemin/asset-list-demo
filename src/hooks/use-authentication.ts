import { useCallback, useEffect } from 'react';
import { useSessionStorage } from './use-session-storage';

const DEMO_EMAIL = 'demo@example.com';
const DEMO_PASSWORD = 'demo';

type AuthToken = {
  expires: number;
};

const ttl = 5 * 60 * 1000; // 5 minutes

// Really basic auth hook to simulate login/logout. Preserves the session on the current page.
export function useAuthentication() {
  const [token, setToken, removeToken] = useSessionStorage<AuthToken | undefined>(
    'asset-demo-auth',
    undefined
  );

  const login = useCallback(
    ({ email, password }: { email: string; password: string }) => {
      if (email !== DEMO_EMAIL || password !== DEMO_PASSWORD) {
        return;
      }

      const now = new Date();

      setToken({ expires: now.getTime() + ttl });
    },
    [setToken]
  );

  const logout = useCallback(() => {
    removeToken();
  }, [removeToken]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: we know what we're doing
  useEffect(() => {
    if (token && new Date().getTime() > token.expires) {
      logout();
    }
  }, [token?.expires, logout]);

  return {
    isAuthenticated: !!token,
    login,
    logout,
  } as const;
}
