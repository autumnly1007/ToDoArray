export const elementMain = () : string => {
  return `
  <img class="apple-pencil" src="/images/apple-pencil.png" alt="apple-pencil" />
    <div class="container">
      <div class="contents">
        <img src="/images/ipad.png" alt="ipad" />
        <main>
          <h1>[To, Do, Array]</h1>
          <div class="sub-content">
            <div class="todo-add">
              <input class="add-input" type="text" placeholder="할 일을 추가해 보세요!" />
              <button class="add-btn"><span class="material-symbols-outlined"> add </span></button>
            </div>
            <select class="type">
              <option value="">All</option>
              <option value="">Completed</option>
              <option value="">Incompleted</option>
            </select>
            <select class="order">
              <option value="">Custom Order</option>
              <option value="">Recent Order</option>
              <option value="">Old Order</option>
            </select>
            <button class="completed-delete-btn"><span class="material-symbols-outlined">check </span><span class="material-symbols-outlined">delete </span></button>
          </div>
          <div class="todos">
          </div>
        </main>
      </div>
    </div>
    <div class="post-it">
      <img src="/images/post-it.png" alt="post-it" />
      <p>Memo</p>
      <textarea class="memo-txa" placeholder="메모를 작성해 보세요!"></textarea>
    </div>
    <div class="toast"><p>추가가 완료되었습니다.</p></div>
    <div class="loading"></div>`;
};

export const elementTodo = (data: Todo): string => {
  return `
    <div class="todo-item" data-id="${data.id}">${data.order}
      <span class="order-handle">:::</span>
      <input class="todo-check" type="checkbox" ${data.done ? "checked" : ''}/>
      <input class="todo-input" type="text" value="${data.title}"/>
      <div class="date">
        <span class="insert-date">Add : ${data.createdAt.slice(0, 10).replace(/-/gi, ".")}</span>
        <span class="update-date">Update : ${data.updatedAt.slice(0, 10).replace(/-/gi, ".")}</span>
      </div>
      <button class="delete-btn"><span class="material-symbols-outlined"> delete </span></button>
    </div>`;
}

type Todo = {
  id: string // 할 일 ID
  order: number // 할 일 순서
  title: string // 할 일 제목
  done: boolean // 할 일 완료 여부
  createdAt: string // 할 일 생성일
  updatedAt: string // 할 일 수정일
}