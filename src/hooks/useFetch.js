import { useCallback, useEffect, useState } from "react";


export default function useFetch(fetcher) {
  const [state, setState] = useState({ data: null, loading: true, error: null });
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let ignore = false; // prevents updating state after the component unmounte
    fetcher()
      .then((data) => {
        if (!ignore) setState({ data, loading: false, error: null });
      })
      .catch((error) => {
        if (!ignore) setState({ data: null, loading: false, error: error.message || "Something went wrong." });
      });
    return () => {
      ignore = true;
    };
  }, [fetcher, attempt]);

  const retry = useCallback(() => {
    setState({ data: null, loading: true, error: null });
    setAttempt((count) => count + 1);
  }, []);

  return { ...state, retry };
}
