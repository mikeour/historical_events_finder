import React from "react";

const MoreButton = props => {
  const { updateWithNextResults } = props;
  return <button onClick={updateWithNextResults}>Load more entries</button>;
};

export default MoreButton;
