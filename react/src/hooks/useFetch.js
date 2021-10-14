import { useEffect } from 'react';

function useFetch(link, state, loader) {
  return useEffect(async () => {
    try {
      const response = await fetch(link);
      const json = await response.json();
      state(json);
      loader(false);
    } catch (error) {
      console.log("error", error);
    }
  }, []);
}

export default useFetch;
