import '../style/style.scss';
import { elementMain, elementTodo } from './elements';
import { deleteTodo, insertTodo, selectListTodo } from './requests';
import { render, showElement, hideElement, setElemenHtml } from './utils';

// Main 렌더링
render(elementMain(), '.root', addEventAdd);

showElement('.loading');
setTimeout(() => {
  // 데이터 목록 조회
  renderTodoList();
  hideElement('.loading');
}, 1000);

function addEventAdd() {
  // 투두 추가 버튼 클릭 이벤트
  document.querySelector('.add-btn').addEventListener('click', () => {
    showElement('.loading');
    insertTodo((<HTMLInputElement>document.querySelector('.add-input')).value).then(() => {
      renderTodoList();
      hideElement('.loading');
      toggleToast('추가가 완료되었습니다.');
    });
  });

  // 투두 추가 input 엔터키 이벤트
  document.querySelector('.add-input').addEventListener('keyup', (event: KeyboardEvent) => {
    if (event.keyCode === 13) (<HTMLInputElement>document.querySelector('.add-btn')).click();
  });
}

function addEventTodo() {
  // 투두 순서 수정

  // 투두 checkbox 체크 시 할 일 수정

  // 투두 input 포커스 아웃 시 할 일 수정
  document.querySelectorAll('.todo-input').forEach((item: Element) => {
    item.addEventListener('focusout', () => {
      showElement('.loading');
      console.log('투두 input 포커스 아웃 시 할 일 수정')
      // 데이터 수정
      // 데이터 목록 조회
      renderTodoList();
      hideElement('.loading');
      toggleToast('수정이 완료되었습니다.');
    });
  });

  // 체크 삭제 버튼 클릭 이벤트
  document.querySelector('.checked-delete-btn').addEventListener('click', () => {
    console.log('체크 삭제 버튼 클릭 이벤트');
    // 체크된 데이터 삭제
    // 데이터 목록 조회
    renderTodoList();
  });

  // 삭제 버튼 클릭 이벤트
  document.querySelectorAll('.delete-btn').forEach((item: Element) => {
    const dataId = item.parentElement.getAttribute('data-id');
    item.addEventListener('click', () => {
      showElement('.loading');
      deleteTodo(dataId).then(() => {
        renderTodoList();
        hideElement('.loading');
        toggleToast('삭제가 완료되었습니다.');
      });
    });
  });
}

function renderTodoList() {
  selectListTodo().then((res) => {
    setElemenHtml('.todos');
    res.forEach((item) => {
      render(elementTodo(item), '.todos', addEventTodo);
    })
  });
}

function toggleToast(text: string) {
  setElemenHtml('.toast', text);
  showElement('.toast');
  document.querySelector('.toast').addEventListener('animationend', () => {
    hideElement('.toast');
  }, false);
}