const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const apiFetch = async <T = any>(
  path: string,
  options?: RequestInit,
): Promise<{ data: T | null; error: string | null }> => {
  try {
    const res = await fetch(BASE_URL + path, {
      headers: {
        'Content-Type': 'application/json',
        ...(options?.headers || {}),
      },
      credentials: 'include',
      ...options,
    });

    if (!res.ok) {
      const errorText = await res.text();
      return { data: null, error: errorText || 'Request failed' };
    }

    const contentType = res.headers.get('content-type') || '';
    if (contentType.includes('application/json')) {
      const json = await res.json();
      return { data: json, error: null };
    }

    return { data: (await res.text()) as any, error: null };
  } catch (err: any) {
    return { data: null, error: err.message || 'Network error' };
  }
};
