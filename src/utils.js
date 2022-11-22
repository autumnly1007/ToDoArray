export const render = (html, target, callback) => {
  document.querySelector(target).innerHTML += html;
  if (callback) callback();
};

export const setElemenHtml = (target, text = '') => {
  document.querySelector(target).innerHTML = text;
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
