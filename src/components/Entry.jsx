import React, { Fragment, useState } from "react";
import Modal from "react-modal";

const Entry = props => {
  const { result } = props;
  const [editedText, setEditedText] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalText, setModalText] = useState("");
  const text = modalText || result.description;

  // const editText = () => {
  //   const userEdit = window.prompt("What would you like to edit?", text);
  //   setEditedText(userEdit);
  // };

  const modalStyle = {
    content: {
      display: "inline-block",
      backgroundColor: "goldenrod"
    }
  };

  const editText = () => {
    setShowModal(prevBool => !prevBool);
  };

  const updateModalText = e => {
    e.preventDefault();
    setModalText(e.target.value);
  };

  const updateText = e => {
    setEditedText(modalText);
  };

  return (
    <Fragment>
      <p>{text}</p>
      <button onClick={editText}>Edit</button>
      <Modal isOpen={showModal} onRequestClose={editText} style={modalStyle}>
        <form onSubmit={updateText}>
          <input type="text" onChange={updateModalText} placeholder={text} />
        </form>
        <button onClick={editText}>Yes</button>
      </Modal>
    </Fragment>
  );
};

export default Entry;
