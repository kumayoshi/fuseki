import React, { useState, useEffect } from "react";
import "./CommonStyles.css";
import CommonStyles from "./CommonStyles.css";
// import { auth } from "../firebase";
import Header from "../components/Header";
// import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { Navigate } from "react-router-dom";
import MemoItem from "../components/MemoItem";
import MemoFilter from "../components/MemoFilter";
import stoneShadow from "../assets/images/stone_shadow.svg";
// 各カテゴエリー石の画像
import stone from "../assets/images/stone.svg";
import stoneMomo from "../assets/images/stone_momo.svg";
import stoneAka from "../assets/images/stone_aka.svg";
import stoneAomidori from "../assets/images/stone_aomidori.svg";
import stoneAsagi from "../assets/images/stone_asagi.svg";
import stoneKi from "../assets/images/stone_ki.svg";

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

  // filter後の配列　保存用のステート
  const [memoListChaged, setMemoListChaged] = useState(memoList);
  // category絞り込み時の石の画像保存用変数
  const [filterCategoryImg, setFilterCategoryImg] = useState(stoneShadow);
  // 画像下部の絞り込みバー　日付部分変更保存用変数
  const [filterYearText, setFilterYearText] = useState("年/月");
  // 日付絞り込み時の日付保存用変数
  const [filterYearLabel, setFilterYearLabel] = useState("-");
  const filterCategoryChanged = (currentCategoryId) => {
    if (currentCategoryId !== "none") {
      if (!isNaN(filterYearLabel)) {
        if (filterCategoryImg.indexOf("_shadow") !== -1) {
          setMemoListChaged(
            memoListChaged.filter(
              (memoListItem) => memoListItem.categoryId === currentCategoryId
            )
          );
        } else if (filterCategoryImg.indexOf("_shadow") === -1) {
          let memoListChangeSeconds = memoList.filter(
            (memoListItem) => memoListItem.categoryId === currentCategoryId
          );
          memoListChangeSeconds = memoListChangeSeconds.filter(
            (memoListItem) => memoListItem.date.indexOf(filterYearText) !== -1
          );
          setMemoListChaged(memoListChangeSeconds);
        }
      } else {
        setMemoListChaged(
          memoList.filter(
            (memoListItem) => memoListItem.categoryId === currentCategoryId
          )
        );
      }
      const setFilterCategoryCurrentItem = categoryList.find(
        (categoryItem) => categoryItem.categoryId === currentCategoryId
      );
      setFilterCategoryImg(setFilterCategoryCurrentItem.stoneImg);
    } else {
      modalTypeChanged("none");
      setFilterCategoryImg(stoneShadow);
      setMemoListChaged(memoList);
    }
  };
  // date絞り込み
  const filterDateDisable = () => {
    modalTypeChanged("none");
    setFilterYearText("年/月");
    setFilterYearLabel("-");
    setMemoListChaged(memoList);
  };
  // let filterMemoList = [];
  const filterDateAble = (label) => {
    const filterMemoList = memoList.filter(
      (memoListItem) => memoListItem.date.indexOf(label) !== -1
    );
    // if (filterCategoryImg.indexOf("_shadow") === -1) {
    //   filterMemoList = filterMemoList.filter(
    //     (memoListItem) => memoListItem.categoryId === currentCategoryId
    //   );
    // }
    setFilterYearText(label);
    setMemoListChaged(filterMemoList);
  };

  // -----------年
  const filterYearChanged = (item) => {
    if (item !== "none") {
      const yearValue = item.target.value;
      setFilterYearLabel(yearValue);
      filterDateAble(yearValue);
    } else {
      filterDateDisable();
    }
  };

  // -----------月
  const filterMonthChanged = (item) => {
    if (item !== "none") {
      const monthValue = filterYearLabel + "/" + item.target.value;
      filterDateAble(monthValue);
    } else {
      filterDateDisable();
    }
  };

  useEffect(() => {
    return;
  }, [memoListChaged]);

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
          filterCategoryImg={filterCategoryImg}
          filterCategoryChanged={(item) => filterCategoryChanged(item)}
          filterYearText={filterYearText}
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
