import React, { useState, Fragment } from "react";
import Form from "./Form.jsx";
import axios from "axios";

const App = () => {
  const [results, setResults] = useState("");
  const [search, setSearch] = useState("");

  const updateSearch = e => {
    setSearch(e.target.value);
  };

  const updateResults = e => {
    e.preventDefault();
    axios.get(`/events?q=${search}`).then(({ data }) => {
      setResults(data);
    });
  };

  return (
    <Fragment>
      <Form updateSearch={updateSearch} updateResults={updateResults} />;
    </Fragment>
  );
};

export default App;
