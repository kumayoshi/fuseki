import React, { useState, useEffect } from "react";
// style
import "../assets/css/CategoryListStyle.css";
import CommonStyles from "../assets/css/CommonStyles.css";
// component
import Header from "../components/Header";
import Button from "../components/Articlebutton";
import AccountDeleteModal from "../components/AccountDeleteModal";
import UserInformationChengeModal from "../components/UserInformationChengeModal";
// library
import { useNavigate } from "react-router-dom";
// firebase
import {
  signOut,
  onAuthStateChanged,
  deleteUser,
  getAuth,
  updateEmail,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from "firebase/auth";
import { auth, db } from "../firebase";
import {
  doc,
  updateDoc,
  collection,
  getDocs,
  query,
  where,
  deleteDoc,
} from "firebase/firestore";
// images
import stoneNormal from "../assets/images/stoneNormal.svg";
import stoneMomo from "../assets/images/stoneMomo.svg";
import stoneAka from "../assets/images/stoneAka.svg";
import stoneAomidori from "../assets/images/stoneAomidori.svg";
import stoneAsagi from "../assets/images/stoneAsagi.svg";
import stoneKi from "../assets/images/stoneKi.svg";
import stoneNone from "../assets/images/stoneNone.svg";

const AuthPage = () => {
  const [iconActive, setIconActive] = useState(false);

  // カテゴリを格納する変数
  const [categoryList, setCategoryList] = useState([]);
  // カテゴリの石画像に関する変数
  let categoryStoneStoring;
  const stoneImg = [
    stoneMomo,
    stoneKi,
    stoneAomidori,
    stoneAka,
    stoneNormal,
    stoneAsagi,
    stoneNone,
  ];
  // mailaddress,passwordを格納する変数
  const [mailaddress, setMailaddress] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState("");
  // authと照合したuserlistのdocを格納
  const [userlistItem, setUserlistItem] = useState("");
  // アカウント削除の確認用モーダルウィンドウフラッグ
  const [accountDeleteModal, setAccountDeleteModal] = useState(false);
  // アカウント情報を変更した際にmailaddress,passwordを格納する変数
  const [newMailaddress, setNewMailaddress] = useState("");
  const [newPassword, setNewPassword] = useState("");
  // アカウント情報のモーダルのテキスト
  const [discriptionText, setDiscriptionText] = useState("");
  // アカウント情報のモーダル表示フラッグ
  const [informationUpdateModalType, setInformationUpdateModalType] =
    useState("none");
  // navigate
  const navigate = useNavigate();
  // カテゴリ
  // -----------categoryList格納時に画像srcと照合する
  const getCategoryStone = (src) => {
    stoneImg.forEach((item) => {
      if (item.indexOf(src) !== -1) {
        categoryStoneStoring = item;
        return true;
      }
    });
    return categoryStoneStoring;
  };
  // カテゴリーデータベースの並び替え
  const categoryListSort = (categoryListArray) => {
    let categoryListStoring = categoryListArray.sort(function (a, b) {
      if (a.categorySortIndex > b.categorySortIndex) {
        return 1;
      } else {
        return -1;
      }
    });
    setCategoryList(categoryListStoring);
  };
  // -----------表示の際にカテゴリの取得
  const getCategory = async () => {
    const todoQuery = query(collection(db, "categoryList"));
    await getDocs(todoQuery).then((querySnapshot) => {
      const categoryListStoring = [];
      querySnapshot.docs.map((doc, index) => {
        const { categoryName, stoneImg, categorySortIndex } = doc.data();
        return (categoryListStoring[index] = {
          id: doc.id,
          categoryName: categoryName,
          stoneImg: getCategoryStone(stoneImg),
          categorySortIndex: categorySortIndex,
        });
      });
      categoryListSort(categoryListStoring);
    });
  };

  // メールアドレス、パスワード
  const getAccountInformation = async (currentUser) => {
    const userUid = currentUser.uid;
    const userQuery = query(
      collection(db, "userList"),
      where("signInUserId", "in", [userUid])
    );
    await getDocs(userQuery).then((querySnapshot) => {
      let userlistItemStoring = [];
      querySnapshot.docs.forEach((doc) => {
        setMailaddress(doc.data().mailadress);
        setPassword(doc.data().password);
        userlistItemStoring = {
          id: doc.id,
        };
      });
      setUserlistItem(userlistItemStoring);
    });
  };

  // ログイン監視
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        navigate("/");
      } else {
        setUser(currentUser);
        getAccountInformation(currentUser);
      }
    });
    getCategory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // ログアウト
  const LogOut = async () => {
    await signOut(auth);
    navigate("/");
  };

  // アカウント削除
  // -----------アカウントを削除するかの確認モーダル
  const accountSwitchDeleteModal = () => {
    accountDeleteModal
      ? setAccountDeleteModal(false)
      : setAccountDeleteModal(true);
  };
  const accountDeleteModalCancel = () => {
    setAccountDeleteModal(false);
  };
  // -----------ユーザ削除
  const accountUserListDelete = async () => {
    deleteDoc(doc(db, "userList", userlistItem.id));
  };
  // -----------ユーザに関するメモを削除
  const accountDelete = () => {
    const auth = getAuth();
    const willDeleteUser = auth.currentUser;
    deleteUser(willDeleteUser)
      .then(() => {
        // userlistから該当するユーザを削除
        accountUserListDelete();
        navigate("/");
      })
      .catch((error) => {
        // 失敗すればアラート
        const errorCode = error.code;
        const errorMessage = error.message;
        alert("errorCode:" + errorCode, "errorMessage:" + errorMessage, "222");
      });
  };

  // アカウント情報変更
  // -----------モーダルウィンドウ内の「戻る」を押した際の処理
  useEffect(() => {
    if (informationUpdateModalType === "mail") {
      setDiscriptionText(
        "メールアドレスの変更をします。\n新しいメールアドレスを入力してください。"
      );
    } else if (informationUpdateModalType === "password") {
      setDiscriptionText(
        "パスワードの変更をします。\n新しいパスワードを入力してください。"
      );
    }
  }, [informationUpdateModalType]);
  // -----------モーダルウィンドウ内の「戻る」を押した際の処理
  const informationUpdateSwitchCancel = () => {
    setInformationUpdateModalType("none");
  };
  // -----------パスワード変更
  const onPasswordChange = () => {
    const updateUser = getAuth().currentUser;
    const credential = EmailAuthProvider.credential(mailaddress, password);
    reauthenticateWithCredential(updateUser, credential)
      .then(() => {
        updatePassword(updateUser, newPassword)
          .then(() => {
            const reference = doc(db, "userList", userlistItem.id);
            updateDoc(reference, {
              password: newPassword,
            });
            setPassword(newPassword);
            setInformationUpdateModalType("none");
          })
          .catch((error) => {
            console.log(error.message);
          });
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  // -----------メールアドレス変更
  const onEmailAddressChange = () => {
    const updateUser = getAuth().currentUser;
    const credential = EmailAuthProvider.credential(mailaddress, password);
    reauthenticateWithCredential(updateUser, credential).then(() => {
      updateEmail(updateUser, newMailaddress)
        .then(() => {
          const reference = doc(db, "userList", userlistItem.id);
          updateDoc(reference, {
            mailadress: newMailaddress,
          });
          setMailaddress(newMailaddress);
          setInformationUpdateModalType("none");
        })
        .catch((error) => {
          console.log(error.message);
        });
    });
  };
  // -----------アカウント情報偏光ボタンをクリックした際の処理
  const updateInfomation = () => {
    if (informationUpdateModalType === "mail") {
      onEmailAddressChange();
    } else if (informationUpdateModalType === "password") {
      onPasswordChange();
    }
  };

  return (
    <div className={CommonStyles.wrap}>
      <Header currentPage="アカウントの設定" user={user} />
      <div style={styles.wrap}>
        <div>
          <div>
            <h2 style={styles.itemTitle}>メールアドレス</h2>
            <input
              type="text"
              value={mailaddress}
              style={styles.itemContent}
              readOnly
            />
            <p
              onClick={() => setInformationUpdateModalType("mail")}
              style={styles.itemAttention}
            >
              メールアドレスの変更
            </p>
          </div>
          <div style={styles.bottomBlock}>
            <h2 style={styles.itemTitle}>パスワード</h2>
            <input
              type="password"
              value={password}
              style={styles.itemContent}
              readOnly
            />
            <p
              onClick={() => setInformationUpdateModalType("password")}
              style={styles.itemAttention}
            >
              パスワードの変更
            </p>
          </div>
          <div style={styles.bottomBlock}>
            <h2 style={styles.itemTitle}>カテゴリ</h2>
            <ul className={"categorylist"}>
              {categoryList.map((item, index) => {
                return (
                  <li className={"categorylistItem"} key={index}>
                    <p className={"categorylistItemText"}>
                      {item.categoryName}
                    </p>
                    <i
                      onClick={() => setIconActive(!iconActive)}
                      className={"categorylistItemIcon"}
                    >
                      <img src={item.stoneImg} alt="" />
                    </i>
                  </li>
                );
              })}
            </ul>
          </div>

          <Button
            onClick={() => LogOut()}
            text={"ログアウト"}
            styleName={styles.signOutButton}
          ></Button>

          <Button
            onClick={() => accountSwitchDeleteModal()}
            text={"アカウント削除"}
            styleName={styles.accountDeleteButton}
          ></Button>
        </div>
      </div>

      <AccountDeleteModal
        modalFlug={accountDeleteModal}
        cancel={() => accountDeleteModalCancel()}
        accountDelete={() => accountDelete()}
      />

      <UserInformationChengeModal
        modalFlug={informationUpdateModalType}
        onMailChange={(text) => setNewMailaddress(text)}
        onPassChange={(text) => setNewPassword(text)}
        desciptionText={discriptionText}
        cancel={() => informationUpdateSwitchCancel()}
        updateInfomation={() => updateInfomation()}
      />
    </div>
  );
};

export default AuthPage;

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
    paddingBottom: "20vw",
  },
  itemTitle: {
    color: "rgba(67,67,67,0.4)",
    fontSize: "3vw",
  },
  itemContent: {
    width: "100vw",
    margin: "0 calc(50% - 50vw)",
    padding: "5vw 13% 4vw",
    boxSizing: "border-box",
    fontSize: "4vw",
    marginTop: "1vw",
    fontWeight: "bold",
    background: "#fff",
    pointerEvents: "none",
  },
  bottomBlock: {
    marginTop: "9vw",
  },
  itemAttention: {
    margin: "0 calc(50% - 50vw)",
    fontSize: "3vw",
    marginTop: "1vw",
    padding: "0 3vw",
    textAlign: "right",
  },
  signOutButton: {
    width: "49vw",
    margin: "16vw auto 0px",
    display: "block",
    padding: "2vw 0",
    boxSizing: "border-box",
    textAlign: "center",
    fontSize: "4vw",
    fontWeight: "bold",
    border: "1vw solid #F27855",
    color: "#F27855",
    borderRadius: "8px",
    background: "#fff",
  },
  accountDeleteButton: {
    width: "49vw",
    margin: "7vw auto 0px",
    display: "block",
    padding: "2vw 0",
    boxSizing: "border-box",
    textAlign: "center",
    fontSize: "4vw",
    fontWeight: "bold",
    border: "1vw solid #F27855",
    color: "#fff",
    borderRadius: "8px",
    background: "#F27855",
  },
};
