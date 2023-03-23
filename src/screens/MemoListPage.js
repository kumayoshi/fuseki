import React, { useState, useEffect } from "react";
// style
import CommonStyles from "../assets/css/CommonStyles.css";
// firebase
import { auth, db } from "../firebase";
import {
  // doc,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
// library
import { useNavigate } from "react-router-dom";
// component
import Header from "../components/Header";
import MemoItem from "../components/MemoItem";
import MemoFilter from "../components/MemoFilter";
import {
  memoTextLengthLimit,
  dateFormatCombert,
  categoryStoneImgReference,
  itemCategoryFind,
} from "../utils/MemoProcess";
// 新しい記事追加ボタンの
import newArticle from "../assets/images/newMemo.svg";
// カテゴリ絞り込みの初期画像
import stoneShadow from "../assets/images/stone_shadow.svg";

const SignUpPage = () => {
  // ログインしているユーザ
  const [user, setUser] = useState("");
  // category絞り込み時の石の画像保存用変数
  const [filterCategoryImg, setFilterCategoryImg] = useState(stoneShadow);
  // category絞り込み時のID
  const [filterCategoryId, setFilterCategoryId] = useState(stoneShadow);
  // 画像下部の絞り込みバー　日付部分変更保存用変数
  const [filterYearText, setFilterYearText] = useState("年/月");
  // 日付絞り込み時の日付保存用変数
  const [filterYearLabel, setFilterYearLabel] = useState("-");
  // 日付絞り込み時の日付保存用変数
  const [filterYearArray, setFilterYearArray] = useState([]);
  // categoryListを一旦宣言する
  const [categoryList, setCategoryList] = useState([]);
  // 絞り込みモーダルのタイプ
  const [modalType, setModalType] = useState("none"); // none , date , category
  // memolistを一旦宣言する
  const [memoList, setMemoList] = useState([]);
  // filter後の配列　保存用のステート
  const [memoListChaged, setMemoListChaged] = useState([]);
  // navigate
  const navigate = useNavigate();

  // メモ一覧の記事データベース
  const setMemoArray = async (userID) => {
    const memoQuery = query(
      collection(db, "memoList"),
      where("userId", "==", userID)
    );
    await getDocs(memoQuery).then((querySnapshot) => {
      const getMemoArray = [];
      querySnapshot.docs.map((doc, index) => {
        const { title, text, date, categoryId } = doc.data();
        return (getMemoArray[index] = {
          itemId: doc.id,
          title: memoTextLengthLimit(title, 32),
          text: memoTextLengthLimit(text, 40),
          date: dateFormatCombert(date.toDate()),
          categoryId: categoryId,
        });
      });
      setMemoList(getMemoArray);
      setMemoListChaged(getMemoArray);
    });
  };
  // カテゴリー一覧の記事データベース
  const memoCategoryGetFunc = async () => {
    const categoryQuery = query(collection(db, "categoryList"));
    const categoryListStoring = [];
    await getDocs(categoryQuery).then((querySnapshot) => {
      querySnapshot.docs.map((doc, index) => {
        const { categoryName, stoneImg } = doc.data();
        return (categoryListStoring[index] = {
          categoryId: doc.id,
          categoryName: categoryName === "-" ? "" : categoryName,
          stoneImg: categoryStoneImgReference(stoneImg),
        });
      });
      setCategoryList(categoryListStoring);
    });
  };
  // 絞り込みモーダルの表示切り替え
  const modalTypeChanged = (type) => {
    type === modalType ? setModalType("none") : setModalType(type);
  };
  // 絞り込みモーダルの閉じるボタンを押した際の動き
  const filterClose = () => {
    setModalType("none");
  };

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
    if (label === "-") {
      setFilterYearText("");
      if (filterCategoryImg.indexOf("stone_shadow") === -1) {
        const filterMemoList = memoList.filter(
          (memoListItem) => memoListItem.categoryId === filterCategoryId
        );
        setMemoListChaged(filterMemoList);
      } else {
        setMemoListChaged(memoList);
      }
    } else if (label !== "-") {
      if (label.indexOf("-")) {
        label = label !== "-" ? label : "";
        label = label.replace("-", "");
      }
      let filterMemoList = memoList.filter(
        (memoListItem) => memoListItem.date.indexOf(label) !== -1
      );
      console.log(filterMemoList);
      if (filterCategoryImg.indexOf("stone_shadow") === -1) {
        console.log(filterCategoryId);
        filterMemoList = filterMemoList.filter(
          (memoListItem) => memoListItem.categoryId === filterCategoryId
        );
      }
      setFilterYearText(label);
      setMemoListChaged(filterMemoList);
    }
  };

  useEffect(() => {
    console.log(memoListChaged);
  }, [memoListChaged]);

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

  // -----ユーザリストから日付データを取得
  const getDateFilter = async (userId) => {
    const userQuery = query(
      collection(db, "userList"),
      where("signInUserId", "in", [userId])
    );
    await getDocs(userQuery).then((querySnapshot) => {
      querySnapshot.docs.forEach((doc) => {
        const { filterDate } = doc.data();
        setFilterYearArray(filterDate);
      });
    });
  };

  // ログイン監視、メモ・カテゴリー読み込み関数群
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        navigate("/");
      }
      setUser(currentUser);
      setMemoArray(currentUser.uid);
      getDateFilter(currentUser.uid);
    });
    memoCategoryGetFunc();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={CommonStyles.wrap}>
      <Header currentPage="メモ一覧" user={user} />
      <div style={styles.wrap}>
        <ul>
          {memoListChaged &&
            memoListChaged.map((item, index) => {
              const itemCategory = itemCategoryFind(
                item.categoryId,
                categoryList
              );
              return (
                <MemoItem
                  memoTitle={item.title}
                  memoText={item.text}
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
          filterYearArray={filterYearArray}
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
    marginBottom: "28vw",
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
