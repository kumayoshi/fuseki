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
import ArticleDeleteComfirm from "../components/ArticleDeleteComfirm";

// import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { useParams } from "react-router-dom";

import backArrow from "../assets/images/backArrow.svg";

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
  let itemId = "";
  let item = "";
  const [itemTitle, setItemTitle] = useState("");
  const [itemText, setItemText] = useState("");
  const [itemTrigger, setItemTrigger] = useState("");
  const [itemCategory, setItemCategory] = useState("");
  useEffect(() => {
    if (params.id !== "new") {
      itemId = parseInt(params.id, 10);
      item = memoList.find((memoItem) => memoItem.itemId === itemId);
      setItemTitle(item.title);
      setItemText(item.text);
      setItemTrigger(item.trigger);
      setItemCategory(item.categoryId);
    }
  }, []);
  const itemCategoryChanged = (item) => {
    setItemCategory(item.target.value);
  };

  const [itemDeleteModal, setItemDeleteModal] = useState(false);
  const buttonSave = () => {
    console.log("保存しました");
  };
  const buttonDeleteComfirm = () => {
    itemDeleteModal ? setItemDeleteModal(false) : setItemDeleteModal(true);
  };
  const buttonDeleteComfirmCancel = () => {
    setItemDeleteModal(false);
  };
  const buttonDelete = () => {
    console.log("削除しました");
  };

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
            onClick={() => buttonDeleteComfirm()}
          />
        </div>
        <div style={styles.backArrow}>
          <a style={styles.backArrowLink} href={"/memolist/"}>
            <img src={backArrow} alt="" />
          </a>
        </div>
        <ArticleDeleteComfirm
          itemDeleteModal={itemDeleteModal}
          buttonDeleteComfirmCancel={() => buttonDeleteComfirmCancel()}
          buttonDelete={() => buttonDelete()}
        />
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
    padding: "2vw 0",
    boxSizing: "border-box",
    textAlign: "center",
    fontSize: "4vw",
    fontWeight: "bold",
    border: "1vw solid #5bcbcb",
    color: "#fff",
    borderRadius: "8px",
    background: "#5bcbcb",
  },
  delete: {
    width: "49vw",
    margin: "6vw auto 0px",
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
  backArrow: {
    position: "fixed",
    left: "0",
    bottom: "20vw",
    width: "16vw",
    height: "16vw",
    backgroundColor: "#fff",
    borderRadius: "0 8px 8px 0",
    boxShadow: "rgb(0 0 0 / 16%) 0px 3px 5px",
  },
  backArrowLink: {
    display: "block",
    width: "100%",
    height: "100%",
    boxSizing: "border-box",
    padding: "3vw",
  },
};
