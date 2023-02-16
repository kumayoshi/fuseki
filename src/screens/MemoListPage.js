import React, { useState, useEffect } from "react";
import "./CommonStyles.css";
import CommonStyles from "./CommonStyles.css";
import Header from "../components/Header";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { Navigate } from "react-router-dom";
import MemoItem from "../components/MemoItem";
import MemoFilter from "../components/MemoFilter";
import stoneShadow from "../assets/images/stone_shadow.svg";
import newArticle from "../assets/images/newMemo.svg";
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

  // 絞り込みモーダルのタイプ
  const [modalType, setModalType] = useState("none"); // none , date , category
  const modalTypeChanged = (type) => {
    type === modalType ? setModalType("none") : setModalType(type);
  };
  // 絞り込みモーダルの閉じるボタンを押した際の動き
  const filterClose = () => {
    setModalType("none");
  };

  // filter後の配列　保存用のステート
  const [memoListChaged, setMemoListChaged] = useState(memoList);
  // category絞り込み時の石の画像保存用変数
  const [filterCategoryImg, setFilterCategoryImg] = useState(stoneShadow);
  // category絞り込み時のID
  const [filterCategoryId, setFilterCategoryId] = useState(stoneShadow);
  // 画像下部の絞り込みバー　日付部分変更保存用変数
  const [filterYearText, setFilterYearText] = useState("年/月");
  // 日付絞り込み時の日付保存用変数
  const [filterYearLabel, setFilterYearLabel] = useState("-");

  // カテゴリを選択した際
  const filterCategoryChanged = (currentCategoryId) => {
    if (currentCategoryId !== "none") {
      let memoListChangeSeconds = memoList.filter(
        (memoListItem) => memoListItem.categoryId === currentCategoryId
      );
      // -----日付がすでに絞り込まれていた場合
      if (!isNaN(filterYearLabel)) {
        memoListChangeSeconds = memoListChangeSeconds.filter(
          (memoListItem) => memoListItem.date.indexOf(filterYearText) !== -1
        );
        setMemoListChaged(memoListChangeSeconds);
      }
      setMemoListChaged(memoListChangeSeconds);

      // -----画面下部の絞り込みウィンドウのカテゴリー画像の変更
      const setFilterCategoryCurrentItem = categoryList.find(
        (categoryItem) => categoryItem.categoryId === currentCategoryId
      );
      setFilterCategoryImg(setFilterCategoryCurrentItem.stoneImg);
      setFilterCategoryId(setFilterCategoryCurrentItem.categoryId);
    } else {
      // -----カテゴリ　　「指定しない」　を選択した場合
      modalTypeChanged("none");
      setFilterCategoryImg(stoneShadow);
      setMemoListChaged(memoList);
      setFilterCategoryId("");
    }
  };
  // date絞り込み
  const filterDateDisable = () => {
    modalTypeChanged("none");
    setFilterYearText("年/月");
    setFilterYearLabel("-");
    setMemoListChaged(memoList);
    setFilterCategoryId("");
  };

  // 年、月で絞り込み関数
  const filterDateAble = (label) => {
    let filterMemoList = memoList.filter(
      (memoListItem) => memoListItem.date.indexOf(label) !== -1
    );
    // カテゴリがすでに絞り込まれている場合カテゴリidで絞り込む
    if (!isNaN(filterCategoryId)) {
      filterMemoList = filterMemoList.filter(
        (memoListItem) => memoListItem.categoryId === filterCategoryId
      );
    }
    setFilterYearText(label);
    setMemoListChaged(filterMemoList);
  };

  // -----年を選択した際
  const filterYearChanged = (item) => {
    if (item !== "none") {
      const yearValue = item.target.value;
      setFilterYearLabel(yearValue);
      filterDateAble(yearValue);
    } else {
      filterDateDisable();
    }
  };

  // -----月を選択した際
  const filterMonthChanged = (item) => {
    if (item !== "none") {
      const monthValue = filterYearLabel + "/" + item.target.value;
      filterDateAble(monthValue);
    } else {
      filterDateDisable();
    }
  };

  // memoListChagedが変更された場合描画し直す
  useEffect(() => {
    return;
  }, [memoListChaged]);

  const [user, setUser] = useState("");
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, []);

  return (
    <div className={CommonStyles.wrap}>
      <Header currentPage="メモ一覧" user={user} />
      <div style={styles.wrap}>
        <ul>
          {memoListChaged.map((item, index) => {
            const itemCategory = itemCategoryFind(item.categoryId);
            return (
              <MemoItem
                memoText={item.title}
                stone={itemCategory.stoneImg}
                categoryText={itemCategory.categoryName}
                articleId={item.itemId}
                memoDate={item.date}
                key={index}
              />
            );
          })}
        </ul>
        <div style={styles.newArticle}>
          <a style={styles.newArticleLink} href={"/article/new"}>
            <img src={newArticle} alt="" />
          </a>
        </div>
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
          filterClose={() => filterClose()}
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
  newArticle: {
    position: "fixed",
    right: "0",
    bottom: "40vw",
    width: "16vw",
    height: "16vw",
    backgroundColor: "#fff",
    borderRadius: "8px 0 0 8px",
    boxShadow: "rgb(0 0 0 / 16%) 0px 3px 5px",
  },
  newArticleLink: {
    display: "block",
    width: "100%",
    height: "100%",
  },
};
