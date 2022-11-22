export const setElemenHtml = (target, text = '') => {
  document.querySelector(target).innerHTML = text;
};

export const setElemenValue = (target, value = '') => {
  document.querySelector(target).value = value;
};

export const showElement = (target) => {
  document.querySelector(target).classList.add('active');
};

export const hideElement = (target) => {
  document.querySelector(target).classList.remove('active');
};

export const formatDate = (target) => {
  return target.slice(0, 10).replace(/-/gi, '.');
};

// 토스트 메시지 출력
export function showToast(text = '에러가 발생하였습니다.') {
  setElemenHtml('.toast', text);
  showElement('.toast');
  document.querySelector('.toast').addEventListener(
    'animationend',
    () => {
      hideElement('.toast');
    },
    false
  );
}
