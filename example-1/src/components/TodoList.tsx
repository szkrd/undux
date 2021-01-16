import * as React from 'react';
import useAppState from '../hooks/useAppState';
import todoService, { ITodoItem } from '../data/todoService';

export default function TodoList() {
  const [newItemText, setNewItemText] = React.useState('');
  const todoItems = useAppState<ITodoItem[]>((state) => state.todoItems);
  const onAddClick = () => {
    const text = newItemText.trim();
    if (!text) return;
    todoService.addTodoItem(text);
    setNewItemText('');
  };
  return (
    <main className="todo-list-component">
      <h2>Your todo list:</h2>
      <ul>
        {todoItems.map((todoItem) => (
          <li key={todoItem.id}>
            {todoItem.done ? (
              <span className="done">{todoItem.text}</span>
            ) : (
              <span>
                <span>{todoItem.text}</span>
                <button className="success" onClick={() => todoService.markAsDone(todoItem.id)}>
                  done
                </button>
              </span>
            )}
          </li>
        ))}
      </ul>
      <p>
        Number of items: <strong>{todoItems.length}</strong>
      </p>
      {/* controls */}
      <p>
        <label>
          Add new:{' '}
          <input
            type="text"
            value={newItemText}
            onChange={(event: any) => setNewItemText(event.target.value)}
          />
        </label>
        <button onClick={onAddClick}>create</button>
        or
        <button className="warning" onClick={todoService.clearAll}>
          clear all
        </button>
      </p>
    </main>
  );
}
