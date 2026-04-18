import React, { useRef } from 'react';

/**
 * Компонент модального окна для добавления новой задачи.
 * @param {function} onAdd - Коллбэк, вызываемый при добавлении задачи. Передаёт объект новой задачи.
 * @param {function} onClose - Коллбэк, вызываемый для закрытия модального окна.
 */
const AddTodoModal = ({ onAdd, onClose }) => {

    // useRef создаёт ссылку на DOM-элемент (инпут).
    // Это позволяет напрямую получить значение поля ввода без использования состояния (useState).
    const inputRef = useRef();

    /**
     * Обработчик нажатия кнопки "Добавить".
     * Получает текст из инпута, проверяет его и вызывает коллбэк onAdd.
     */
    const handleAdd = () => {
        // Получаем текущее значение из поля ввода и убираем лишние пробелы по краям.
        const title = inputRef.current.value.trim();

        // Проверяем, что поле не пустое.
        if (title) {
            // Вызываем функцию onAdd, передавая новый объект задачи.
            // completed: false означает, что задача по умолчанию не выполнена.
            onAdd({ title, completed: false });

            // Закрываем модальное окно после успешного добавления.
            onClose();
        }
    };

    return (
        <div className="modal">
            <div className="modal-content">
                {/* Заголовок окна */}
                <h3>Добавить задачу</h3>
                {/* Поле ввода. ref связывает инпут с переменной inputRef */}
                <input ref={inputRef} type="text" placeholder="Название задачи" />
                {/* Блок с кнопками действий */}
                <div className="modal-actions">
                    {/* Кнопка "Отмена" просто закрывает окно */}
                    <button onClick={onClose}>Отмена</button>
                    {/* Кнопка "Добавить" запускает логику создания задачи */}
                    <button onClick={handleAdd}>Добавить</button>
                </div>
            </div>
        </div>
    );
};

export default AddTodoModal;