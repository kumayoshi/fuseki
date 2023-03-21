// カテゴリーの石
import stoneNormal from "../assets/images/stoneNormal.svg";
import stoneMomo from "../assets/images/stoneMomo.svg";
import stoneAka from "../assets/images/stoneAka.svg";
import stoneAomidori from "../assets/images/stoneAomidori.svg";
import stoneAsagi from "../assets/images/stoneAsagi.svg";
import stoneKi from "../assets/images/stoneKi.svg";
import stoneNone from "../assets/images/stoneNone.svg";

// 表示テキスト判別
export const memoTextLengthLimit = (text, maxTextLength) => {
  if (text.length > maxTextLength) {
    text = text.substring(0, maxTextLength) + "...";
  }
  return text;
};

// 日付変更
export const dateFormatCombert = (date) => {
  const year = date.getFullYear();
  const month = ("00" + (date.getMonth() + 1)).slice(-2);
  const day = ("00" + date.getDate()).slice(-2);
  return `${year}/${month}/${day}`;
};

// 画像の変数を配列に格納
export const categoryStoneArray = [
  stoneNormal,
  stoneMomo,
  stoneAka,
  stoneAomidori,
  stoneAsagi,
  stoneKi,
  stoneNone,
];

// 石の画像配列とカテゴリの石のデータベースをcategoryList作成時に参照し格納
export const categoryStoneImgReference = (item) => {
  let stoneImg;
  categoryStoneArray.forEach((stoneItem) => {
    const stoneArraydetermining = stoneItem.indexOf(item);
    if (stoneArraydetermining !== -1) {
      stoneImg = stoneItem;
    }
  });
  return stoneImg;
};

// メモ取得の際にカテゴリ配列から該当するカテゴリだけを検索
export const itemCategoryFind = (itemCategoryID, categoryList) => {
  return categoryList.find(
    (cateitem) => cateitem.categoryId === itemCategoryID
  );
};
