'use strict';

// section-1 ===============================
const menuEl = document.querySelector('.menu');
const menuTextEl = document.querySelector('.menu p');
const socialListEl = document.querySelector('.social-list');
const liEls = document.querySelectorAll('.social-list li');

menuEl.addEventListener('click', () => {
  socialListEl.classList.toggle('hide');
  menuEl.classList.toggle('rotate');
});

liEls.forEach(li => {
  li.addEventListener('click', () => {
    menuTextEl.innerHTML = li.innerHTML;
    socialListEl.classList.add('hide');
    menuEl.classList.toggle('rotate');
  });
});

// section-2 ===============================
const formEl = document.querySelector('.form');
const inputEl = document.querySelector('.input');
const listEl = document.querySelector('.list');

const toDoList = function (task) {
  let newTask = inputEl.value;
  if (task) {
    newTask = task.name;
  }
  const liEl = document.createElement('li');
  if (task && task.checked) {
    liEl.classList.add('checked');
  }
  const liPEl = document.createElement('p');
  liPEl.innerText = newTask;
  liEl.appendChild(liPEl);
  listEl.appendChild(liEl);

  inputEl.value = '';

  const checkBtnEl = document.createElement('div');
  checkBtnEl.innerHTML = `<i class="fas fa-check-square"></i>`;
  const trashBtnEl = document.createElement('div');
  trashBtnEl.innerHTML = `<i class="fas fa-trash"></i>`;

  liEl.appendChild(checkBtnEl);
  liEl.appendChild(trashBtnEl);

  const deleteIt = document.createElement('div');
  const btnDeleteYes = document.createElement('button');
  const btnDeleteNo = document.createElement('button');

  btnDeleteNo.classList.add('btn-delete-no');
  btnDeleteNo.innerText = 'NO';

  btnDeleteYes.classList.add('btn-delete-yes');
  btnDeleteYes.innerText = 'YES';

  deleteIt.innerText = 'DELETE ?';
  deleteIt.classList.add('delete-it');

  checkBtnEl.addEventListener('click', () => {
    liEl.classList.toggle('checked');
    upadateLocalStorage();
  });
  trashBtnEl.addEventListener('click', () => {
    liEl.appendChild(deleteIt);
    deleteIt.append(btnDeleteYes);
    deleteIt.append(btnDeleteNo);

    liEl.classList.add('size-of-screen');
    deleteIt.classList.add('size-of-screen');
    btnDeleteYes.addEventListener('click', () => {
      liEl.remove();
      upadateLocalStorage();
    });
    btnDeleteNo.addEventListener('click', () => {
      deleteIt.remove();
    });
  });
  upadateLocalStorage();
};

formEl.addEventListener('submit', event => {
  event.preventDefault();
  toDoList();
});

// SAVE IN LOCALSTORAGE =======
const upadateLocalStorage = function () {
  const liElsSection2 = document.querySelectorAll('.list li');
  let list = [];
  liElsSection2.forEach(liEl => {
    list.push({
      name: liEl.innerText,
      checked: liEl.classList.contains('checked'),
    });
  });
  localStorage.setItem('list', JSON.stringify(list));
};

let list = JSON.parse(localStorage.getItem('list'));
list.forEach(task => {
  toDoList(task);
});
// end of SAVE IN LOCALSTORAGE ======

// SECTION - 3 ========================
const btnGeneratePassword = document.querySelector('.generate-password-btn');
const inputPassword = document.getElementById('input-password');
const copyIconEl = document.querySelector('.fa-copy');
const alertContainerEl = document.querySelector('.alert-container');
const createPassword = function () {
  const chars =
    '0123456789abcdefghijklmnopqrstuvwxtz!@#$%^&*()_+?:{}[]ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const passwordLength = 16;
  let password = '';
  for (let index = 0; index < passwordLength; index++) {
    const randomNum = Math.floor(Math.random() * chars.length);
    password += chars.substring(randomNum, randomNum + 1);
  }
  inputPassword.value = password;
  return password;
};
btnGeneratePassword.addEventListener('click', () => {
  createPassword();
});

const copyPassword = function () {
  // inputPassword.select(); // the value that is in inputPassword will be selected(for desktop)
  inputPassword.setSelectionRange(0, 9999); // select for mobile
  navigator.clipboard.writeText(inputPassword.value);

  alertContainerEl.innerText = inputPassword.value + ' Copied!';
};

copyIconEl.addEventListener('click', () => {
  if (inputPassword.value === '') return;
  copyPassword();
  alertContainerEl.classList.remove('active');

  setTimeout(() => {
    alertContainerEl.classList.add('active');
  }, 2000);
});
