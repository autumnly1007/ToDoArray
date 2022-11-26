const API_URL = `https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos`;
const API_KEY = `FcKdtJs202209`;
const USER_NAME = `KDT3_AhnGaEul`;

const HEADER = {
  'content-type': 'application/json',
  apikey: API_KEY,
  username: USER_NAME,
};

function createRequest(type, data) {
  const request = { method: type, headers: HEADER };
  if (data) request.body = JSON.stringify(data);
  return request;
}

export async function selectListTodo() {
  try {
    const res = await fetch(API_URL, createRequest('GET'));
    return await res.json();
  } catch {
    return false;
  }
}

export async function insertTodo(title, order) {
  try {
    await fetch(API_URL, createRequest('POST', { title, order }));
    return true;
  } catch {
    return false;
  }
}

export async function updateTodo({ id, title, done, order }) {
  try {
    const res = await fetch(API_URL + `/${id}`, createRequest('PUT', { title, done, order }));
    return true;
  } catch {
    return false;
  }
}

export async function deleteTodo(id) {
  try {
    await fetch(API_URL + `/${id}`, createRequest('DELETE'));
    return true;
  } catch {
    return false;
  }
}

export async function deleteListTodo(ids) {
  try {
    for (let id of ids) {
      await fetch(API_URL + `/${id}`, createRequest('DELETE'));
    }
    return true;
  } catch {
    return false;
  }
}

export async function reorderTodo(todoIds) {
  try {
    await fetch(API_URL, createRequest('PUT', { todoIds }));
    return true;
  } catch {
    return false;
  }
}
