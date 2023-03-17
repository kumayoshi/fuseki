import React, { useState } from "react";
// style
import CommonStyles from "../assets/css/CommonStyles.css";
// firebase
import { auth } from "../firebase";
// import firebase from "firebase";
import { sendPasswordResetEmail } from "firebase/auth";
// library
import { useNavigate } from "react-router-dom";
// component
import Header from "../components/Header";
import SignButton from "../components/SignButton";
import SignForm from "../components/SignForm";
import PasswordResetValidate from "../components/PasswordResetValidate";

const PasswordReset = () => {
  // navigate
  const navigate = useNavigate();
  // メールアドレス、パスワード格納用の変数
  const [mail, setMail] = useState("");
  // メール送信成功時のフラッグ
  const [success, setSuccess] = useState(false);
  // メール送信失敗時のエラー内容格納
  const [error, setError] = useState("");

  // パスワード変更用のurlをメールアドレスに送る
  const passwordResetMailSend = async () => {
    await sendPasswordResetEmail(auth, mail)
      .then(() => {
        setSuccess(true);
        setTimeout(() => {
          navigate("/");
        }, 2000);
      })
      .catch((err) => {
        const errorMessage = err.message;
        if (errorMessage.indexOf("user-not-found") !== -1) {
          setError(
            "入力していただいたメールアドレスは登録されているものと違うみたいです..."
          );
        } else if (errorMessage.indexOf("invalid") !== -1) {
          setError(
            "メールアドレスの形式が正しくないようです。@が抜けているとか...？"
          );
        }
      });
  };

  return (
    <div className={CommonStyles.wrap}>
      <Header currentPage="パスワード再設定" user={""} />
      <div style={styles.wrap}>
        <div>
          <h2 style={styles.pageTitle}>
            パスワードを再設定するためのurlを送ります。
            <br />
            登録されたメールアドレスを入力してください。
          </h2>
          {success && (
            <PasswordResetValidate
              judge="success"
              successMessage="パスワード変更のためのurlをメールアドレスに送信させていただきました。メールをご確認ください。"
            />
          )}
          {error !== "" && success === false && (
            <PasswordResetValidate judge="error" errorMessage={error} />
          )}
        </div>
        <div>
          <SignForm
            onMailChange={(text) => setMail(text)}
            passExistence="none"
          />

          <SignButton
            onClick={() => passwordResetMailSend()}
            label="メールを送る"
            style={styles.submitButtonWide}
          />
        </div>
        <p style={styles.signUptext}>
          <a style={styles.signUpLink} href={"/"}>
            ログインに戻る
          </a>
        </p>
      </div>
    </div>
  );
};

export default PasswordReset;

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
  pageTitle: {
    fontSize: "3.5vw",
    textAlign: "center",
    marginBottom: "8vw",
  },
};
