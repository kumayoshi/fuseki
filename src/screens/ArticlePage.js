import React, { useState, useEffect } from "react";
import "./CommonStyles.css";
import CommonStyles from "./CommonStyles.css";
// import { auth } from "../firebase";
import Header from "../components/Header";
// import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { Navigate } from "react-router-dom";

const SignUpPage = () => {
  return (
    <div className={CommonStyles.wrap}>
      <Header currentPage="新規メモ" user="" />
      <div style={styles.wrap}>
        <a href={"/memolist/"}>メモ一覧ページへ</a>
      </div>
    </div>
  );
};

export default SignUpPage;

const styles = {
  base: {
    background: "#fafafa",
    padding: "0px",
    margin: "0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  wrap: {
    padding: "0px",
    margin: "38vw auto 0",
    width: "79%",
    borderRadius: "10px",
  },
  title: {
    fontSize: "24px",
    textAlign: "center",
    width: "100%",
    marginBottom: "40px",
  },
  labelText: {
    color: "rgba(67,67,67,0.4)",
    fontSize: "3vw",
  },
  inputText: {
    width: "100vw",
    margin: "0 calc(50% - 50vw)",
    padding: "5vw 13% 4vw",
    boxSizing: "border-box",
    fontSize: "4.7vw",
    marginTop: "1vw",
    fontWeight: "bold",
  },
  passwordBlock: {
    marginTop: "13vw",
  },
  passwordAttentionText: {
    margin: "0 calc(50% - 50vw)",
    fontSize: "3vw",
    marginTop: "1vw",
    padding: "0 3vw",
    textAlign: "right",
  },
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
    color: "#fff",
    borderRadius: "8px",
    background: "#5bcbcb",
  },
  signUptext: {
    textAlign: "center",
    marginTop: "18vw",
    fontWeight: "bold",
  },
  signUpLink: {
    color: "#579DDD",
  },
};
