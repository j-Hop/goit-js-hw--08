import throttle from 'lodash.throttle';
// *
const inputFormUrl = document.querySelector('.feedback-form');
// ? // Додав селектори

const FORM_STORAGE_KEY = 'feedback-form-state';
let formData = {};
// ? // Створив ключ сховища та масив з параметрами

function addData (){
  try{
    const data =localStorage.getItem(FORM_STORAGE_KEY);
    if (!data) return;
    formData = JSON.parse(data);
    Object.entries(formData).forEach(([key, value]) => {
      inputFormUrl[key].value = value;
    });
  } catch(e){}
}

addData();

// ? // Після перевірки на наявність даних в сховищі - додаються значення в інпути

inputFormUrl.addEventListener('input', throttle(onFormInput, 500));

function onFormInput(event) {
  formData[event.target.name] = event.target.value.trim();
    localStorage.setItem(FORM_STORAGE_KEY, JSON.stringify(formData));
}
// ? // При інпутах працює функція що додає в масив параметрів поточні значенняя інпутів
// ? Після чого додає масив поточних значень методом JSON.stringify в локальне сховище 

inputFormUrl.addEventListener('submit', onFormSubmit);

function onFormSubmit(event) {
  event.preventDefault();
  console.log(formData);
  formData = {};
  localStorage.removeItem(FORM_STORAGE_KEY);
  event.target.reset()
}