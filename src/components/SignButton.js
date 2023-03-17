import React from "react";

const SignButton = ({ label, onClick, style }) => {
  return (
    <button
      style={style ? style : styles.submitButton}
      onClick={(e) => onClick(e)}
    >
      {label}
    </button>
  );
};

export default SignButton;

const styles = {
  submitButton: {
    width: "49vw",
    margin: "11vw auto 0px",
    display: "block",
    padding: "3vw 0",
    boxSizing: "border-box",
    textAlign: "center",
    fontSize: "5vw",
    fontWeight: "bold",
    border: "2px solid #5bcbcb",
    color: "#5bcbcb",
    borderRadius: "8px",
    background: "#fff",
  },
  submitButtonWide: {
    width: "66vw",
    margin: "11vw auto 0px",
    display: "block",
    padding: "3vw 0",
    boxSizing: "border-box",
    textAlign: "center",
    fontSize: "5vw",
    fontWeight: "bold",
    border: "2px solid #5bcbcb",
    color: "#5bcbcb",
    borderRadius: "8px",
    background: "#fff",
  },
};
