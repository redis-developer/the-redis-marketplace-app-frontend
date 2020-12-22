import { useEffect, useState } from 'react';

import api from '../api';

export default function useRequest(url) {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});

  useEffect(() => {
    let ignoreData = false;
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await api.get(url);
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
  }, [url]);

  return { data, loading, error };
}
