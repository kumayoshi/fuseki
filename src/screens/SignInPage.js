import React, { useState, useEffect } from "react";
// style
import CommonStyles from "../assets/css/CommonStyles.css";
// firebase
import { auth } from "../firebase";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
// library
import { useNavigate } from "react-router-dom";
// component
import Header from "../components/Header";
import SignButton from "../components/SignButton";
import SignForm from "../components/SignForm";
import PasswordResetValidate from "../components/PasswordResetValidate";

const SignInPage = () => {
  // メールアドレス、パスワード格納用の変数
  const [mail, setMail] = useState("");
  const [pass, setPass] = useState("");
  // nanigate用の変数
  const navigate = useNavigate();
  // メール送信失敗時のエラー内容格納
  const [error, setError] = useState("");

  // SignIn用の関数
  const signInSubmit = async (e) => {
    e.preventDefault();
    const signUpMail = mail;
    const signUpPass = pass;
    // メールアドレス、パスワードとfirebase authの照合
    await signInWithEmailAndPassword(auth, signUpMail, signUpPass)
      .then((userCredential) => {
        // 成功すればメモ一覧ページへ
        navigate("/memolist/");
      })
      .catch((error) => {
        // 失敗すればアラート
        const errorCode = error.code;
        if (errorCode === "auth/user-not-found") {
          setError(
            "入力していただいたメールアドレス、パスワードでは該当するユーザがいません。\n一度違うものを試してみてください。"
          );
        } else if (errorCode === "auth/invalid-email") {
          setError(
            "メールアドレスの形式が正しくありません。\n一度見直して再度試していただけませんか？"
          );
        }
      });
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
      <Header currentPage="ログイン" user={""} />
      <div style={styles.wrap}>
        {error !== "" && (
          <PasswordResetValidate judge="error" errorMessage={error} />
        )}
        <div>
          <SignForm
            onMailChange={(text) => setMail(text)}
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
