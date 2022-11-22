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
  const json = await res.json();
  console.log(`selectListTodo!`);
  console.log(json);
  return json;
}

export async function insertTodo(title) {
  const res = await fetch(API_URL, createRequest('POST', { title }));
  const json = await res.json();
  console.log(`insertTodo!`);
  console.log(json);
  return json;
}

export async function updateTodo(title, done, order) {
  const res = await fetch(API_URL, createRequest('PUT', { title, done, order }));
  const json = await res.json();
  console.log(`updateTodo!`);
  console.log(json);
  return json;
}

export async function deleteTodo(id) {
  const res = await fetch(API_URL + `/${id}`, createRequest('DELETE'));
  const json = await res.json();
  console.log(`deleteTodo!`);
  console.log(json);
}

export async function reorderTodo(todoIds) {
  const res = await fetch(API_URL, createRequest('PUT', { todoIds }));
  const json = await res.json();
  console.log(`reorderTodo!`);
  console.log(json);
}

/*
export const todo = {
  id: string // 할 일 ID
  order: number // 할 일 순서
  title: string // 할 일 제목
  done: boolean // 할 일 완료 여부
  createdAt: string // 할 일 생성일
  updatedAt: string // 할 일 수정일
}

// 순서 변경, 삭제 시 응답 데이터
type ResVal = true | false;

// 순서 변경 시 요청 데이터
type Reorder = {
  todoIds: string[] // 새롭게 정렬할 할 일 ID 목록 (필수!)
}

// 수정 시 요청 데이터
type Update = {
  title: string // 할 일 제목 (필수!)
  done: boolean // 할 일 완료 여부 (필수!)
  order: number // 할 일 순서
}

type Delete = {
  id: string // 할 일 ID
}
*/
