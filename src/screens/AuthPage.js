import React, { useState, useEffect } from "react";
import "./CommonStyles.css";
import "./CategoryListStyle.css";
import CommonStyles from "./CommonStyles.css";
import { auth } from "../firebase";
import Header from "../components/Header";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";

import stone from "../assets/images/stone.svg";
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

  const CategoryList = [
    {
      categoryId: 1,
      categoryName: "それ素敵",
      categoryItem: 0,
      stoneImg: stoneMomo,
    },
    {
      categoryId: 2,
      categoryName: "これから",
      categoryItem: 0,
      stoneImg: stoneAsagi,
    },
    {
      categoryId: 3,
      categoryName: "日々をつぶやく",
      categoryItem: 0,
      stoneImg: stone,
    },
    {
      categoryId: 4,
      categoryName: "ふと思う",
      categoryItem: 0,
      stoneImg: stoneAomidori,
    },
    {
      categoryId: 5,
      categoryName: "この瞬間をしたためる",
      categoryItem: 0,
      stoneImg: stoneKi,
    },
    {
      categoryId: 6,
      categoryName: "どこにも言えないこの気持ち",
      categoryItem: 0,
      stoneImg: stoneAka,
    },
  ];

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
  // ログイン監視
  const [user, setUser] = useState("");
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, []);
  // ログアウト
  const navigate = useNavigate();
  const LogOut = async () => {
    await signOut(auth);
    navigate("/");
  };

  return (
    <div className={CommonStyles.wrap}>
      <Header currentPage="アカウントの設定" user={user} />
      <div style={styles.wrap}>
        <div>
          <div>
            <h2 style={styles.itemTitle}>メールアドレス</h2>
            <p style={styles.itemContent}>yyy@example.com</p>
            {/* <p style={styles.itemAttention}><a href={}>メールアドレスの変更</a></p> */}
          </div>
          <div style={styles.bottomBlock}>
            <h2 style={styles.itemTitle}>パスワード</h2>
            <p style={styles.itemContent}>・・・・・・・・・</p>
            {/* <p style={styles.itemAttention}><a href={}>パスワードの変更</a></p> */}
          </div>
          <div style={styles.bottomBlock}>
            <h2 style={styles.itemTitle}>カテゴリ</h2>
            <ul className={"categorylist"}>
              {CategoryList.map((CategoryItem, index) => (
                <li className={"categorylistItem"} key={index}>
                  <p className={"categorylistItemText"}>
                    {CategoryItem.categoryName}
                  </p>
                  <i
                    onClick={() => setIconActive(!iconActive)}
                    className={"categorylistItemIcon"}
                  >
                    <img src={CategoryItem.stoneImg} alt="" />
                  </i>
                </li>
              ))}
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

          <button onClick={() => LogOut()}>ログアウト</button>
        </div>
      </div>
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
};
