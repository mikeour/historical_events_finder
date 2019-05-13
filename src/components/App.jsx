import React, { useState, Fragment } from "react";
import Form from "./Form.jsx";
import Results from "./Results.jsx";
import axios from "axios";

const App = () => {
  const [results, setResults] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const updateSearch = e => {
    setSearch(e.target.value);
  };

  const updateResults = e => {
    e.preventDefault();
    axios.get(`/events?q=${search}&_page=${page}`).then(({ data }) => {
      setResults(data);
    });
  };

  return (
    <Fragment>
      <Form updateSearch={updateSearch} updateResults={updateResults} />
      <Results results={results} />
    </Fragment>
  );
};

export default App;
