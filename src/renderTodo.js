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
    showElement('.loading');
    updateTodo(data.id, inputEl.value, checkboxEl.checked, todoItemEl.dataset.order).then((res) => {
      if (res) {
        // 데이터 목록 조회
        renderTodoList();
        hideElement('.loading');
        showToast('수정이 완료되었습니다.');
      } else {
        hideElement('.loading');
        showToast();
      }
    });
  });

  // TODO 수정
  inputEl.addEventListener('change', () => {
    showElement('.loading');
    updateTodo(data.id, inputEl.value, checkboxEl.checked, todoItemEl.dataset.order).then((res) => {
      if (res) {
        // 데이터 목록 조회
        renderTodoList();
        hideElement('.loading');
        showToast('수정이 완료되었습니다.');
      } else {
        hideElement('.loading');
        showToast();
      }
    });
  });

  // TODO 삭제
  deleteBtnEl.addEventListener('click', () => {
    showElement('.loading');
    deleteTodo(data.id).then((res) => {
      if (res) {
        renderTodoList();
        hideElement('.loading');
        showToast('삭제가 완료되었습니다.');
      } else {
        hideElement('.loading');
        showToast();
      }
    });
  });

  // TODO 순서 변경

  todoItemEl.append(orderHandleEl, checkboxEl, inputEl, dateEl, deleteBtnEl);
  document.querySelector('.todos').append(todoItemEl);
};

// TODO 목록 렌더링
export function renderTodoList() {
  selectListTodo().then((res) => {
    if (!res) {
      hideElement('.loading');
      showToast();
      return false;
    }
    setElemenHtml('.todos');
    res.forEach((item) => renderTodo(item));
    return true;
  });
}
