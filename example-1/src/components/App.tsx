import * as React from 'react';
import Header from './Header';
import TodoList from './TodoList';
import Footer from './Footer';

export default function App() {
  return (
    <div className="app-component">
      <Header />
      <TodoList />
      <Footer />
    </div>
  );
}
