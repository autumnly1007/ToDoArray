const API_URL: string = `https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos`;
const API_KEY: string = `FcKdtJs202209`;
const USER_NAME: string = `KDT3_AhnGaEul`;

const HEADER: HeadersInit = {
  'content-type': 'application/json',
  'apikey': API_KEY,
  'username': USER_NAME
};

function createRequest(type: string, todo?: string): RequestInit {
  if (todo) {
    return {
      method: type,
      headers: HEADER,
      body: JSON.stringify({ title: todo })
    };
  } else {
    return {
      method: type,
      headers: HEADER
    };
  }
}

export async function createTodo(todo: string): Promise<Todo> {
  const res: Response = await fetch(API_URL, createRequest('POST', todo));
  const json: Promise<Todo> = await res.json();
  console.log(json);
  return json;
}

export async function selectListTodo(): Promise<Todo[]> {
  const res: Response = await fetch(API_URL, createRequest('GET'));
  const json: Promise<Todo[]> = await res.json();
  console.log(json);
  return json;
}

type Todo = {
  id: string // 할 일 ID
  order: number // 할 일 순서
  title: string // 할 일 제목
  done: boolean // 할 일 완료 여부
  createdAt: string // 할 일 생성일
  updatedAt: string // 할 일 수정일
}

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