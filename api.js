const BASE_URL = 'https://thinkful-list-api.herokuapp.com/julio/bookmarks';
const headerContent = { 'Content-Type': 'application/json' };

function getURLs() {
  return fetch(`${BASE_URL}`);
}

function createBookmark(body) {
  return fetch(`${BASE_URL}`, {
    method: 'POST',
    headers: headerContent,
    body: JSON.stringify(body),
  });
}

function updateBookmark(id, body) {
  return fetch(`${BASE_URL}/${id}`, {
    method: 'PATCH',
    headers: headerContent,
    body: JSON.stringify(body),
  });
}

function deleteBookmark(id) {
  return fetch(`${BASE_URL}/${id}`, {
    method: 'DELETE',
    headers: headerContent,
  });
}
export default {
  getURLs,
  createBookmark,
  deleteBookmark,
  updateBookmark,
};
