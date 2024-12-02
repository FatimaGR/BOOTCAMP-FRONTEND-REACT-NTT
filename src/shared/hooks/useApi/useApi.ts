import { useEffect, useState } from "react";

interface FetchOptions{
  method?: string;
  headers?: Record<string, string>;
  body?: unknown;
}

export const useApi = <T>(url: string, options: FetchOptions = {}) => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async () => {
    setIsLoading(true);
    
    try{
      const response = await fetch(url, {
        method: options.method || "GET",
        headers: {
          'Content-Type': 'application/json',
          ...options.headers
        },
        body: options.body ? JSON.stringify(options.body) : null
      });

      if (!response.ok){
        throw new Error('Network response was not ok');
      }

      const jsonResponse: T = await response.json();
      setData(jsonResponse);
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (url) {
      fetchData();
    }
  }, [url]);

  return { data, isLoading, error };
};