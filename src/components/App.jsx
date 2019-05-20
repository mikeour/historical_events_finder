import React, { Fragment, useState, useCallback } from "react";
import Form from "./Form.jsx";
import Results from "./Results.jsx";
import MoreButton from "./MoreButton.jsx";
import axios from "axios";

const App = () => {
  const [results, setResults] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const pageIncrement = useCallback(() => page + 1, [page]);

  const updateSearch = e => {
    setSearch(e.target.value);
  };

  const updateResults = e => {
    e.preventDefault();
    axios.get(`/events/${search}`).then(({ data }) => {
      console.log("data ", data);
      setResults(data.results);
    });
  };

  return (
    <Fragment>
      <h2>Historical Events Finder</h2>
      <Form updateSearch={updateSearch} updateResults={updateResults} />
      <Results results={results} />
    </Fragment>
  );
};

export default App;
