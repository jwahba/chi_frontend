import React from "react";
import Layout from "../nav/Layout";

function List() {
  const search = async (e) => {
    e.preventDefault();
    console.log("search");
  };
  return (
    <Layout>
      <h2>المكتبة الالكترونية</h2>
      <hr />
      <div className="border p-3">
        <h4>البحث عن كتاب</h4>
        <form className="d-flex mt-3" onSubmit={search}>
          <input
            className="form-control  me-2"
            type="search"
            placeholder="البحث باسم الكتاب أو المؤلف"
            aria-label="Search"
            required
          />
          <button className="btn btn-primary" type="submit">
            بحث
          </button>
        </form>
      </div>
      <hr />
      <h4>التصنيفات</h4>
    </Layout>
  );
}

export default List;
