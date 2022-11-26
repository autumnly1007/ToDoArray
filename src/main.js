import '../style/style.scss';
import { renderTodoList } from './renderTodo';
import { deleteListTodo, insertTodo } from './requests';
import { showElement, hideElement, showToast, setElemenValue } from './setElements';

document.querySelector('.add-input').focus();
if (localStorage.getItem('memo')) {
  console.log(localStorage.getItem('memo'));
  document.querySelector('.memo-txa').value = localStorage.getItem('memo');
}

// TODO 목록 조회
showElement('.loading');
setTimeout(async () => {
  await renderTodoList();
  hideElement('.loading');
}, 1000);

// TODO 추가 버튼 클릭 이벤트
document.querySelector('.add-btn').addEventListener('click', async () => {
  const title = document.querySelector('.add-input').value.trim();
  if (title.length === 0) {
    alert('할 일을 입력해 주세요.');
    return;
  }
  showElement('.loading');
  const order = 0;
  const res = await insertTodo(title, order);
  if (!res) {
    hideElement('.loading');
    showToast();
    return;
  }
  await renderTodoList();
  hideElement('.loading');
  setElemenValue('.add-input');
  showToast('추가가 완료되었습니다.');
});

// TODO 추가 input 엔터키 이벤트
document.querySelector('.add-input').addEventListener('keydown', (event) => {
  if (event.key === 'Enter' && !event.isComposing) {
    document.querySelector('.add-btn').click();
  }
});

// 체크된 TODO 삭제 버튼 클릭 이벤트
document.querySelector('.checked-delete-btn').addEventListener('click', async () => {
  if (!confirm('완료된 할 일을 모두 삭제하시겠어요?')) return;
  let checkeds = document.querySelectorAll('.todo-done:checked');
  checkeds = Array.from(checkeds).map((item) => item.parentElement.dataset.id);

  showElement('.loading');
  const res = await deleteListTodo(checkeds);
  if (!res) {
    hideElement('.loading');
    showToast();
    return;
  }
  await renderTodoList();
  hideElement('.loading');
  showToast('삭제가 완료되었습니다.');
});

document.querySelector('.memo-txa').addEventListener('change', () => {
  showElement('.loading');
  localStorage.setItem('memo', document.querySelector('.memo-txa').value);
  hideElement('.loading');
  showToast('메모가 저장되었습니다.');
});
