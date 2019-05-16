import React, { Fragment, useState, useCallback } from "react";
import Form from "./Form.jsx";
import Results from "./Results.jsx";
import MoreButton from "./MoreButton.jsx";
import axios from "axios";

const App = () => {
  const [results, setResults] = useState("");
  const [nextResults, setNextResults] = useState("");
  const [search, setSearch] = useState("");
  const [totalResults, setTotalResults] = useState("");
  const [page, setPage] = useState(1);
  const pageIncrement = useCallback(() => page + 1, [page]);

  const updateSearch = e => {
    setSearch(e.target.value);
  };

  const updateResults = e => {
    e.preventDefault();
    axios
      .get(`/events?q=${search}&_page=${page}`)
      .then(({ data }) => {
        setResults(data);
      })
      .then(() => {
        setPage(pageIncrement);
        getNextResults();
      })
      .then(() => {
        getTotalResults();
      });
  };

  const getNextResults = () => {
    axios.get(`/events?q=${search}&_page=${page + 1}`).then(({ data }) => {
      if (data.length > 0) {
        setNextResults(data);
      } else {
        setNextResults(null);
      }
    });
  };

  const updateWithNextResults = () => {
    setResults(nextResults);
    setPage(pageIncrement);
    getNextResults();
  };

  const getTotalResults = () => {
    axios.get(`/events?q=${search}`).then(({ data }) => {
      setTotalResults(data.length);
    });
  };

  return (
    <Fragment>
      <h2>Historical Events Finder</h2>
      <Form updateSearch={updateSearch} updateResults={updateResults} />
      {totalResults && <p>Total search results: {totalResults}</p>}
      <Results results={results} />
      {nextResults && (
        <MoreButton updateWithNextResults={updateWithNextResults} />
      )}
    </Fragment>
  );
};

export default App;
