# use-record

This hook makes it easier to manipulate `Record`s in React

```ts
import React from 'react'
import { useRecord } from 'use-record'

const initialState: Record<string, number> = { foo: 0, bar: 0, baz: 0 }
const inc = (x: number) => x + 1
const dec = (x: number) => x - 1

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
```
