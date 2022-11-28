import { deleteTodo, reorderTodo, selectListTodo, updateTodo } from './requests';
import { formatDate, hideElement, setElementHtml, showElement, showToast } from './setElements';
import Sortable from 'sortablejs';

export let curOrder = 0;
let sortFlag = true;

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
  insertDateEl.innerHTML = `Add : ${formatDate(data.createdAt)}`;
  const updateDateEl = document.createElement('span');
  updateDateEl.className = 'update-date';
  updateDateEl.innerHTML = `Update : ${formatDate(data.updatedAt)}`;
  dateEl.append(insertDateEl, updateDateEl);

  const deleteBtnEl = document.createElement('button');
  deleteBtnEl.className = 'delete-btn';
  const deleteIconEl = document.createElement('span');
  deleteIconEl.className = 'material-symbols-outlined';
  deleteIconEl.innerHTML = 'delete';
  deleteBtnEl.append(deleteIconEl);

  // TODO 완료 여부 수정 이벤트
  checkboxEl.addEventListener('change', () => {
    const id = data.id;
    const title = inputEl.value;
    const done = checkboxEl.checked;
    const order = todoItemEl.dataset.order;
    fnUpdateTodo({ id, title, done, order });
  });

  // TODO 수정 이벤트
  inputEl.addEventListener('change', () => {
    const id = data.id;
    const title = inputEl.value;
    const done = checkboxEl.checked;
    const order = todoItemEl.dataset.order;
    fnUpdateTodo({ id, title, done, order });
  });

  // TODO 삭제 이벤트
  deleteBtnEl.addEventListener('click', (event) => {
    document.querySelector('.todos').removeChild(event.target.closest('.todo-item'));
    fnDeleteTodo(data.id);
  });

  todoItemEl.append(orderHandleEl, checkboxEl, inputEl, dateEl, deleteBtnEl);
  document.querySelector('.todos').append(todoItemEl);
};

// TODO 목록 렌더링
export async function renderTodoList(done, order) {
  let res = Array.from(await selectListTodo()).reverse();

  if (order === 'recent') res.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  else if (order === 'old') res.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

  if (done === 'true') res = res.filter((item) => item.done === true);
  else if (done === 'false') res = res.filter((item) => item.done === false);

  curOrder = res.length;
  setElementHtml('.todo-length', curOrder);
  setElementHtml('.todos');
  if (res.length === 0) showToast('등록된 할 일이 없습니다.');
  else res.forEach((item) => renderTodo(item));
}

// TODO 수정
async function fnUpdateTodo(obj) {
  showElement('.loading');
  await updateTodo(obj);
  renderTodoList();
  hideElement('.loading');
  showToast('수정이 완료되었습니다.');
}

// TODO 삭제
async function fnDeleteTodo(id) {
  showElement('.loading');
  await deleteTodo(id);
  await fnReorderTodo();
  renderTodoList();
  hideElement('.loading');
  showToast('삭제가 완료되었습니다.');
}

// Drag & Drop 순서 변경
const sortable = Sortable.create(document.querySelector('.todos'), {
  group: 'todos',
  animation: 100,
  handle: '.order-handle',
  onStart: function (event) {
    if (document.querySelector('.type').value !== '') {
      sortFlag = false;
      alert('모두 보기 시 정렬이 가능합니다.');
    } else if (document.querySelector('.order').value !== '') {
      sortFlag = false;
      alert('커스텀 순 보기 시 정렬이 가능합니다');
    } else sortFlag = true;
  },
  onEnd: async function () {
    if (sortFlag) {
      showElement('.loading');
      await fnReorderTodo();
      renderTodoList();
      hideElement('.loading');
      showToast('순서 변경이 완료되었습니다.');
    }
  },
});

// 순서 재정렬
export async function fnReorderTodo() {
  const ids = [];
  document.querySelectorAll('.todo-item').forEach((item) => ids.unshift(item.dataset.id));
  await reorderTodo(ids);
}
