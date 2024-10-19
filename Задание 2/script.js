// Функция, которая отображает имя из localStorage
function displayGreeting() {
  const name = localStorage.getItem('username'); // Получаем имя из localStorage
  if (name) {
      document.getElementById('greeting').textContent = `Привет, ${name}!`; // Отображаем имя
  }
}

// Слушатель события для кнопки
document.getElementById('saveButton').addEventListener('click', () => {
  const name = document.getElementById('nameInput').value; // Получаем значение из инпута
  localStorage.setItem('username', name); // Сохраняем имя в localStorage
  displayGreeting(); // Обновляем отображение
});

// Вызываем функцию при загрузке страницы
window.onload = displayGreeting;