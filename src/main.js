import '../style/style.scss';
import { curOrder, fnReorderTodo, renderTodoList } from './renderTodo';
import { deleteListTodo, insertTodo } from './requests';
import { showElement, hideElement, showToast, setElementValue, getElementValue } from './setElements';

document.querySelector('.add-input').focus();
if (localStorage.getItem('memo')) {
  setElementValue('.memo-txa', localStorage.getItem('memo'));
}

// TODO 목록 조회
showElement('.loading');
setTimeout(async () => {
  renderTodoList();
  hideElement('.loading');
}, 1000);

// TODO 추가 버튼 클릭 이벤트
document.querySelector('.add-btn').addEventListener('click', async () => {
  const title = getElementValue('.add-input').trim();
  if (title.length === 0) {
    alert('할 일을 입력해 주세요.');
    return;
  }
  showElement('.loading');
  await insertTodo(title, curOrder);
  renderTodoList();
  hideElement('.loading');
  setElementValue('.add-input');
  showToast('추가가 완료되었습니다.');
});

// TODO 추가 input 엔터키 이벤트
document.querySelector('.add-input').addEventListener('keydown', (event) => {
  if (event.key === 'Enter' && !event.isComposing) {
    document.querySelector('.add-btn').click();
  }
});

// 체크된 TODO 삭제 버튼 클릭 이벤트
document.querySelector('.checked-delete-btn').addEventListener('click', async (event) => {
  if (!confirm('완료된 할 일을 모두 삭제하시겠어요?')) return;
  let checkeds = document.querySelectorAll('.todo-done:checked');
  checkeds = Array.from(checkeds).map((item) => item.parentElement.dataset.id);

  if (checkeds.length === 0) {
    alert('완료된 할 일이 없습니다.');
    return;
  }
  checkeds.forEach((item) => {
    document.querySelector('.todos').removeChild(document.querySelector(`[data-id="${item}"]`));
  });
  showElement('.loading');
  await deleteListTodo(checkeds);
  await fnReorderTodo();
  renderTodoList();
  hideElement('.loading');
  showToast('삭제가 완료되었습니다.');
});

// 보기 selectBox 변경 이벤트
document.querySelector('.type').addEventListener('change', () => {
  showElement('.loading');
  renderTodoList(getElementValue('.type'), getElementValue('.order'));
  hideElement('.loading');
});

// 정렬 selectBox 변경 이벤트
document.querySelector('.order').addEventListener('change', () => {
  showElement('.loading');
  renderTodoList(getElementValue('.type'), getElementValue('.order'));
  hideElement('.loading');
});

// MEMO 변경 이벤트
document.querySelector('.memo-txa').addEventListener('change', () => {
  showElement('.loading');
  localStorage.setItem('memo', getElementValue('.memo-txa'));
  hideElement('.loading');
  showToast('메모가 저장되었습니다.');
});
