import { useEffect, useState } from 'react';

import api from '../api';

export default function useRequest(url, params, shouldFetch) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let ignoreData = false;
    const fetchData = async () => {
      try {
        const fetch = !shouldFetch || shouldFetch(params);
        if (fetch) {
          setLoading(true);
          setError(null);
          const response = await api.get(url, { params: params || {} });
          if (!ignoreData) setData(response.data);
        }
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    return () => {
      ignoreData = true;
    };
  }, [url, params, shouldFetch]);

  return { data, loading, error };
}
