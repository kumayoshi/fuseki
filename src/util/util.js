// 表示テキスト判別
export const memoTextLengthLimit = (text, maxTextLength) => {
  if (text.length > maxTextLength) {
    text = text.substring(0, maxTextLength) + "...";
  }
  return text;
};
