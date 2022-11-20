import '../style/style.scss';
import { elementMain, elementTodo } from './elementData';
import { createTodo, selectListTodo } from './request';
import { render } from './utils';

render(elementMain(), '.root');

// 데이터 목록 조회
selectListTodo().then((res) => {
  res.forEach((item) => {
    render(elementTodo(item), '.todos');
  })
});;

// 투두 추가 버튼 클릭 이벤트
document.querySelector('.add-btn').addEventListener('click', () => {
  // 데이터 추가
    const todo: string = (<HTMLInputElement>document.querySelector('.add-input')).value;
    createTodo(todo);

    // 데이터 목록 조회
    selectListTodo().then((res) => {
      res.forEach((item) => {
        render(elementTodo(item), '.todos');
      })
    });;
});

// 투두 추가 input 엔터키 이벤트
document.querySelector('.add-input').addEventListener('keyup', (event: KeyboardEvent) => {
  if (event.keyCode === 13) {
    // 데이터 추가
    const todo: string = (<HTMLInputElement>document.querySelector('.add-input')).value;
    createTodo(todo);

    // 데이터 목록 조회
    selectListTodo().then((res) => {
      res.forEach((item) => {
        render(elementTodo(item), '.todos');
      })
    });;
  } 
});

// 삭제 버튼 클릭 이벤트
document.querySelector('.delete-btn').addEventListener('click', () => {
  // 데이터 삭제
  // 데이터 목록 조회
});

// 투두 input 포커스 아웃 시 할 일 수정
document.querySelectorAll('.todo-input').forEach((item: Element) => {
  item.addEventListener('focusout', () => {
    // 데이터 수정
    // 데이터 목록 조회
  });
});

// 체크 삭제 버튼 클릭 이벤트
document.querySelector('.checked-delete-btn').addEventListener('click', () => {
  // 체크된 데이터 삭제
  // 데이터 목록 조회
});