import React, { useState, useEffect } from "react";
import "./CommonStyles.css";
import CommonStyles from "./CommonStyles.css";
// import { auth } from "../firebase";
import Header from "../components/Header";
// import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { Navigate } from "react-router-dom";

import SignButton from "../components/SignButton";
import SignForm from "../components/SignForm";

const SignUpPage = () => {
  const [mail, setMail] = useState("");
  const [pass, setPass] = useState("");

  // SignUp用の関数
  const signInSubmit = () => {
    console.log("SignIn用の関数です。");
  };

  return (
    <div className={CommonStyles.wrap}>
      <Header currentPage="新規登録" user="" />
      <div style={styles.wrap}>
        <SignForm
          mailValue={mail}
          onMailChange={(e) => setMail(e.target.value)}
          passValue={pass}
          onPassChange={(e) => setPass(e.target.value)}
        />

        <SignButton
          onClick={() => signInSubmit()}
          label="新規登録"
          style={styles.submitButton}
        />

        <p style={styles.signIntext}>
          <a style={styles.signInLink} href={"/"}>
            すでに登録されている方
          </a>
        </p>
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
  signIntext: {
    textAlign: "center",
    marginTop: "18vw",
    fontWeight: "bold",
  },
  signInLink: {
    color: "#579DDD",
  },
};
