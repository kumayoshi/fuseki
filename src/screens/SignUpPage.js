import React, { useState, useEffect } from "react";
import "./CommonStyles.css";
import CommonStyles from "./CommonStyles.css";
// import { auth } from "../firebase";
import Header from "../components/Header";
// import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { Navigate } from "react-router-dom";

const SignUpPage = () => {
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
  return (
    <div className={CommonStyles.wrap}>
      <Header currentPage="新規登録" user="" />
      <div style={styles.wrap}>
        {/* <AuthItem
            title="ログイン"
            onChangeMail={(e) => setMail(e.target.value)}
            onChangePass={pass}
            onFromtype={SubmitFunc()}
          ></AuthItem> */}
        <div>
          <div>
            <label>
              <p style={styles.labelText}>メールアドレス</p>
              <input
                type="email"
                placeholder="メールアドレス"
                value={mail}
                onChange={(e) => setMail(e.target.value)}
                style={styles.inputText}
              />
            </label>
          </div>
          <div style={styles.passwordBlock}>
            <label>
              <p style={styles.labelText}>パスワード</p>
              <input
                type="password"
                placeholder="パスワード (6文字以上)"
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                style={styles.inputText}
              />
            </label>
          </div>

          <button
            type="submit"
            // onClick={(e) => handleSubmit(e)}
            style={styles.submitButton}
          >
            新規登録
          </button>
        </div>

        <p style={styles.signUptext}>
          <a style={styles.signUpLink} href={"/"}>
            すでに登録されている方
          </a>
        </p>

        <p>
          <a href={"/onbord/"}>オンボーディングページへ</a>
        </p>
      </div>
    </div>
  );
  // }
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
