import { useEffect, useState } from 'react';
import { apiFetch } from '../api/fetchInstance';
import { useGlobalState } from '../store/useGlobalState';

export function useFetch<T = unknown>(
  url: string,
  config?: RequestInit,
  skip: boolean = false,
) {
  const { authStatus } = useGlobalState();
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (skip) return;
    if (!url || authStatus !== 'authenticated') {
      setLoading(false);
      return;
    }

    let isCancelled = false;
    setLoading(true);

    apiFetch(url)
      .then((response) => {
        if (!isCancelled) {
          setData(response);
          setError(null);
        }
      })
      .catch((error) => {
        if (!isCancelled) {
          setError(error);
          setData(null);
        }
      })
      .finally(() => {
        if (!isCancelled) {
          setLoading(false);
        }
      });

    return () => {
      isCancelled = true;
    };
  }, [url, authStatus, config, skip]);

  return { data, error, loading };
}
