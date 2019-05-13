import React, { useState, Fragment } from "react";
import Form from "./Form.jsx";
import Results from "./Results.jsx";
import MoreButton from "./MoreButton.jsx";
import axios from "axios";

const App = () => {
  const [results, setResults] = useState("");
  const [nextResults, setNextResults] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

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
        getNextResults();
      });
  };

  const getNextResults = () => {
    axios.get(`/events?q=${search}&_page=${page + 1}`).then(({ data }) => {
      if (data) {
        setNextResults(data);
      } else {
        setNextResults(null);
      }
    });
  };

  const updateWithNextResults = () => {
    setResults(nextResults);
    setPage(page + 1);
    getNextResults();
  };

  return (
    <Fragment>
      <Form updateSearch={updateSearch} updateResults={updateResults} />
      <Results results={results} />
      {nextResults && (
        <MoreButton updateWithNextResults={updateWithNextResults} />
      )}
    </Fragment>
  );
};

export default App;
