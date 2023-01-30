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

  const [memoListChaged, SetMemoListChaged] = useState(memoList);

  // 各登録済みカテゴリのデータベース
  const categoryList = [
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

  const userList = [
    {
      userId: 1,
      email: "yyy@example.com", //メールアドレス
      password: "pass", //パスワード
      dateList: {
        year: ["2022", "2023"],
        month: [
          [10, 11, 12],
          [1, 2],
        ],
      },
      categoryList: [1, 5],
    },
    {
      userId: 2,
      email: "yyy@example.com", //メールアドレス
      password: "pass", //パスワード
      dateList: {
        year: ["2022", "2023"],
        month: [[12], [1]],
      },
      categoryList: [2, 3],
    },
  ];

  // メモ取得の際にカテゴリ配列から該当するカテゴリだけを検索
  const itemCategoryFind = (itemCategoryID) => {
    return categoryList.find(
      (cateitem) => cateitem.categoryId === itemCategoryID
    );
  };

  //
  const [modalType, setModalType] = useState("none"); // none , date , category
  const modalTypeChanged = (type) => {
    type === modalType ? setModalType("none") : setModalType(type);
  };

  // category絞り込みcategory内 categoryId検索
  // ---------- categoryId　無い場合はこの関数内でリセットする
  const categoryFilter = (currentCategoryId) => {
    if (currentCategoryId !== "none_filter") {
      const filterMemoList = memoList.filter(
        (memoListItem) => memoListItem.categoryId === currentCategoryId
      );
      SetMemoListChaged(filterMemoList);
    } else {
      modalTypeChanged("none");
      setFilterYearLabel("-");
      SetMemoListChaged(memoList);
    }
  };
  // date絞り込み
  // -----------年
  const [filterYearLabel, setFilterYearLabel] = useState("-");
  const filterYearChanged = (item) => {
    const yearValue = item.target.value;
    setFilterYearLabel(yearValue);
    const filterMemoList = memoList.filter(
      (memoListItem) => memoListItem.date.indexOf(yearValue) !== -1
    );
    SetMemoListChaged(filterMemoList);
  };

  // -----------月
  const filterMonthChanged = (item) => {
    const monthValue = filterYearLabel + "/" + item.target.value;
    const filterMemoList = memoList.filter(
      (memoListItem) => memoListItem.date.indexOf(monthValue) !== -1
    );
    SetMemoListChaged(filterMemoList);
  };

  useEffect(() => {
    return;
  }, [memoListChaged]);

  // const CategoryFilterChange = useEffect(() => {
  //   console.log();
  // },[categoryFilter]);

  return (
    <div className={CommonStyles.wrap}>
      <Header currentPage="メモ一覧" user="" />
      <div style={styles.wrap}>
        <ul>
          {memoListChaged.map((item, index) => {
            const itemCategory = itemCategoryFind(item.categoryId);
            return (
              <MemoItem
                memoText={item.title}
                stone={itemCategory.stoneImg}
                categoryText={itemCategory.categoryName}
                memoDate={item.date}
                key={index}
              />
            );
          })}
        </ul>
        <a href={"/article/"}>新規メモ作成ページに</a>
        <a href={"/auth/"}>アカウント設定ページへ</a>

        <MemoFilter
          categoryList={categoryList}
          categoryFilter={(item) => categoryFilter(item)}
          filterYearLabel={filterYearLabel}
          filterYearChanged={(label) => filterYearChanged(label)}
          filterMonthChanged={(label) => filterMonthChanged(label)}
          modalTypeChanged={(label) => modalTypeChanged(label)}
          modalType={modalType}
        />
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
