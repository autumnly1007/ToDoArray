export const setElementHtml = (target, text = '') => {
  document.querySelector(target).innerHTML = text;
};

export const setElementValue = (target, value = '') => {
  document.querySelector(target).value = value;
};

export const getElementValue = (target) => {
  return document.querySelector(target).value;
};

export const showElement = (target) => {
  document.querySelector(target).classList.add('active');
};

export const hideElement = (target) => {
  document.querySelector(target).classList.remove('active');
};

export const formatDate = (target) => {
  const date = new Date(target);
  const year = String(date.getFullYear()).padStart(2, 0);
  const month = String(date.getMonth()).padStart(2, 0);
  const today = String(date.getDay()).padStart(2, 0);
  const hour = String(date.getHours()).padStart(2, 0);
  const min = String(date.getMinutes()).padStart(2, 0);
  return `${year}.${month}.${today} | ${hour}:${min}`;
};

// 토스트 메시지 출력
export function showToast(text = '에러가 발생하였습니다.') {
  setElementHtml('.toast', text);
  showElement('.toast');
  document.querySelector('.toast').addEventListener(
    'animationend',
    () => {
      hideElement('.toast');
    },
    false
  );
}
