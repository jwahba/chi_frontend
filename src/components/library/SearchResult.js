import axios from "axios";
import React, { useState, useRef, useEffect, useCallback } from "react";
import { useLocation } from "react-router-dom";
import Layout from "../nav/Layout";
import BookCard from "./BookCard";
import useBookSearch from "./useBookSearch";

function SearchResult() {
  const location = useLocation();
  const searchQuery = useRef();
  const [page, setPage] = useState(1);
  const [q, setQ] = useState(location.state.q);
  const [trigger, setTrigger] = useState(false);
  const { loading, error, books, hasMore } = useBookSearch(q, page, trigger);
  const observer = useRef();
  const lastBookElement = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    setPage(1);
    setQ(searchQuery.current.value);
    setTrigger((prevState) => !prevState);
  };

  return (
    <Layout>
      <h2>المكتبة الالكترونية</h2>
      <hr />
      <div className="border p-3">
        <h4>البحث عن كتاب</h4>
        <form className="d-flex mt-3" onSubmit={handleSearchSubmit}>
          <input
            className="form-control  me-2"
            type="search"
            placeholder="البحث باسم الكتاب أو المؤلف"
            aria-label="Search"
            defaultValue={q}
            ref={searchQuery}
            required
          />
          <button className="btn btn-primary" type="submit">
            بحث
          </button>
        </form>
      </div>
      <hr />
      <div className="row">
        {books.map((book, index) => {
          if (books.length === index + 1) {
            return (
              <BookCard innerRef={lastBookElement} key={book.id} book={book} />
            );
          } else {
            return <BookCard key={book.id} book={book} />;
          }
        })}
      </div>
      <div>{loading && "Loading..."}</div>
      <div>{error && "Error"}</div>
    </Layout>
  );
}

export default SearchResult;
