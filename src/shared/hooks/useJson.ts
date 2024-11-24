import { useEffect, useState } from "react";

export const useJson = <T>(url: string) => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async () => {
    setIsLoading(true);
    
    try{
      const response = await fetch(url);

      if (!response.ok){
        throw new Error('Network response was not ok');
      }

      const jsonResponse: T = await response.json();
      setData(jsonResponse);
    } catch (error) {
      setError(error as Error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return { data, isLoading, error };
};