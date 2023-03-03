import React, { useState, useEffect } from "react";
import "./CommonStyles.css";
import CommonStyles from "./CommonStyles.css";
import Header from "../components/Header";
import { auth, db } from "../firebase";
import {
  // doc,
  collection,
  // addDoc,
  getDocs,
  query,
  where,
  // deleteDoc,
  serverTimestamp,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import MemoItem from "../components/MemoItem";
import MemoFilter from "../components/MemoFilter";
import stoneShadow from "../assets/images/stone_shadow.svg";
import newArticle from "../assets/images/newMemo.svg";
// 各カテゴエリー石の画像
import stoneNormal from "../assets/images/stoneNormal.svg";
import stoneMomo from "../assets/images/stoneMomo.svg";
import stoneAka from "../assets/images/stoneAka.svg";
import stoneAomidori from "../assets/images/stoneAomidori.svg";
import stoneAsagi from "../assets/images/stoneAsagi.svg";
import stoneKi from "../assets/images/stoneKi.svg";

const SignUpPage = () => {
  // userDocID　記憶
  // const [userDocID, setUserDocID] = useState("");

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
  // categoryListを一旦宣言する
  const [categoryList, setCategoryList] = useState([]);
  // 絞り込みモーダルのタイプ
  const [modalType, setModalType] = useState("none"); // none , date , category
  // memolistを一旦宣言する
  const [memoList, setMemoList] = useState([]);
  // filter後の配列　保存用のステート
  const [memoListChaged, setMemoListChaged] = useState([]);

  // メモ一覧の記事データベース
  const memoGetFunc = async (userID) => {
    const memoQuery = query(
      collection(db, "memoList"),
      where("userId", "==", userID)
    );
    await getDocs(memoQuery).then((querySnapshot) => {
      const memoStoringArray = [];
      querySnapshot.docs.map((doc, index) => {
        memoStoringArray[index] = {
          itemId: doc.id,
          text: doc.data().text,
          title: doc.data().title,
          trigger: doc.data().trigger,
          userId: doc.data().userId,
          date: doc.data().date.toDate(),
          categoryId: doc.data().categoryId,
        };
      });
      setMemoList(memoStoringArray);
      setMemoListChaged(memoStoringArray);
    });
  };

  // useEffect;

  // 画像の変数を配列に格納
  const categoryStoneArray = [
    stoneNormal,
    stoneMomo,
    stoneAka,
    stoneAomidori,
    stoneAsagi,
    stoneKi,
  ];
  // 石の画像配列とカテゴリの石のデータベースをcategoryList作成時に参照し格納
  const categoryStoneImgReference = (item) => {
    let stoneImg;
    categoryStoneArray.forEach((stoneItem) => {
      const stoneArraydetermining = stoneItem.indexOf(item);
      if (stoneArraydetermining !== -1) {
        stoneImg = stoneItem;
      }
    });
    return stoneImg;
  };
  // カテゴリー一覧の記事データベース
  const memoCategoryGetFunc = async () => {
    const categoryQuery = query(collection(db, "categoryList"));
    await getDocs(categoryQuery).then((querySnapshot) => {
      querySnapshot.docs.map((doc, index) => {
        categoryList[index] = {
          categoryId: doc.id,
          categoryName: doc.data().categoryName,
          stoneImg: categoryStoneImgReference(doc.data().stoneImg),
        };
      });
    });
  };
  // メモ取得の際にカテゴリ配列から該当するカテゴリだけを検索
  const itemCategoryFind = (itemCategoryID) => {
    return categoryList.find(
      (cateitem) => cateitem.categoryId === itemCategoryID
    );
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

  // カテゴリと石の画像配列の称号

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

  useEffect(() => {
    // const authAsync = async () => {
    //   await onAuthStateChanged(auth, (currentUser) => {
    //     setUser(currentUser);
    //     memoCategoryGetFunc();
    //     memoGetFunc(currentUser?.uid);
    //   });
    // };
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      memoGetFunc(currentUser.uid);
    });
    memoCategoryGetFunc();
  }, []);
  // 重複分解消
  // useEffect(() => {
  //   // 表示するメモ各脳変数の重複分を削除
  //   // setMemoListChaged(memoList);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [memoList]);

  return (
    <div className={CommonStyles.wrap}>
      <Header currentPage="メモ一覧" user={user} />
      <div style={styles.wrap}>
        <ul>
          {memoListChaged &&
            memoListChaged.map((item, index) => {
              const itemCategory = itemCategoryFind(item.categoryId);
              return (
                <MemoItem
                  memoText={item.title}
                  stone={itemCategory.stoneImg}
                  categoryText={itemCategory.categoryName}
                  articleId={item.itemId}
                  // memoDate={item.date}
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
