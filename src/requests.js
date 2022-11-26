import { showToast } from './setElements';

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
    showToast();
    throw new Error('데이터 조회에 실패하였습니다.');
  }
}

export async function insertTodo(title, order) {
  try {
    await fetch(API_URL, createRequest('POST', { title, order }));
  } catch {
    showToast();
    throw new Error('데이터 추가에 실패하였습니다.');
  }
}

export async function updateTodo({ id, title, done, order }) {
  try {
    const res = await fetch(API_URL + `/${id}`, createRequest('PUT', { title, done, order }));
  } catch {
    showToast();
    throw new Error('데이터 수정에 실패하였습니다.');
  }
}

export async function deleteTodo(id) {
  try {
    await fetch(API_URL + `/${id}`, createRequest('DELETE'));
  } catch {
    showToast();
    throw new Error('데이터 삭제에 실패하였습니다.');
  }
}

export async function deleteListTodo(ids) {
  try {
    for (let id of ids) {
      await fetch(API_URL + `/${id}`, createRequest('DELETE'));
    }
  } catch {
    showToast();
    throw new Error('데이터 삭제에 실패하였습니다.');
  }
}

export async function reorderTodo(todoIds) {
  try {
    await fetch(API_URL + `/reorder`, createRequest('PUT', { todoIds }));
  } catch {
    showToast();
    throw new Error('데이터 정렬에 실패하였습니다.');
  }
}
