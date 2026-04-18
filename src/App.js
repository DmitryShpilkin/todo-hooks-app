import React, { useState, useCallback } from 'react';

// Импортируем дочерние компоненты и стили
import TodoList from './components/TodoList'; // Компонент для отображения списка задач
import AddTodoModal from './components/AddTodoModal'; // Компонент модального окна для добавления задачи
import './App.css'; // Глобальные стили приложения

/**
 * Главный компонент приложения (App).
 * Управляет состоянием (state) всего списка задач и модального окна.
 */
function App() {
  // --- СОСТОЯНИЕ (STATE) ---

  // Хук useState для хранения массива задач.
  // `todos` — текущий массив задач.
  // `setTodos` — функция для обновления этого массива.
  const [todos, setTodos] = useState([]);

  // Хук useState для управления видимостью модального окна.
  // `isModalOpen` — булево значение (true/false), показывающее, открыто ли окно.
  // `setIsModalOpen` — функция для изменения этого состояния.
  const [isModalOpen, setIsModalOpen] = useState(false);


  // --- ОПТИМИЗИРОВАННЫЕ ФУНКЦИИ ---

  /**
   * Функция для добавления новой задачи в список.
   * Обернута в useCallback, чтобы она не пересоздавалась при каждом рендере,
   * если не изменилась зависимость (setTodos). Это важно для предотвращения лишних
   * обновлений дочерних компонентов, которые могут использовать эту функцию как пропс.
   */
  const handleAddTodo = useCallback(
    (newTodo) => {
      // Используем функциональное обновление состояния.
      // Мы берем предыдущий массив задач (prevTodos), создаем его копию [...prevTodos]
      // и добавляем в конец новый объект задачи (newTodo).
      setTodos((prevTodos) => [...prevTodos, newTodo]);
    },
    [setTodos] // Функция будет создана заново только если изменится setTodos (что происходит редко)
  );

  /**
   * Функция для открытия модального окна.
   * Также обернута в useCallback с пустым массивом зависимостей [],
   * так как она не зависит от внешних переменных и не будет меняться.
   */
  const openModal = useCallback(() => setIsModalOpen(true), []);

  /**
   * Функция для закрытия модального окна.
   * Аналогично openModal, не имеет зависимостей и не будет пересоздаваться.
   */
  const closeModal = useCallback(() => setIsModalOpen(false), []);


  // --- JSX РАЗМЕТКА ---

  return (
    <div className="app">
      <h1>Список задач</h1>

      {/* Кнопка для вызова функции открытия модального окна */}
      <button className="add-todo-button" onClick={openModal}>
        Добавить задачу
      </button>

      {/* Передаем массив задач в компонент TodoList для отображения */}
      <TodoList todos={todos} />

      {/* Условный рендеринг:
          Если isModalOpen равно true, компонент AddTodoModal будет отрисован.
          В него передаются функции handleAddTodo и closeModal как пропсы. */}
      {isModalOpen && <AddTodoModal onAdd={handleAddTodo} onClose={closeModal} />}
    </div>
  );
}

export default App;