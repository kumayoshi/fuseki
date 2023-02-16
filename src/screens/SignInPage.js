import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import SignButton from "../components/SignButton";
import SignForm from "../components/SignForm";
// firebase
import { auth } from "../firebase";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
// routerdom
import { Navigate } from "react-router-dom";
// style
import "./CommonStyles.css";
import CommonStyles from "./CommonStyles.css";

const SignInPage = () => {
  const [mail, setMail] = useState("");
  const [pass, setPass] = useState("");

  // SignIn用の関数
  const signInSubmit = async (e) => {
    e.preventDefault();
    const signUpMail = mail;
    const signUpPass = pass;
    await signInWithEmailAndPassword(auth, signUpMail, signUpPass)
      .then((userCredential) => {})
      .catch((error) => {
        alert("正しく入力してください");
      });
  };
  // ログイン監視
  const [user, setUser] = useState("");
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, []);

  if (user) {
    return (
      <div style={styles.base}>
        <div style={styles.wrap}>
          <Navigate to="/onbord/" replace={true} />
        </div>
      </div>
    );
  } else {
    return (
      <div className={CommonStyles.wrap}>
        <Header currentPage="ログイン" user={user} />
        <div style={styles.wrap}>
          <div>
            <SignForm
              // mailValue={mail}
              onMailChange={(text) => setMail(text)}
              // passValue={pass}
              onPassChange={(text) => setPass(text)}
            />

            <SignButton
              onClick={(e) => signInSubmit(e)}
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
  }
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
