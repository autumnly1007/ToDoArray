export const render = (html: string, target: string, callback?: Function) => {
  document.querySelector(target).innerHTML += html;
  if (callback) callback();
};

export const setElemenHtml = (target: string, text: string = '') => {
  document.querySelector(target).innerHTML = text;
};

export const showElement = (target: string) => {
  document.querySelector(target).classList.add('active');
};

export const hideElement = (target: string) => {
  document.querySelector(target).classList.remove('active');
};

export const formatDate = (target: string): string => {
  return target.slice(0, 10).replace(/-/gi, ".");
};