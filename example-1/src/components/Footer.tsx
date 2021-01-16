import * as React from 'react';
import useAppState from '../hooks/useAppState';

export default function Footer() {
  const text = useAppState((state) => state.motd);
  return (
    <footer className="footer-component">
      Message of the day:
      <em>{text}</em>
    </footer>
  );
}
