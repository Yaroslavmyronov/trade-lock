interface ApiFetchOptions extends RequestInit {
  serverCookie?: string;
  headers?: Record<string, string>;
}

const BASE_URL = 'http://localhost:5108/api';

export const apiFetch = async (path: string, options: ApiFetchOptions = {}) => {
  const { serverCookie, headers, ...rest } = options;

  const fetchHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
    ...headers,
  };

  if (serverCookie) {
    fetchHeaders['cookie'] = serverCookie;
  }

  const isServer = typeof window === 'undefined';

  const res = await fetch(BASE_URL + path, {
    headers: fetchHeaders,
    credentials: isServer ? undefined : 'include',
    ...rest,
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error('❌ [apiFetch] Status:', res.status);
    console.error('❌ [apiFetch] Response text:', errorText);
    throw new Error(errorText || 'Request failed');
  }

  const contentType = res.headers.get('content-type') || '';
  if (contentType.includes('application/json')) {
    return res.json();
  }

  return res;
};
