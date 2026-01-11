import axios from "axios";
import { useEffect, useState } from "react"

const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const source = axios.CancelToken.source(); // for cleanup
        async function fetchData() {
            try {
                setLoading(true);   // start loading
                const response = await axios.get(url, { cancelToken: source.token });
                setData(response.data);
            } catch (err) {
                if (axios.isCancel(err)) {
                    console.log("Request Cancelled", err.message);
                } else {
                    setError(err);
                }
            } finally {
                setLoading(false);
            }
        }

        fetchData();

        // cleanup if component unmounts
        return () => {
            source.cancel("Component unmounted");
        };
    },[url]);

    return { data, loading, error };
}

export default useFetch;