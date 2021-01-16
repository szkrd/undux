import motdService from './motdService';
import todoService, { ITodoItem } from './todoService';

export class AppState {
  user = {
    name: 'John Doe',
    email: 'john.doe@mail.com',
  };
  ui = {
    editMode: true,
  };
  motd: string = motdService.getRandomQuote();
  todoItems: ITodoItem[] = todoService.loadFromStorage();
}

// ---

const state = new AppState();
const listeners = [];
type TModifierFn = (state: AppState) => void;

export function writeState(modifierFn: TModifierFn) {
  modifierFn(state);
  listeners.forEach((listener) => listener(state));
}

export function readState() {
  // if you have the memory to burn, you can return a deep clone in dev mode
  // probably with JSON.parse + JSON.stringify, since the store is serializable
  return state;
}

type TComparatorFn = (a: any, b: any) => boolean;
export function addAppStateChangeListener<T>(
  selectorFn: (state: AppState) => T,
  setterFn: (val: T) => void,
  comparatorFn?: TComparatorFn
) {
  let oldVal: any;
  const listener = () => {
    const state = readState();
    const val = selectorFn(state);
    const referenceChanged = val !== oldVal;
    if (referenceChanged || (comparatorFn && comparatorFn(oldVal, val))) {
      setterFn(val);
      oldVal = val;
    }
  };
  listeners.push(listener);
  return () => {
    const idx = listeners.indexOf(listener);
    if (idx > -1) listeners.splice(idx, 1);
  };
}
