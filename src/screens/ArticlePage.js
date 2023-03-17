import React, { useState, useEffect } from "react";
// style
import CommonStyles from "../assets/css/CommonStyles.css";
// firebase
import Header from "../components/Header";
import { auth, db } from "../firebase";
import {
  doc,
  collection,
  addDoc,
  updateDoc,
  getDocs,
  getDoc,
  query,
  deleteDoc,
  serverTimestamp,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
// component
import ArticleTitle from "../components/ArticleTitle";
import ArticleText from "../components/ArticleText";
import ArticleTrigger from "../components/ArticleTrigger";
import ArticleCategory from "../components/ArticleCategory";
import Articlebutton from "../components/Articlebutton";
import ArticleDeleteComfirm from "../components/ArticleDeleteComfirm";
// library
import { useParams, useNavigate } from "react-router-dom";
// images
import backArrow from "../assets/images/backArrow.svg";
// import stoneNormal from "../assets/images/stoneNormal.svg";
// import stoneMomo from "../assets/images/stoneMomo.svg";
// import stoneAka from "../assets/images/stoneAka.svg";
// import stoneAomidori from "../assets/images/stoneAomidori.svg";
// import stoneAsagi from "../assets/images/stoneAsagi.svg";
// import stoneKi from "../assets/images/stoneKi.svg";
// import stoneNone from "../assets/images/stoneNone.svg";

const ArticlePage = () => {
  // useNavigateの変数
  const navigate = useNavigate();
  // ログインしているユーザ
  const [user, setUser] = useState("");
  // カテゴリリスト格納用の変数
  const [categoryList, setCategoryList] = useState([]);
  // 読み込み時id参照
  const params = useParams();
  // 読み込み時id格納用の変数
  const [memoParams, setMemoParams] = useState([]);
  // 取得したメモのreferens
  const [memoItemRef, setMemoItemRef] = useState([]);
  // 取得したメモの記事格納用変数
  const [memoItem, setMemoItem] = useState([]);
  // 各項目記憶用の変数
  const [itemTitle, setItemTitle] = useState("");
  const [itemText, setItemText] = useState("");
  const [itemTrigger, setItemTrigger] = useState("");
  const [itemCategory, setItemCategory] = useState("");
  // 記事削除確認モーダル表示非表示フラッグ
  const [itemDeleteModal, setItemDeleteModal] = useState(false);

  // 該当記事取得
  const setMemoItemStoring = async (memoItemId) => {
    if (memoItemId !== "new") {
      const docRef = doc(db, "memoList", memoItemId);
      setMemoItemRef(docRef);
      const docSnap = await getDoc(docRef);
      setMemoItem({
        text: docSnap.data().text,
        title: docSnap.data().title,
        trigger: docSnap.data().trigger,
        categoryId: docSnap.data().categoryId,
      });
    }
    setMemoParams(memoItemId);
  };

  // カテゴリーデータベースの並び替え
  const categoryListSort = (categoryListArray) => {
    let categoryListStoring = categoryListArray.sort(function (a, b) {
      if (a.categorySortIndex > b.categorySortIndex) {
        return 1;
      } else {
        return -1;
      }
    });
    setCategoryList(categoryListStoring);
  };
  // カテゴリー一覧の記事データベース
  const memoCategoryGetFunc = async () => {
    const categoryQuery = query(collection(db, "categoryList"));
    let categoryListArray = [];
    await getDocs(categoryQuery).then((querySnapshot) => {
      querySnapshot.docs.map((doc, index) => {
        return (categoryListArray[index] = {
          categoryId: doc.id,
          categoryName: doc.data().categoryName,
          categorySortIndex: doc.data().categorySortIndex,
        });
      });
    });
    categoryListSort(categoryListArray);
  };
  // 読み込み時すでに入力されている項目に入力しておく
  useEffect(() => {
    setItemTitle(memoItem.title !== "無題" ? memoItem.title : "");
    setItemText(memoItem.text);
    setItemTrigger(memoItem.trigger);
    setItemCategory(memoItem.categoryId);
  }, [memoItem]);
  // category の変更関数
  const itemCategoryChanged = (item) => {
    setItemCategory(item.target.value);
  };
  // 既存メモの内容更新
  const memoItemUpdate = async () => {
    try {
      await updateDoc(memoItemRef, {
        text: itemText,
        title: itemTitle ? itemTitle : "無題",
        trigger: itemTrigger,
        categoryId: itemCategory,
      });
      navigate("/memolist/");
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };
  // メモ新規作成
  const memoCreate = async () => {
    try {
      await addDoc(collection(db, "memoList"), {
        text: itemText ? itemText : "",
        title: itemTitle ? itemTitle : "無題",
        trigger: itemTrigger ? itemTrigger : "",
        date: serverTimestamp(),
        categoryId: itemCategory ? itemCategory : "n3TrqVLKqtdVhWxvK59r",
        userId: user.uid,
      });
      navigate("/memolist/");
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };
  // 保存ボタンクリック時の処理
  const buttonSave = () => {
    if (memoParams !== "new") {
      memoItemUpdate();
    } else {
      memoCreate();
    }
  };
  // 削除確認モーダル表示
  const buttonDeleteComfirm = () => {
    itemDeleteModal ? setItemDeleteModal(false) : setItemDeleteModal(true);
  };
  // 削除確認モーダル非表示
  const buttonDeleteComfirmCancel = () => {
    setItemDeleteModal(false);
  };
  // 削除処理実行
  const memoItemDelete = () => {
    deleteDoc(doc(db, "memoList", memoItem.itemId));
    navigate("/memolist/");
  };
  const buttonDelete = () => {
    memoItemDelete();
  };
  // ログイン監視、メモ・カテゴリー読み込み関数群
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        navigate("/");
      }
      setUser(currentUser);
    });
    memoCategoryGetFunc();
    if (params.id !== "new") {
      setMemoItemStoring(params.id);
    } else {
      setMemoItemStoring("new");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={CommonStyles.wrap}>
      <Header currentPage="新規メモ" user={user} />
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
            text="保存"
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
