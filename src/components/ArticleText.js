import React from "react";

const ArticleText = ({ text, onChange }) => {
  return (
    <textarea
      id="itemText"
      name="itemText"
      style={styles.text}
      value={text}
      onChange={onChange}
    ></textarea>
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
  },
};
