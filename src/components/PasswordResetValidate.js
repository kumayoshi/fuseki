import React from "react";

const PasswordResetValidate = ({ judge, errorMessage, successMessage }) => {
  return (
    <p style={judge === "success" ? styles.successWrap : styles.errorWrap}>
      {judge === "success" ? successMessage : errorMessage}
    </p>
  );
};

export default PasswordResetValidate;

const styles = {
  successWrap: {
    width: "100%",
    border: "5px solid #54dca9",
    background: "#fff",
    textAlign: "center",
    boxSizing: "border-box",
    padding: "4vw 3vw",
    borderRadius: "10px",
    fontSize: "4vw",
    fontWeight: "bold",
    marginBottom: "5vw",
  },
  errorWrap: {
    width: "100%",
    border: "5px solid #F27855",
    background: "#fff",
    textAlign: "center",
    boxSizing: "border-box",
    padding: "4vw 3vw",
    borderRadius: "10px",
    fontSize: "4vw",
    fontWeight: "bold",
    marginBottom: "5vw",
  },
};
