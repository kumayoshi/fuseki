import React, { useState } from "react";

const ArticleTitle = ({ text, onChange }) => {
  const [flug, setFlug] = useState(false);
  const itemViewToggle = () => {
    if (flug === true) {
      setFlug(false);
    } else if (flug === false) {
      setFlug(true);
    }
  };

  return (
    <div style={styles.wrap}>
      <label
        style={styles.label}
        htmlFor="itemTrigger"
        onClick={() => itemViewToggle()}
      >
        タイトル
        <span style={styles.labelIconWrap}>
          <span style={styles.labelIconWrapIn}>
            <i
              style={flug === false ? styles.labelIconVertical : styles.non}
            ></i>
            <i style={styles.labelIconHorizontal}></i>
          </span>
        </span>
      </label>
      <textarea
        id="itemTrigger"
        name="itemTrigger"
        style={flug === true ? styles.input : styles.non}
        value={text}
        placeholder="40文字以内であれば一覧ページにタイトル全文表示させられます。&#13;なので気持ちの整理ができたときにメモに名前をつけてあげてください。"
        onChange={onChange}
      ></textarea>
    </div>
  );
};

export default ArticleTitle;

const styles = {
  wrap: {
    marginTop: "10vw",
  },
  label: {
    display: "block",
    fontSize: "3.8vw",
    fontWeight: "bold",
    marginBottom: "5vw",
    position: "relative",
    top: "0",
    left: "0",
  },
  non: {
    display: "none",
  },
  labelIconWrap: {
    position: "absolute",
    top: "0",
    right: "0",
    display: "block",
    width: "5vw",
    height: "5vw",
  },
  labelIconWrapIn: {
    position: "relative",
    top: "0",
    right: "0",
    display: "block",
    width: "100%",
    height: "100%",
  },
  labelIconVertical: {
    position: "absolute",
    top: "0",
    left: "44%",
    width: "0.4vw",
    height: "100%",
    background: "#434343",
  },
  labelIconHorizontal: {
    position: "absolute",
    top: "46%",
    left: "0",
    width: "100%",
    height: "0.4vw",
    background: "#434343",
  },
  input: {
    background: "#fff",
    boxSizing: "border-box",
    padding: "7vw 5vw",
    width: "100vw",
    margin: "0 calc(50% - 50vw)",
    display: "block",
    minHeight: "42vw",
    lineHeight: "2em",
  },
};
