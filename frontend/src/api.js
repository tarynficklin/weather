// The cards API in backend/. Every call resolves to the full, updated list of cards, like the
// Express version did. A build calls the API directly at VITE_API_URL (the API's own address
// when deployed, so the API has to list this site in its ALLOWED_ORIGINS); under the Vite dev
// server it stays '' and Vite proxies /api to the backend.
const apiBase = import.meta.env.DEV ? '' : (import.meta.env.VITE_API_URL ?? '').replace(/\/+$/, '');

const request = async (method, path = '', body) => {
  const res = await fetch(`${apiBase}/api/cards${path}`, {
    method,
    credentials: 'include',
    headers: body ? { 'Content-Type': 'application/json' } : undefined,
    body: body && JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`${method} /api/cards${path}: HTTP ${res.status}`);
  return res.json();
};

export const getCards = () => request('GET');
export const addCard = (card) => request('POST', '', card);
export const updateCard = (id, card) => request('PUT', `/${id}`, card);
export const removeCard = (id) => request('DELETE', `/${id}`);
