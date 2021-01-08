import { useEffect, useState } from 'react';

import api from '../api';

export default function useRequest(url, params) {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let ignoreData = false;
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await api.get(url, { params: params || {} });
        if (!ignoreData) setData(response.data);
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
  }, [url, params]);

  return { data, loading, error };
}
