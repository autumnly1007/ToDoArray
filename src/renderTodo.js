import { deleteTodo, selectListTodo, updateTodo } from './requests';
import { formatDate, hideElement, setElemenHtml, showElement, showToast } from './setElements';

const renderTodo = (data) => {
  const todoItemEl = document.createElement('div');
  todoItemEl.className = 'todo-item';
  todoItemEl.dataset.id = data.id;
  todoItemEl.dataset.order = data.order;

  const orderHandleEl = document.createElement('span');
  orderHandleEl.className = 'order-handle';
  orderHandleEl.innerHTML = ':::';

  const checkboxEl = document.createElement('input');
  checkboxEl.className = 'todo-done';
  checkboxEl.type = 'checkbox';
  if (data.done) checkboxEl.checked = true;

  const inputEl = document.createElement('input');
  inputEl.className = 'todo-input';
  inputEl.type = 'text';
  inputEl.value = data.title;

  const dateEl = document.createElement('div');
  dateEl.className = 'date';
  const insertDateEl = document.createElement('span');
  insertDateEl.className = 'insert-date';
  insertDateEl.innerHTML = `Update : ${formatDate(data.createdAt)}`;
  const updateDateEl = document.createElement('span');
  updateDateEl.className = 'update-date';
  updateDateEl.innerHTML = `Add : ${formatDate(data.updatedAt)}`;
  dateEl.append(insertDateEl, updateDateEl);

  const deleteBtnEl = document.createElement('button');
  deleteBtnEl.className = 'delete-btn';
  const deleteIconEl = document.createElement('span');
  deleteIconEl.className = 'material-symbols-outlined';
  deleteIconEl.innerHTML = 'delete';
  deleteBtnEl.append(deleteIconEl);

  // TODO 완료 여부 수정
  checkboxEl.addEventListener('change', () => {
    const id = data.id;
    const title = inputEl.value;
    const done = checkboxEl.checked;
    const order = todoItemEl.dataset.order;
    fnUpdateTodo({ id, title, done, order });
  });

  // TODO 수정
  inputEl.addEventListener('change', () => {
    const id = data.id;
    const title = inputEl.value;
    const done = checkboxEl.checked;
    const order = todoItemEl.dataset.order;
    fnUpdateTodo({ id, title, done, order });
  });

  // TODO 삭제
  deleteBtnEl.addEventListener('click', () => fnDeleteTodo(data.id));

  // TODO 순서 변경

  todoItemEl.append(orderHandleEl, checkboxEl, inputEl, dateEl, deleteBtnEl);
  document.querySelector('.todos').append(todoItemEl);
};

// TODO 목록 렌더링
export function renderTodoList() {
  return new Promise(async (resolve, reject) => {
    const res = await selectListTodo();
    if (!res) {
      hideElement('.loading');
      showToast();
      reject(false);
    }
    setElemenHtml('.todos');
    res.forEach((item) => renderTodo(item));
    resolve(true);
  });
}

async function fnUpdateTodo(obj) {
  showElement('.loading');
  const res = await updateTodo(obj);
  if (!res) {
    hideElement('.loading');
    showToast();
    return;
  }
  renderTodoList();
  hideElement('.loading');
  showToast('수정이 완료되었습니다.');
}

async function fnDeleteTodo(id) {
  showElement('.loading');
  const res = await deleteTodo(data.id);
  if (!res) {
    hideElement('.loading');
    showToast();
    return;
  }
  renderTodoList();
  hideElement('.loading');
  showToast('삭제가 완료되었습니다.');
}
