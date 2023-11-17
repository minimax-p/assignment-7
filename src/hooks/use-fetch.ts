import { useState, useEffect } from "react";
import { Book } from "components/organisms/book-list";

const useFetch = <T>(uri: string | undefined) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<T | null>(null);
  const [hasData, setHasData] = useState(false);
  const [error, setError] = useState<unknown>(null);
  const [hasError, setHasError] = useState(false);
  const [booksCount, setBooksCount] = useState(null);
  const [books, setBooks] = useState<Book[]>([]);

  const fetchData = async () => {
    if (!uri) {
      return;
    }
    try {
      setLoading(true);
      const response = await fetch(uri);
      if (!response.ok) {
        setHasError(true);
        return;
      }
      const data = await response.json();
      setData(data);
      setBooksCount(data.numFound);
      setBooks(data.docs);
      setHasData(true);
    } catch (err: unknown) {
      setHasError(true);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [uri]);

  return {
    data,
    loading,
    hasData,
    error,
    hasError,
    booksCount,
    books,
  };
};

export { useFetch };
