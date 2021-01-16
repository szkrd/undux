import * as React from 'react';
import Header from './Header';
import TodoListEdit from './TodoListEdit';
import TodoListView from './TodoListView';
import Footer from './Footer';
import useAppState from '../hooks/useAppState';
import { writeState } from '../data/state';

// if you want to avoid **costly** rerenders, then (just like with redux's hooks)
// you have to use React.memo (or a hoc approach, like redux's `connect(mapStateToProps, mapDispatchToProps)`)
// (of course this will do a shallowEqual check on its props, so it _may_ be slower that way)
const HeaderMemo = React.memo(Header);

export default function App() {
  const isEditMode = useAppState((state) => state.ui.editMode);

  // writing directly, without a service method:
  const setEditMode = (flag: boolean) => () => writeState((state) => (state.ui.editMode = flag));

  return (
    <div className="app-component">
      <HeaderMemo />
      <div className="toggle">
        {isEditMode ? (
          <a onClick={setEditMode(false)}>view</a>
        ) : (
          <a onClick={setEditMode(true)}>edit</a>
        )}
      </div>
      {isEditMode ? <TodoListEdit /> : <TodoListView />}
      <Footer />
    </div>
  );
}
