document.addEventListener('DOMContentLoaded', () => {
  loadTasks();
});

const tasksList = document.querySelector('#tasksList');

function loadTasks() {
  const name = JSON.parse(localStorage.getItem('name')) || [];
  const check = JSON.parse(localStorage.getItem('check')) || [];
  const taskList = document.getElementById('taskList');

  name.forEach((task, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <span>${task}</span>
      <div>
      <input type="checkbox" class="check" ${check[index] ? 'checked' : ''}>
      <button onclick="editTask(this)">Редактировать</button>
      <button onclick="deleteTask(this)">Удалить</button>
      </div>
    `;
    taskList.appendChild(li);
  });

  // Добавляем событие для каждого чекбокса
  document.querySelectorAll('.check').forEach((checkbox, index) => {
    checkbox.addEventListener('change', () => {
      saveChecks(); // Сохраняем состояние чекбоксов при изменении
    });
  });
}

function addTask() {
  const taskInput = document.getElementById('taskInput');
  const taskText = taskInput.value.trim();
  showAllTask();
  if (taskText === '') return;

  const taskList = document.getElementById('taskList');
  const li = document.createElement('li');
  li.innerHTML = `
    <span>${taskText}</span>
    <div>
    <input type="checkbox" class="check">
    <button onclick="editTask(this)">Редактировать</button>
    <button onclick="deleteTask(this)">Удалить</button>
    </div>
  `;
  taskList.appendChild(li);
  saveTasks();
  saveChecks();

  // Добавляем событие на новый чекбокс
  li.querySelector('.check').addEventListener('change', () => {
    saveChecks();
  });

  taskInput.value = "";
}

function saveTasks() {
  const taskList = document.getElementById('taskList');
  const name = Array.from(taskList.children).map(li => li.querySelector('span').textContent);
  localStorage.setItem('name', JSON.stringify(name));
}

function deleteTask(button) {
  const li = button.parentElement.parentElement;
  li.remove();
  saveTasks();
  saveChecks();
}

function editTask(button) {
  const li = button.parentElement.parentElement;
  const taskText = li.querySelector('span').textContent;
  const newTaskText = prompt("Редактировать задачу", taskText);

  if (newTaskText !== null && newTaskText.trim() !== "") {
    li.querySelector('span').textContent = newTaskText.trim();
    saveTasks();
    saveChecks();
  }
}

function saveChecks() {
  const taskList = document.getElementById('taskList');
  const check = Array.from(taskList.children).map(li => li.querySelector("input").checked);
  localStorage.setItem('check', JSON.stringify(check));
}

function showCompleted(){
  const check = JSON.parse(localStorage.getItem('check')) || [];
  const li = document.getElementsByTagName("li");
  showAllTask();

    for (let i = 0; i < check.length; i++) {
      if(check[i] !== true)
      {
        li[i].style.display = 'none'
      }    
      
}}

function showInProgress(){
  const check = JSON.parse(localStorage.getItem('check')) || [];
  const li = document.getElementsByTagName("li");
  showAllTask();

    for (let i = 0; i < check.length; i++) {
      if(check[i] === true)
      {
        li[i].style.display = 'none'
      }   
}}

function showAllTask(){
  const li = document.getElementsByTagName("li");
  const name = JSON.parse(localStorage.getItem('name')) || [];

  for (let i = 0; i < name.length; i++) {
      li[i].style.display = 'flex'
    }   
  }