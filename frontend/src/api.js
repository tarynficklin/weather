// The cards API in server/ (Vite proxies /api to it). Every call resolves to the full,
// updated list of cards, like the Express version did.
const request = async (method, path = '', body) => {
  const res = await fetch(`/api/cards${path}`, {
    method,
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
