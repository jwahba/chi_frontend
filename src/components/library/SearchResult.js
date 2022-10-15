import axios from "axios";
import React, { useEffect, useState } from "react";
import Layout from "../nav/Layout";
import BookCard from "./BookCard";

function SearchResult() {
  let q = "موسوعة";
  let [books, setBooks] = useState([]);
  let [page, setPage] = useState(1);

  useEffect(() => {
    let params = {
      page: page,
    };
    axios
      .get(`/library/books?search=${q}&page=${page}`, params)
      .then((response) => {
        setBooks((prevState) => [...prevState, ...response.data.results]);
      });
  }, [q, page]);

  return (
    <Layout>
      {books.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </Layout>
  );
}

export default SearchResult;
