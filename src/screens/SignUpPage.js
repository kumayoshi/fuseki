import React, { useState, useEffect } from "react";
// style
import CommonStyles from "../assets/css/CommonStyles.css";
// firebase
import { auth, db } from "../firebase";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
// library
import { useNavigate } from "react-router-dom";
// component
import Header from "../components/Header";
import SignButton from "../components/SignButton";
import SignForm from "../components/SignForm";

const SignUpPage = () => {
  // メールアドレス、パスワード格納用の変数
  const [mail, setMail] = useState("");
  const [pass, setPass] = useState("");
  // nanigate用の変数
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
      // 新規登録成功時userlistにユーザを追加
      onAuthStateChanged(auth, (currentUser) => {
        addDoc(collection(db, "userList"), {
          mailadress: signUpMail,
          password: signUpPass,
          signInUserId: currentUser?.uid,
        });
      });
      // userlistにユーザを追加後　オンボーディングページに飛ぶ
      navigate("/onbord/");
    } catch (error) {
      // 新規登録失敗時にエラー内容をアラートに出す
      const errorCode = error.code;
      if (errorCode === "auth/user-not-found") {
        alert(
          "入力していただいたメールアドレス、パスワードでは該当するユーザがいません。\n一度違うものを試していただけないでしょうか？"
        );
      } else if (errorCode === "auth/invalid-email") {
        alert(
          "メールアドレスの形式が正しくありません。\n一度見直して再度試していただけませんか？"
        );
      }
    }
  };
  // ログイン監視
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        navigate("/memolist/");
      }
    });
  }, []);

  return (
    <div className={CommonStyles.wrap}>
      <Header currentPage="新規登録" user={""} />
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
