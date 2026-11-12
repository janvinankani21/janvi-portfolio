import { useEffect, useState } from 'react';

/**
 * Checks whether a real resume PDF exists at `url` (without treating
 * Vite's SPA HTML fallback as a valid PDF).
 */
export function useResumeAvailability(url) {
  const [available, setAvailable] = useState(false);

  useEffect(() => {
    if (!url) {
      setAvailable(false);
      return undefined;
    }

    let cancelled = false;

    fetch(url, { method: 'HEAD' })
      .then((res) => {
        if (cancelled) return;
        const contentType = (res.headers.get('content-type') || '').toLowerCase();
        setAvailable(res.ok && contentType.includes('pdf'));
      })
      .catch(() => {
        if (!cancelled) setAvailable(false);
      });

    return () => {
      cancelled = true;
    };
  }, [url]);

  return available;
}
