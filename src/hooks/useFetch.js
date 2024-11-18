import { useEffect, useState } from "react";

export const useFetch = (fetchFn, initialValue) => {
  const [isFetching, setIsFetching] = useState();
  const [fetchData, setFetchData] = useState(initialValue);
  const [error, setError] = useState();

  useEffect(() => {
    const fetchData = async () => {
      setIsFetching(true);
      try {
        const data = await fetchFn();
        setFetchData(data);
      } catch (error) {
        setError({ massage: error.message || "Failed to fetch data" });
      }

      setIsFetching(false);
    };

    fetchData();
  }, [fetchData]);

  return {
    isFetching,
    fetchData,
    setFetchData,
    error,
  };
};
