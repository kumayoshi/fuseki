import React, { useState, useEffect } from "react";
import "./CommonStyles.css";
import "./CategoryListStyle.css";
import CommonStyles from "./CommonStyles.css";
// import { auth } from "../firebase";
import Header from "../components/Header";
// import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { Navigate } from "react-router-dom";

import Stone from "../assets/images/stone.png";
import StoneMomo from "../assets/images/stone_momo.png";
import StoneAka from "../assets/images/stone_aka.png";
import StoneAkacha from "../assets/images/stone_akacha.png";
import StoneAkaki from "../assets/images/stone_akaki.png";
import StoneAo from "../assets/images/stone_ao.png";
import StoneAomidori from "../assets/images/stone_aomidori.png";
import StoneAsagi from "../assets/images/stone_asagi.png";
import StoneCha from "../assets/images/stone_cha.png";
import StoneKi from "../assets/images/stone_ki.png";
import StoneKimidori from "../assets/images/stone_kimidori.png";
import StoneKoke from "../assets/images/stone_koke.png";
import StoneOrange from "../assets/images/stone_orange.png";
import StoneOre from "../assets/images/stone_ore.png";
import StonePurple from "../assets/images/stone_purple.png";
import StoneSinku from "../assets/images/stone_sinku.png";
import StoneUsuki from "../assets/images/stone_usuki.png";
import StoneUsumomo from "../assets/images/stone_usumomo.png";

const AuthPage = () => {
  const [iconActive, setIconActive] = useState(false);

  const CategoryList = [
    {
      categoryId: 1,
      categoryName: "それ素敵",
      categoryItem: 0,
      stoneImg: StoneMomo,
    },
    {
      categoryId: 2,
      categoryName: "これから",
      categoryItem: 0,
      stoneImg: StoneAsagi,
    },
    {
      categoryId: 3,
      categoryName: "日々をつぶやく",
      categoryItem: 0,
      stoneImg: Stone,
    },
    {
      categoryId: 4,
      categoryName: "ふと思う",
      categoryItem: 0,
      stoneImg: StoneAomidori,
    },
    {
      categoryId: 5,
      categoryName: "この瞬間をしたためる",
      categoryItem: 0,
      stoneImg: StoneKi,
    },
    {
      categoryId: 6,
      categoryName: "どこにも言えないこの気持ち",
      categoryItem: 0,
      stoneImg: StoneAka,
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

  return (
    <div className={CommonStyles.wrap}>
      <Header currentPage="アカウントの設定" user="" />
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
