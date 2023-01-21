import React, { useState, useEffect } from "react";
import "./CommonStyles.css";
import CommonStyles from "./CommonStyles.css";
// import { auth } from "../firebase";
import Header from "../components/Header";
// import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { Navigate } from "react-router-dom";
import MemoItem from "../components/MemoItem";

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

const SignUpPage = () => {
  const MemoList = [
    {
      userId: 1,
      itemId: 1,
      title: "ここで働くということ",
      text: "ここには本文がたくさん入ります。\nデータに入れる際の改行とかどうするんだろう。",
      trigger: "ここにはメモをしようと思ったきっかけが入ります。",
      date: "2022/10/10 10:00",
      categoryId: 1,
    },
  ];

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
  const ItemCategoryFind = (ItemCategoryID) => {
    return CategoryList.categoryId === ItemCategoryID;
  };
  return (
    <div className={CommonStyles.wrap}>
      <Header currentPage="メモ一覧" user="" />
      <div style={styles.wrap}>
        <ul>
          {MemoList.map((item, index) => {
            const ItemCategory = CategoryList.find(
              ItemCategoryFind(item.categoryId)
            );
            <MemoItem
              memoText={item.title}
              stone={ItemCategory.stoneImg}
              categoryText={ItemCategory.categoryName}
              memoDate={item.date}
              key={index}
            />;
          })}
        </ul>
        <a href={"/article/"}>新規メモ作成ページへ</a>
        <a href={"/auth/"}>アカウント設定ページへ</a>
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
};
