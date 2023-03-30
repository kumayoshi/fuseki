import React from "react";

const ArticleText = ({ text, onChange }) => {
  const placeHolderText = [
    "今のあなたは今しか書き残すことはできません。",
    "未来の自分の布石-fuseki-としてお使いください。",
    "いまの気持ちをそのまま恐れずにお書きください。",
    "書くことに、いま感じたことに正しい正しくないなんてありません。",
    "そのままのあなたの悩みも気持ちも未来のあなたが受け止めてくれます。",
    "いつか変わるあなたの人生の布石-fuseki-として今の気持ちをここに...",
  ];
  const getPlaceHolderText = () => {
    const num = Math.floor(Math.random() * placeHolderText.length);
    return placeHolderText[num];
  };
  return (
    <label style={styles.textareaWrap}>
      {text === "" || !text ? (
        <p style={styles.placeholder}>{getPlaceHolderText()}</p>
      ) : (
        ""
      )}
      <textarea
        id="itemText"
        name="itemText"
        style={styles.text}
        value={text}
        onChange={onChange}
      ></textarea>
    </label>
  );
};

export default ArticleText;

const styles = {
  text: {
    background: "#fff",
    boxSizing: "border-box",
    padding: "7vw 5vw",
    width: "100vw",
    margin: "20vw calc(50% - 50vw) 0",
    display: "block",
    minHeight: "80vw",
    lineHeight: "2em",
    letterSpacing: "0.1em",
    fontSize: "4vw",
  },
  placeholder: {
    position: "absolute",
    top: "7vw",
    left: "0",
    opacity: "0.3",
    letterSpacing: "0.06em",
    fontSize: "4vw",
  },
  textareaWrap: {
    display: "block",
    position: "relative",
    top: "0",
    left: "0",
  },
};
