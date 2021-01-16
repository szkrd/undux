import * as React from 'react';
import useAppState from '../hooks/useAppState';

export default function Header() {
  const { name, email } = useAppState((state) => state.user);
  return (
    <header className="header-component">
      <h1>Very TODO, such app!</h1>
      <aside>
        {name} ({email})
      </aside>
    </header>
  );
}
