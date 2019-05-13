import React, { useState } from "react";

const Form = props => {
  const { updateResults, updateSearch } = props;

  return (
    <form onSubmit={updateResults}>
      <input type="text" onChange={updateSearch} />
      <button>Search</button>
    </form>
  );
};

export default Form;
