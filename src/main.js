import '../style/style.scss';
import { renderTodoList } from './renderTodo';
import { insertTodo } from './requests';
import { showElement, hideElement, showToast, setElemenValue } from './setElements';

// TODO 목록 조회
showElement('.loading');
setTimeout(() => {
  renderTodoList();
  hideElement('.loading');
}, 1000);

// TODO 추가 버튼 클릭 이벤트
document.querySelector('.add-btn').addEventListener('click', (event) => {
  const title = document.querySelector('.add-input').value.trim();
  if (title.length === 0) {
    alert('할 일을 입력해 주세요.');
    return;
  }
  showElement('.loading');
  const order = 0;
  insertTodo(title, order).then((res) => {
    if (res) {
      renderTodoList();
      hideElement('.loading');
      setElemenValue('.add-input');
      showToast('추가가 완료되었습니다.');
    } else {
      hideElement('.loading');
      showToast();
    }
  });
});

// TODO 추가 input 엔터키 이벤트
document.querySelector('.add-input').addEventListener('keydown', (event) => {
  if (event.key === 'Enter' && !event.isComposing) {
    document.querySelector('.add-btn').click();
  }
});

// 체크된 TODO 삭제 버튼 클릭 이벤트
document.querySelector('.checked-delete-btn').addEventListener('click', () => {
  if (!confirm('완료된 할 일을 모두 삭제하시겠어요?')) return;
  // 체크된 데이터 삭제
  // TODO 목록 조회
  renderTodoList();
});
