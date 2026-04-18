import React, { useMemo } from 'react';

/**
 * Компонент TodoList отображает список задач.
 * @param {Object[]} todos - Массив объектов задач. Каждый объект должен содержать:
 *   - title: название задачи (строка)
 *   - completed: статус выполнения (булево значение)
 */
const TodoList = ({ todos }) => {
/**
   * useMemo используется для оптимизации рендеринга.
   * Пересоздаёт массив отрендеренных задач только если изменился массив `todos`.
   * Это предотвращает ненужный пересчёт при обновлении родительского компонента.
   */
const renderedTodos = useMemo(() => {
    // Проходим по массиву задач и создаём JSX-элементы для каждой
    return todos.map((todo, index) => (
    <div
        key={index} // Ключ для React, используется индекс (в реальных проектах лучше уникальный id)
        className={`todo-item ${todo.completed ? 'completed' : ''}`}
        // Добавляется класс 'completed', если задача выполнена
    >
        <span>{todo.title}</span> {/* Отображаем название задачи */}
    </div>
    ));
  }, [todos]); // Зависимость: эффект пересчитается только при изменении `todos`

  // Возвращаем контейнер со списком задач
return <div className="todo-list">{renderedTodos}</div>;
};

export default TodoList;