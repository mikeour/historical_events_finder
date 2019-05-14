import React, { Fragment, useState } from "react";
import Entry from "./Entry.jsx";

const Results = props => {
  const { results } = props;

  return (
    <Fragment>
      {results &&
        results.map(result => {
          return <Entry result={result} />;
        })}
    </Fragment>
  );
};

export default Results;
