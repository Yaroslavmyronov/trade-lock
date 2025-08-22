const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const apiFetch = async (path: string, options?: RequestInit) => {
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
    throw new Error(errorText || 'Request failed');
  }

  const contentType = res.headers.get('content-type') || '';

  if (contentType.includes('application/json')) {
    return await res.json();
  }

  return res;
};
