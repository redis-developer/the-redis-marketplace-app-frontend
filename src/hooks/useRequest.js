import { useEffect, useRef, useState } from 'react';

import api from '../api';

export default function useRequest({ url, params, preCheckParams, skipFirstFetch, initialData }) {
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const skipFirstFetchRef = useRef(skipFirstFetch);

  useEffect(() => {
    let ignoreData = false;
    const fetchData = async () => {
      try {
        const shouldFetch =
          !skipFirstFetchRef.current && (!preCheckParams || preCheckParams(params));
        if (shouldFetch) {
          setLoading(true);
          setError(null);
          const response = await api.get(url, { params: params || {} });
          if (!ignoreData) setData(response.data);
        } else {
          skipFirstFetchRef.current = false;
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
  }, [url, params, preCheckParams]);

  return { data, loading, error };
}
