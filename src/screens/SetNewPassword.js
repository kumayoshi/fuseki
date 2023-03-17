import React, { useState, useEffect } from "react";
// style
import CommonStyles from "../assets/css/CommonStyles.css";
// firebase
import { auth, db } from "../firebase";
import {
  verifyPasswordResetCode,
  confirmPasswordReset,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import {
  doc,
  collection,
  getDocs,
  updateDoc,
  query,
  where,
} from "firebase/firestore";
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
  const [actionCode, setActionCode] = useState("");
  const [mail, setMail] = useState("");
  const [pass, setPass] = useState("");
  // パスワード変更成功時のフラッグ
  const [success, setSuccess] = useState(false);
  // パスワード変更失敗時のエラー内容格納
  const [error, setError] = useState("");
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const mailaddress = queryParams.get("mailaddress") || "";
    const oobCode = queryParams.get("oobCode") || "";
    setMail(mailaddress);
    setActionCode(oobCode);
  }, []);
  // userList のpasswordの変更
  const userPassUpdate = (userId) => {
    try {
      // パスワードを変更したいuserlistを取得
      const userQuery = query(
        collection(db, "userList"),
        where("signInUserId", "in", [userId])
      );
      getDocs(userQuery).then((querySnapshot) => {
        let userItemId = "";
        querySnapshot.docs.forEach((doc) => {
          userItemId = doc.id;
        });
        const userReference = doc(db, "userList", userItemId);
        // 取得した項目のpasswordを上書き
        updateDoc(userReference, {
          password: pass,
        });
        // 取得した項目のpasswordを上書き
        setSuccess(true);
        navigate("/memolist/");
      });
    } catch (e) {
      console.error("Error adding document: ", e.message);
    }
  };
  // password の変更成功後　ログインする
  const signIn = () => {
    const signInMail = String(mail);
    // メールアドレス、パスワードとfirebase authの照合
    signInWithEmailAndPassword(auth, signInMail, pass)
      .then(() => {
        onAuthStateChanged(auth, (currentUser) => {
          userPassUpdate(currentUser.uid);
        });
      })
      .catch((e) => {
        console.log("signIn : ", e.message);
      });
  };
  // password を変更する関数
  const passwordChenged = () => {
    if (actionCode === "") return; // 取得できない場合処理終了
    const actionCodeString = String(actionCode);
    verifyPasswordResetCode(auth, actionCodeString)
      .then(() => {
        confirmPasswordReset(auth, actionCodeString, pass)
          .then((resp) => {
            signIn();
          })
          .catch((error) => {
            const errorMessage = error.message;
            if (errorMessage.indexOf("expired-action-code") !== -1) {
              setError(
                "パスワードリセットを依頼してからだいぶ時間が経ってしまっているようです。もう一度パスワードリセットの依頼をお願いします。"
              );
            } else if (errorMessage.indexOf("weak-password") !== -1) {
              setError(
                "パスワードが少し簡単すぎるかもしれません。他のパスワードをお試しください。"
              );
            }
          });
      })
      .catch((err) => {
        const errorMessage = err.message;
        if (errorMessage.indexOf("expired-action-code") !== -1) {
          setError(
            "パスワードリセットを依頼してからだいぶ時間が経ってしまっているようです。もう一度パスワードリセットの依頼をお願いします。"
          );
        }
      });
  };

  return (
    <div className={CommonStyles.wrap}>
      <Header currentPage="パスワード再設定" user={""} />
      <div style={styles.wrap}>
        <div>
          {success && (
            <PasswordResetValidate
              judge="success"
              successMessage="パスワードの変更を受け付けました。ログイン先の画面に移ります。"
            />
          )}
          {error !== "" && (
            <PasswordResetValidate judge="error" errorMessage={error} />
          )}
        </div>
        <div>
          <SignForm
            mailExistence="none"
            mailChangeExistence="none"
            onPassChange={(text) => setPass(text)}
          />

          <SignButton
            onClick={() => passwordChenged()}
            label="パスワードを再設定する"
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
};
