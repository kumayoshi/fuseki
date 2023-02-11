import React, { useState, useEffect } from "react";
import "./CommonStyles.css";
import CommonStyles from "./CommonStyles.css";
// import { auth } from "../firebase";
import Header from "../components/Header";
import ArticleTitle from "../components/ArticleTitle";
import ArticleText from "../components/ArticleText";
import ArticleTrigger from "../components/ArticleTrigger";
import ArticleCategory from "../components/ArticleCategory";
import Articlebutton from "../components/Articlebutton";

// import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { Navigate, useParams } from "react-router-dom";

import stone from "../assets/images/stone.svg";
import stoneMomo from "../assets/images/stone_momo.svg";
import stoneAka from "../assets/images/stone_aka.svg";
import stoneAomidori from "../assets/images/stone_aomidori.svg";
import stoneAsagi from "../assets/images/stone_asagi.svg";
import stoneKi from "../assets/images/stone_ki.svg";

const ArticlePage = () => {
  // メモ一覧の記事データベース
  const memoList = [
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
      date: "2023/10/27 10:00",
      categoryId: 5,
    },
    {
      userId: 1,
      itemId: 3,
      title: "遊びとは自由であることだ",
      text: "遊びとは自由であることだ。そこにタスクや目的がたされてしまうと仕事になってしまう。",
      trigger: "超相対性理論を聞いてのメモ",
      date: "2023/11/27 10:00",
      categoryId: 3,
    },
    {
      userId: 1,
      itemId: 3,
      title:
        "仕事を楽しんでやっているという人は自由に生きるリテラシーを持っている",
      text: "遊びとは自由であることだ。そこにタスクや目的がたされてしまうと仕事になってしまう。",
      trigger: "超相対性理論を聞いてのメモ",
      date: "2023/12/27 10:00",
      categoryId: 4,
    },
  ];

  // 各登録済みカテゴリのデータベース
  const categoryList = [
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

  // 読み込み時id参照
  const params = useParams();
  const itemId = parseInt(params.id, 10);
  const item = memoList.find((memoItem) => memoItem.itemId === itemId);
  const [itemTitle, setItemTitle] = useState(item.title);
  const [itemText, setItemText] = useState(item.text);
  const [itemTrigger, setItemTrigger] = useState(item.trigger);
  const [itemCategory, setItemCategory] = useState(item.categoryId);
  const itemCategoryChanged = (item) => {
    setItemCategory(item.target.value);
  };
  useEffect(() => {
    console.log("itemTitle : ", itemTitle);
    console.log("itemText : ", itemText);
    console.log("itemTrigger : ", itemTrigger);
    console.log("itemCategory : ", itemCategory);
  }, [itemTitle, itemText, itemTrigger, itemCategory]);

  const buttonSave = () => {};

  const buttonDelete = () => {};

  return (
    <div className={CommonStyles.wrap}>
      <Header currentPage="新規メモ" user="" />
      <div style={styles.wrap}>
        <ArticleText
          text={itemText}
          onChange={(e) => setItemText(e.target.value)}
        />
        <ArticleTrigger
          text={itemTrigger}
          onChange={(e) => setItemTrigger(e.target.value)}
        />
        <ArticleTitle
          text={itemTitle}
          onChange={(e) => setItemTitle(e.target.value)}
        />
        <ArticleCategory
          itemCategory={itemCategory}
          categoryList={categoryList}
          onChange={(item) => itemCategoryChanged(item)}
        />
        <div style={styles.buttonWrap}>
          <Articlebutton
            text="確定"
            styleName={styles.save}
            onClick={() => buttonSave()}
          />
          <Articlebutton
            text="削除"
            styleName={styles.delete}
            onClick={() => buttonDelete()}
          />
        </div>
        <a href={"/memolist/"}>メモ一覧ページへ</a>
      </div>
    </div>
  );
};

export default ArticlePage;

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
    paddingBottom: "10vw",
    margin: "38vw auto 0",
    width: "90%",
  },
  buttonWrap: {
    marginTop: "20vw",
  },
  save: {
    width: "49vw",
    margin: "11vw auto 0px",
    display: "block",
    padding: "3vw 0",
    boxSizing: "border-box",
    textAlign: "center",
    fontSize: "4vw",
    fontWeight: "bold",
    border: "2px solid #5bcbcb",
    color: "#fff",
    borderRadius: "8px",
    background: "#5bcbcb",
  },
  delete: {
    width: "49vw",
    margin: "6vw auto 0px",
    display: "block",
    padding: "3vw 0",
    boxSizing: "border-box",
    textAlign: "center",
    fontSize: "4vw",
    fontWeight: "bold",
    border: "2px solid #F27855",
    color: "#F27855",
    borderRadius: "8px",
    background: "#fff",
  },
  deleteIn: {
    width: "49vw",
    margin: "11vw auto 0px",
    display: "block",
    padding: "3vw 0",
    boxSizing: "border-box",
    textAlign: "center",
    fontSize: "4vw",
    fontWeight: "bold",
    border: "2px solid #F27855",
    color: "#F27855",
    borderRadius: "8px",
    background: "#5bcbcb",
  },
};
