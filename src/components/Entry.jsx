import React, { Fragment, useState } from "react";

const Entry = props => {
  const { result } = props;
  const [editedText, setEditedText] = useState(null);
  const text = editedText || result.description;

  const editText = () => {
    const result = window.prompt("Edited text?", text);
    setEditedText(result);
  };

  return (
    <Fragment>
      <p>{text}</p>
      <button onClick={editText}>x</button>
    </Fragment>
  );
};

export default Entry;
