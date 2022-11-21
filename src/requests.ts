const API_URL: string = `https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos`;
const API_KEY: string = `FcKdtJs202209`;
const USER_NAME: string = `KDT3_AhnGaEul`;

const HEADER: HeadersInit = {
  'content-type': 'application/json',
  'apikey': API_KEY,
  'username': USER_NAME
};

function createRequest(type: string, data?: object): RequestInit {
  if (data) {
    return {
      method: type,
      headers: HEADER,
      body: JSON.stringify(data)
    };
  } else {
    return {
      method: type,
      headers: HEADER
    };
  }
}

export async function selectListTodo(): Promise<Todo[]> {
  const res: Response = await fetch(API_URL, createRequest('GET'));
  const json: Promise<Todo[]> = await res.json();
  console.log(`selectListTodo!`)
  console.log(json);
  return json;
}

export async function insertTodo(title: string): Promise<Todo> {
  const res: Response = await fetch(API_URL, createRequest('POST', { title }));
  const json: Promise<Todo> = await res.json();
  console.log(`insertTodo!`)
  console.log(json);
  return json;
}

export async function updateTodo(title: string, done: boolean, order: number): Promise<Todo> {
  const res: Response = await fetch(API_URL, createRequest('PUT', { title, done, order }));
  const json: Promise<Todo> = await res.json();
  console.log(`updateTodo!`)
  console.log(json);
  return json;
}

export async function deleteTodo(id: string) { 
  const res: Response = await fetch(API_URL + `/${id}`, createRequest('DELETE'));
  const json: Promise<ResVal> = await res.json();
  console.log(`deleteTodo!`)
  console.log(json);
}

export async function reorderTodo(todoIds: string[]) {
  const res: Response = await fetch(API_URL, createRequest('PUT', { todoIds }));
  const json: Promise<ResVal> = await res.json();
  console.log(`reorderTodo!`)
  console.log(json);
}

export type Todo = {
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