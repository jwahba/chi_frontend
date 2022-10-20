import React from "react";

function BookCard({ book, innerRef }) {
  return (
    <div ref={innerRef} className="col d-flex align-items-stretch">
      <div className="card mb-3" style={{ width: "18rem" }}>
        <img
          src={book.thumbnail}
          className="card-img-top"
          alt="..."
          width="100"
          height="300"
        />
        <div className="card-body b-0">
          <h5 className="card-title ">{book.title}</h5>
          <p className="card-text mb-0">{book.subtitle}</p>
          <p className="card-text">{book.author_name}</p>
        </div>
      </div>
    </div>
  );
}

export default BookCard;
