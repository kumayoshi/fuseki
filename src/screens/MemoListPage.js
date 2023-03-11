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
// images
import stoneShadow from "../assets/images/stone_shadow.svg";
import newArticle from "../assets/images/newMemo.svg";
import stoneNormal from "../assets/images/stoneNormal.svg";
import stoneMomo from "../assets/images/stoneMomo.svg";
import stoneAka from "../assets/images/stoneAka.svg";
import stoneAomidori from "../assets/images/stoneAomidori.svg";
import stoneAsagi from "../assets/images/stoneAsagi.svg";
import stoneKi from "../assets/images/stoneKi.svg";
import stoneNone from "../assets/images/stoneNone.svg";

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

  // 表示テキスト判別
  const memoTextCheck = (doc) => {
    let text = doc.data().title ? doc.data().title : doc.data().text;
    if (text.length > 40) {
      text = text.substring(0, 40) + "...";
    }
    return text;
  };
  // 日付変更
  const dateFormatCombert = (date) => {
    const y = date.getFullYear();
    const m = ("00" + (date.getMonth() + 1)).slice(-2);
    const d = ("00" + date.getDate()).slice(-2);
    return `${y}/${m}/${d}`;
  };
  // メモ一覧の記事データベース
  const memoGetFunc = async (userID) => {
    const memoQuery = query(
      collection(db, "memoList"),
      where("userId", "==", userID)
    );
    await getDocs(memoQuery).then((querySnapshot) => {
      const memoStoringArray = [];
      querySnapshot.docs.map((doc, index) => {
        return (memoStoringArray[index] = {
          itemId: doc.id,
          text: memoTextCheck(doc),
          trigger: doc.data().trigger,
          userId: doc.data().userId,
          date: dateFormatCombert(doc.data().date.toDate()),
          categoryId: doc.data().categoryId,
        });
      });
      setMemoList(memoStoringArray);
      setMemoListChaged(memoStoringArray);
    });
  };

  // 画像の変数を配列に格納
  const categoryStoneArray = [
    stoneNormal,
    stoneMomo,
    stoneAka,
    stoneAomidori,
    stoneAsagi,
    stoneKi,
    stoneNone,
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
    const categoryListStoring = [];
    await getDocs(categoryQuery).then((querySnapshot) => {
      querySnapshot.docs.map((doc, index) => {
        return (categoryListStoring[index] = {
          categoryId: doc.id,
          categoryName:
            doc.data().categoryName === "-" ? "" : doc.data().categoryName,
          stoneImg: categoryStoneImgReference(doc.data().stoneImg),
        });
      });
      setCategoryList(categoryListStoring);
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

  // ログイン監視、メモ・カテゴリー読み込み関数群
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        navigate("/");
      }
      setUser(currentUser);
      memoGetFunc(currentUser.uid);
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
              const itemCategory = itemCategoryFind(item.categoryId);
              return (
                <MemoItem
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
