import { renderHook, act } from '@testing-library/react-hooks';
import { useRecord } from '../src';

describe('useRecord', () => {
  const initialState = { foo: 1, bar: 2 };
  it('initializes with the correct values', () => {
    const { result } = renderHook(() => useRecord(initialState));
    expect(result.current[0]).toBe(initialState);
  });

  it('updates the correct entry', () => {
    const { result } = renderHook(() => useRecord(initialState));
    act(() => {
      result.current[1]('foo', 10);
    });

    expect(result.current[0]).toEqual({ ...initialState, foo: 10 });
  });
});
