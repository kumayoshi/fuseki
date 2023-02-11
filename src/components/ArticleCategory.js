import React, { useState } from "react";

const ArticleCategory = ({ itemCategory, onChange, categoryList }) => {
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
        カテゴリ
        <span style={styles.labelIconWrap}>
          <span style={styles.labelIconWrapIn}>
            <i style={flug ? styles.non : styles.labelIconVertical}></i>
            <i style={styles.labelIconHorizontal}></i>
          </span>
        </span>
      </label>
      <select
        name="articleCategory"
        id=""
        onChange={(item) => onChange(item)}
        style={flug ? styles.input : styles.non}
      >
        {categoryList.map((categoryItem, index) => {
          const categoryItemId = categoryItem.categoryId;
          return (
            <option value={categoryItemId} key={index}>
              {categoryItem.categoryName}
            </option>
            // <option value={categoryItemId} key={index} {categoryItemId === itemCategory && "selected"} >
            //   {categoryItem.categoryName}
            // </option>
          );
        })}
      </select>
    </div>
  );
};

export default ArticleCategory;

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
    background: "none",
    border: "none",
    backgroundColor: "#fff",
    boxSizing: "border-box",
    padding: "3vw 5vw",
    width: "100vw",
    margin: "0 calc(50% - 50vw)",
    display: "block",
  },
};
