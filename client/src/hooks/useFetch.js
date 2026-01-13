import axios from "axios";
import { useEffect, useState } from "react";

const useFetch = (url) => {
  const [data, setData] = useState([]); // default empty array
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const source = axios.CancelToken.source();

    async function fetchData() {
      try {
        setLoading(true);
        const response = await axios.get(url, { cancelToken: source.token });
        setData(response.data || []); // fallback to empty array
      } catch (err) {
        if (!axios.isCancel(err)) setError(err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();

    return () => {
      source.cancel("Component unmounted");
    };
  }, [url]);

  return { data, loading, error };
};

export default useFetch;
