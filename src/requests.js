const API_URL = `https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos`;
const API_KEY = `FcKdtJs202209`;
const USER_NAME = `KDT3_AhnGaEul`;

const HEADER = {
  'content-type': 'application/json',
  apikey: API_KEY,
  username: USER_NAME,
};

function createRequest(type, data) {
  if (data) {
    return {
      method: type,
      headers: HEADER,
      body: JSON.stringify(data),
    };
  } else {
    return {
      method: type,
      headers: HEADER,
    };
  }
}

export async function selectListTodo() {
  const res = await fetch(API_URL, createRequest('GET'));
  try {
    return await res.json();
  } catch (e) {
    return false;
  }
}

export async function insertTodo(title, order) {
  const res = await fetch(API_URL, createRequest('POST', { title, order }));
  try {
    return await res.json();
  } catch (e) {
    return false;
  }
}

export async function updateTodo(id, title, done, order) {
  const res = await fetch(API_URL + `/${id}`, createRequest('PUT', { title, done, order }));
  try {
    return await res.json();
  } catch (e) {
    return false;
  }
}

export async function deleteTodo(id) {
  const res = await fetch(API_URL + `/${id}`, createRequest('DELETE'));
  try {
    return await res.json();
  } catch (e) {
    return false;
  }
}

export async function reorderTodo(todoIds) {
  const res = await fetch(API_URL, createRequest('PUT', { todoIds }));
  try {
    return await res.json();
  } catch (e) {
    return false;
  }
}
