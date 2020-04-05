import { useState, useCallback } from 'react';

type NotFunction<T> = T extends Function ? never : T;

export function useRecord<K extends keyof any, V>(
  input: Record<K, NotFunction<V>>
) {
  const [state, setState] = useState(input);

  const setEntry = useCallback((key: K, updater: V | ((i: V) => V)): void => {
    setState(currentState => {
      const currentVal = currentState[key];
      const nextVal: V =
        typeof updater === 'function'
          ? (updater as (i: V) => V)(currentVal)
          : updater;
      return currentVal === nextVal
        ? currentState
        : { ...currentState, [key]: nextVal };
    });
  }, []);
  return [state, setEntry, setState] as const;
}
