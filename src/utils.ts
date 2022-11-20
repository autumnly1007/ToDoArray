export const render = (html: string, target: string) => {
  showElement('.loading');
  document.querySelector(target).innerHTML += html;
  hideElement('.loading');
};

export const showElement = (target: string) => {
  if(document.querySelector(target)) document.querySelector(target).classList.add('active');
};

export const hideElement = (target: string) => {
  if(document.querySelector(target)) document.querySelector(target).classList.remove('active');
};