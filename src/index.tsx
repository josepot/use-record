import React, { useState, useMemo } from 'react';

type NotFunction<T> = T extends Function ? never : T;

export function useRecord<K extends keyof any, V>(
  input: Record<K, NotFunction<V>>
) {
  const [state, setState] = useState(input);

  return useMemo(() => {
    const setEntry = (key: K, updater: V | ((i: V) => V)): void => {
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
    };

    return [state, setEntry, setState] as const;
  }, []);
}

const initialState: Record<string, number> = { foo: 0, bar: 0, baz: 0 };
const inc = (x: number) => x + 1;
const dec = (x: number) => x - 1;

export const MyComponent: React.FC = () => {
  const [state, setRecord, setRecords] = useRecord(initialState);

  return (
    <>
      <ul>
        {Object.entries(state).map(([key, val]) => (
          <li key={key}>
            <button onClick={() => setRecord(key, dec)}>-</button>
            {key}: {val}
            <button onClick={() => setRecord(key, inc)}>+</button>
            <button onClick={() => setRecord(key, 0)}>RESET</button>
          </li>
        ))}
      </ul>
      <button onClick={() => setRecords(initialState)}>RESET ALL</button>
    </>
  );
};
