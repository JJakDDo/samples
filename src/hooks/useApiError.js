import { useCallback } from "react";
const defaultHandlers = {};

function useApiError(callback) {
  const handler = useCallback(
    (error) => {
      callback();
    },
    [callback]
  );

  return { handler };
}

export default useApiError;
