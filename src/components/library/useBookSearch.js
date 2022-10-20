import { useEffect, useState } from "react";
import axios from "axios";

export default function useBookSearch(q, page, trigger) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [books, setBooks] = useState([]);
  const [hasMore, setHasMore] = useState(false);
  useEffect(() => {
    setBooks([]);
  }, [q, trigger]);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError(false);
    axios
      .get(`/library/books?search=${q}&page=${page}`, {
        signal: controller.signal,
      })
      .then((response) => {
        setBooks((prevBooks) => {
          return [...new Set([...prevBooks, ...response.data.results])];
        });
        if (response.data.next) {
          setHasMore(true);
        } else {
          setHasMore(false);
        }
        setLoading(false);
      })
      .catch((e) => {
        if (axios.isCancel(e)) return;
        setHasMore(false);
        setLoading(false);
        setError(true);
      });

    return () => {
      controller.abort();
    };
  }, [q, page, trigger]);

  return { loading, error, books, hasMore };
}
