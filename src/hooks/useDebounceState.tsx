import { useEffect, useState } from "react";

type useDebounceStateProps = {
  value: string;
  ms?: number;
};

export const useDebounceState = ({
  value,
  ms = 1000,
}: useDebounceStateProps) => {
  const [debounceState, setDebounceState] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounceState(value);
    }, ms);

    return () => {
      clearTimeout(handler);
    };
  }, [value]);

  return debounceState;
};
