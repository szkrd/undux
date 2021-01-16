import { readState, writeState } from './state';

export interface ITodoItem {
  id: number;
  createdAt: number;
  text: string;
  done: boolean;
}

class TodoService {
  private uid = 0;
  private lsKey = 'TODO_EXAMPLE_TODO_ITEMS';

  addTodoItem = (text: string) => {
    writeState((state) => {
      state.todoItems = [
        ...state.todoItems,
        { id: ++this.uid, createdAt: Date.now(), text, done: false },
      ];
      this.saveToStorage();
    });
  };

  markAsDone = (id: number) => {
    writeState((state) => {
      state.todoItems = state.todoItems.map((item) => ({
        ...item,
        done: item.id === id ? true : item.done,
      }));
      this.saveToStorage();
    });
  };

  loadFromStorage = (): ITodoItem[] => {
    try {
      const items: ITodoItem[] = JSON.parse(localStorage.getItem(this.lsKey) || 'null') || [];
      this.uid = Math.max.apply(
        null,
        items.map((item) => item.id)
      );
      return items;
    } catch (err) {
      console.error(err);
      return [];
    }
  };

  clearAll = () => {
    writeState((state) => (state.todoItems = []));
    this.saveToStorage();
  };

  private saveToStorage = () => {
    localStorage.setItem(this.lsKey, JSON.stringify(readState().todoItems));
  };
}

const todoService = new TodoService();
export default todoService;
