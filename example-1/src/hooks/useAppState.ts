import { useEffect, useState } from 'react';
import { addAppStateChangeListener, AppState, readState } from '../data/state';

export default function useAppState<T>(selectorFn: (state: AppState) => T) {
  let defaultValue: T = selectorFn(readState());
  const [val, setVal] = useState<T>(defaultValue);
  useEffect(() => addAppStateChangeListener(selectorFn, setVal), [selectorFn]);
  return val;
}
