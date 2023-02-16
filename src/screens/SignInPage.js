import React, { useState, useEffect } from "react";
import "./CommonStyles.css";
import CommonStyles from "./CommonStyles.css";
// import { auth } from "../firebase";
import Header from "../components/Header";
// import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { Navigate } from "react-router-dom";

import SignButton from "../components/SignButton";
import SignForm from "../components/SignForm";

const SignInPage = () => {
  const [mail, setMail] = useState("");
  const [pass, setPass] = useState("");

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   console.log(e);
  //   const signUpMail = mail;
  //   const signUpPass = pass;
  //   await signInWithEmailAndPassword(auth, signUpMail, signUpPass)
  //     .then((userCredential) => {})
  //     .catch((error) => {
  //       alert("正しく入力してください");
  //     });
  // };

  // const [user, setUser] = useState("");
  // useEffect(() => {
  //   onAuthStateChanged(auth, (currentUser) => {
  //     setUser(currentUser);
  //   });
  // }, []);

  // if (user) {
  //   return (
  //     <div style={styles.base}>
  //       <div style={styles.wrap}>
  //         <Navigate to="/todolist" replace={true} />
  //       </div>
  //     </div>
  //   );
  // } else {

  // SignIn用の関数
  const signInSubmit = () => {
    console.log("SignIn用の関数です。");
  };

  return (
    <div className={CommonStyles.wrap}>
      <Header currentPage="ログイン" user="" />
      <div style={styles.wrap}>
        <div>
          <SignForm
            mailValue={mail}
            onMailChange={(e) => setMail(e.target.value)}
            passValue={pass}
            onPassChange={(e) => setPass(e.target.value)}
          />

          <SignButton
            onClick={() => signInSubmit()}
            label="ログイン"
            style={styles.submitButton}
          />
        </div>

        <p style={styles.signUptext}>
          <a style={styles.signUpLink} href={"/signup/"}>
            ご登録がまだの方
          </a>
        </p>
      </div>
    </div>
  );
  // }
};

export default SignInPage;

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
  signUptext: {
    textAlign: "center",
    marginTop: "18vw",
    fontWeight: "bold",
  },
  signUpLink: {
    color: "#579DDD",
  },
};
