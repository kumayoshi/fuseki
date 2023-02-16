import React, { useState, useEffect } from "react";
import "./CommonStyles.css";
import CommonStyles from "./CommonStyles.css";
import { auth, db } from "../firebase";
import Header from "../components/Header";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

import SignButton from "../components/SignButton";
import SignForm from "../components/SignForm";

const SignUpPage = () => {
  const [mail, setMail] = useState("");
  const [pass, setPass] = useState("");
  const navigate = useNavigate();
  // SignUp用の関数
  const signInSubmit = async (e) => {
    e.preventDefault();

    try {
      const signUpMail = mail;
      const signUpPass = pass;
      await createUserWithEmailAndPassword(auth, signUpMail, signUpPass);
      setMail("");
      setPass("");

      onAuthStateChanged(auth, (currentUser) => {
        addDoc(collection(db, "userList"), {
          mailadress: signUpMail,
          password: signUpPass,
          signInUserId: currentUser?.uid,
        });
      });

      navigate("/onbord/");
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(
        "errorCode:" + errorCode,
        "     errorMessage:" + errorMessage
      );
      alert("正しく入力してください");
    }
  };
  // ログイン監視
  const [user, setUser] = useState("");
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, []);

  return (
    <div className={CommonStyles.wrap}>
      <Header currentPage="新規登録" user={user} />
      <div style={styles.wrap}>
        <SignForm
          mailValue={mail}
          onMailChange={(text) => setMail(text)}
          passValue={pass}
          onPassChange={(text) => setPass(text)}
        />

        <SignButton
          onClick={(e) => signInSubmit(e)}
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
