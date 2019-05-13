import React, { Fragment } from "react";

const Results = props => {
  const { results } = props;
  return (
    <Fragment>
      {results &&
        results.map(result => {
          return <p>{result.description}</p>;
        })}
    </Fragment>
  );
};

export default Results;
