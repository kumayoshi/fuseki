import React, { useState, useEffect } from "react";
// style
import "./CommonStyles.css";
import "./CategoryListStyle.css";
import CommonStyles from "./CommonStyles.css";
// component
import Header from "../components/Header";
import Button from "../components/Articlebutton";
import AccountDeleteModal from "../components/AccountDeleteModal";
// react-router-dom
import { useNavigate } from "react-router-dom";
// firebase
import { signOut, onAuthStateChanged, deleteUser } from "firebase/auth";
import { auth, db } from "../firebase";
import {
  collection,
  getDocs,
  query,
  where,
  doc,
  deleteDoc,
} from "firebase/firestore";
// images
import stoneNormal from "../assets/images/stoneNormal.svg";
import stoneMomo from "../assets/images/stoneMomo.svg";
import stoneAka from "../assets/images/stoneAka.svg";
import stoneAkacha from "../assets/images/stone_akacha.svg";
import stoneAkaki from "../assets/images/stone_akaki.svg";
import stoneAo from "../assets/images/stone_ao.svg";
import stoneAomidori from "../assets/images/stoneAomidori.svg";
import stoneAsagi from "../assets/images/stoneAsagi.svg";
import stoneCha from "../assets/images/stone_cha.svg";
import stoneKi from "../assets/images/stoneKi.svg";
import stoneKimidori from "../assets/images/stone_kimidori.svg";
import stoneKoke from "../assets/images/stone_koke.svg";
import stoneOrange from "../assets/images/stone_orange.svg";
import stoneOre from "../assets/images/stone_ore.svg";
import stonePurple from "../assets/images/stone_purple.svg";
import stoneSinku from "../assets/images/stone_sinku.svg";
import stoneUsuki from "../assets/images/stone_usuki.svg";
import stoneUsumomo from "../assets/images/stone_usumomo.svg";

const AuthPage = () => {
  const [iconActive, setIconActive] = useState(false);

  // const stoneImgs = [
  //   Stone,
  //   StoneMomo,
  //   StoneAka,
  //   StoneAkacha,
  //   StoneAkaki,
  //   StoneAo,
  //   StoneAomidori,
  //   StoneAsagi,
  //   StoneCha,
  //   StoneKimidori,
  //   StoneKoke,
  //   StoneOrange,
  //   StoneOre,
  //   StonePurple,
  //   StoneSinku,
  //   StoneUsuki,
  //   StoneUsumomo,
  // ];

  // カテゴリを格納する変数
  const [categoryList, setCategoryList] = useState([]);
  // 各脳されたカテゴリから重複分を削除したものを各脳する変数
  const [uniqueCategoryList, setUniqueCategoryList] = useState([]);
  // カテゴリの石画像に関する変数
  let categoryStoneStoring;
  const stoneImg = [
    stoneMomo,
    stoneKi,
    stoneAomidori,
    stoneAka,
    stoneNormal,
    stoneAsagi,
  ];
  // mailaddress,passwordを各脳する変数
  const [mailaddress, setMailaddress] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState("");
  // アカウント削除の確認用モーダルウィンドウフラッグ
  const [accountDeleteModal, setAccountDeleteModal] = useState(false);

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
  // -----------表示の際にカテゴリの取得
  const getCategory = async () => {
    const todoQuery = query(collection(db, "categoryList"));
    await getDocs(todoQuery).then((querySnapshot) => {
      const categoryListStoring = [];
      querySnapshot.docs.map((doc, index) => {
        categoryListStoring[index] = {
          id: doc.id,
          categoryName: doc.data().categoryName,
          stoneImg: getCategoryStone(doc.data().stoneImg),
        };
        // setCategoryList((beforeCategoryList) => [
        //   ...beforeCategoryList,
        //   {
        //     id: doc.id,
        //     categoryName: doc.data().categoryName,
        //     stoneImg: getCategoryStone(doc.data().stoneImg),
        //   },
        // ]);
      });
      setCategoryList(categoryListStoring);
    });
  };

  // メールアドレス、パスワード
  const getAccountInformation = async (currentUser) => {
    const userQuery = query(
      collection(db, "userList"),
      where("signInUserId", "==", currentUser.uid)
    );
    await getDocs(userQuery).then((querySnapshot) => {
      querySnapshot.docs.map((doc) => {
        setMailaddress(doc.data().mailaddress);
        setPassword(doc.data().password);
      });
    });
  };

  // categoryListの重複分の解消
  // useEffect(() => {
  //   setUniqueCategoryList(
  //     Array.from(
  //       new Map(
  //         categoryList.map((categoryItem) => [categoryItem.id, categoryItem])
  //       ).values()
  //     )
  //   );
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [categoryList]);

  // ログイン監視
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      getAccountInformation(currentUser);
    });
    getCategory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // ログアウト
  const navigate = useNavigate();
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
    const deleteUserQuery = query(
      collection(db, "userList"),
      where("signInUserId", "==", user.uid)
    );
    await getDocs(deleteUserQuery).then((querySnapshot) => {
      querySnapshot.docs.map((doc) => {
        console.log("ユーザリストから", doc.id, "を削除します。");
        // deleteDoc(doc(db, "userList", doc.id));
      });
    });
  };
  // -----------ユーザに関するメモを削除
  const accountMemoListDelete = async () => {
    // const batch = db.batch();
    const deleteMemoListQuery = query(
      collection(db, "memoList"),
      where("userId", "==", user.uid)
    );
    await getDocs(deleteMemoListQuery).then((querySnapshot) => {
      querySnapshot.docs.map((doc) => {
        console.log(
          "メモリストから",
          doc.id,
          doc.data().title,
          "を削除します。"
        );
        // batch.delete(doc.ref);
      });
    });
  };
  // -----------ユーザに関するメモを削除
  const accountDelete = () => {
    // deleteUser(user)
    //   .then(() => {
    // userlistから該当するユーザを削除
    // accountUserListDelete();
    // memolistから該当するメモを削除
    accountMemoListDelete();
    // })
    // .catch((error) => {
    //   console.log("error : ", error);
    // });
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
            {/* <p style={styles.itemAttention}><a href={}>メールアドレスの変更</a></p> */}
          </div>
          <div style={styles.bottomBlock}>
            <h2 style={styles.itemTitle}>パスワード</h2>
            <input
              type="password"
              value={password}
              style={styles.itemContent}
              readOnly
            />
            {/* <p style={styles.itemAttention}><a href={}>パスワードの変更</a></p> */}
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

          {/* <li className={"categorylistItem"} key={index}>
            <p className={"categorylistItemText"}>
              {CategoryItem.categoryName}
            </p>
            <i
              onClick={() => setIconActive(!iconActive)}
              className={
                iconActive
                  ? "categorylistItemIcon active"
                  : "categorylistItemIcon"
              }
            >
              <img src={CategoryItem.stoneImg} alt="" />
            </i>
          </li> */}
          {/* <div
            className={
              iconActive
                ? "categorylistItemModal active"
                : "categorylistItemModal none"
            }
          >
            <ul>
              {stoneImgs.map((stoneImg, index) => (
                <li key={index}>
                  <img src={stoneImg} alt="" />
                </li>
              ))}
            </ul>
          </div> */}

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
