import React, { Fragment } from "react";
import Entry from "./Entry.jsx";

const Results = props => {
  const { results } = props;

  return (
    <Fragment>
      {results && results.map(result => <Entry result={result} />)}
    </Fragment>
  );
};

export default Results;
