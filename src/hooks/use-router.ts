import { useSyncExternalStore } from 'react';

// WE ARE RIPPING THIS OUT BECAUSE OF GITHUB PAGES

/**
 * History API docs @see https://developer.mozilla.org/en-US/docs/Web/API/History
 */
const EVENTS = Object.freeze({
  popstate: 'popstate',
  pushState: 'pushState',
  replaceState: 'replaceState',
  hashchange: 'hashchange',
});

const subscribeToLocationUpdates = (callback: (e: Event) => void) => {
  for (const event of Object.values(EVENTS)) {
    addEventListener(event, callback);
  }
  return () => {
    for (const event of Object.values(EVENTS)) {
      removeEventListener(event, callback);
    }
  };
};

// NOTE: With Vite, the base URL is set on the "base" field in vite.config.ts. This can then be accessed
// via import.meta.env.BASE_URL. However, this leads to a lot of complications with naively trying to access
// and do operations on urls and paths, so we just gotta hack around it this way.
export const formatURL = (pathname: string) =>
  import.meta.env.BASE_URL + (pathname.at(0) === '/' ? pathname.slice(1) : pathname);

/**
 * This returns the pathname relative to the current base.
 * e.g., if the base is '/hello/', and the current location is 'http://localhost:3000/hello/world',
 * this function will return '/world'.
 */
const extractPathname = (location: Location) => {
  if (import.meta.env.BASE_URL === '/') {
    return location.pathname;
  }

  const baseUrl = location.origin + import.meta.env.BASE_URL;
  if (location.href.startsWith(baseUrl)) {
    return location.href.slice(baseUrl.length - 1);
  }
  return location.pathname;
};

export const usePathname = () =>
  useSyncExternalStore(subscribeToLocationUpdates, () => extractPathname(location));

export const navigate = <S>(to: string | URL, options?: { replace?: boolean; state?: S }): void =>
  history[options?.replace ? EVENTS.replaceState : EVENTS.pushState](
    options?.state ?? null,
    '',
    typeof to === 'string' ? formatURL(to) : to
  );

export const useRouter = () => {
  const pathname = usePathname();

  return { pathname, navigate } as const;
};
