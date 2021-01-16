import * as React from 'react';
import useAppState from '../hooks/useAppState';

export default function TodoListView() {
  const items = useAppState((state) => state.todoItems.filter((item) => !item.done));
  return (
    <div className="todo-list-view-component">
      <ul>
        {items.map((item) => (
          <li key={item.id}>{item.text}</li>
        ))}
      </ul>
    </div>
  );
}
