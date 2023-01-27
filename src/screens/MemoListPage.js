import React, { useState, useEffect } from "react";
import "./CommonStyles.css";
import CommonStyles from "./CommonStyles.css";
// import { auth } from "../firebase";
import Header from "../components/Header";
// import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { Navigate } from "react-router-dom";
import MemoItem from "../components/MemoItem";
import MemoFilter from "../components/MemoFilter";
// 各カテゴエリー石の画像
import Stone from "../assets/images/stone.png";
import StoneMomo from "../assets/images/stone_momo.png";
import StoneAka from "../assets/images/stone_aka.png";
import StoneAomidori from "../assets/images/stone_aomidori.png";
import StoneAsagi from "../assets/images/stone_asagi.png";
import StoneKi from "../assets/images/stone_ki.png";

const SignUpPage = () => {
  // メモ一覧の記事データベース
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
    {
      userId: 1,
      itemId: 2,
      title: "言語は人を分断し結合する",
      text: "分けることもできれば、結束を生むこともできる",
      trigger: "超相対性理論を聞いてのメモ",
      date: "2023/1/27 10:00",
      categoryId: 5,
    },
  ];

  // 各登録済みカテゴリのデータベース
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

  const date = [
    {
      userId: 1,
      year: ["2022", "2023"],
      month: {
        2022: ["10", "11", "12"],
        2023: ["1"],
      },
    },
  ];

  // メモ取得の際にカテゴリを検索
  const ItemCategoryFind = (ItemCategoryID) => {
    return CategoryList.find(
      (cateitem) => cateitem.categoryId === ItemCategoryID
    );
  };

  // 検索時のdate内 userId検索
  // const ItemCategoryFind = (ItemCategoryID) => {
  //   return CategoryList.find(
  //     (cateitem) => cateitem.categoryId === ItemCategoryID
  //   );
  // };

  return (
    <div className={CommonStyles.wrap}>
      <Header currentPage="メモ一覧" user="" />
      <div style={styles.wrap}>
        <ul>
          {MemoList.map((item, index) => {
            const ItemCategory = ItemCategoryFind(item.categoryId);
            return (
              <MemoItem
                memoText={item.title}
                stone={ItemCategory.stoneImg}
                categoryText={ItemCategory.categoryName}
                memoDate={item.date}
                key={index}
              />
            );
          })}
        </ul>
        <a href={"/article/"}>新規メモ作成ページに</a>
        <a href={"/auth/"}>アカウント設定ページへ</a>

        <MemoFilter />
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
    margin: "25vw auto 0",
    width: "79%",
    borderRadius: "10px",
  },
};
