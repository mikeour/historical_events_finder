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
    console.log("updateResults ran");
    axios
      .get(`/events?q=${search}&_page=${page}`)
      .then(({ data }) => {
        console.log("updateResults data", data);
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
    console.log("getNextResults ran");
    axios.get(`/events?q=${search}&_page=${page + 1}`).then(({ data }) => {
      if (data.length > 0) {
        console.log("data exists", data);
        setNextResults(data);
      } else {
        console.log("data does not exist");
        setNextResults(null);
      }
    });
  };

  const updateWithNextResults = () => {
    console.log("updateWithNextResults ran");
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
      <h6>Historical Events Finder</h6>
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
