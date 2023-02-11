import React from "react";
import { Link } from "react-router-dom";

const MemoItem = ({ memoText, stone, categoryText, memoDate, articleId }) => {
  return (
    <li style={styles.ItemWrap}>
      <Link style={styles.ItemWrapIn} to={"/article/" + articleId}>
        <p style={styles.ItemTitleWrap}>
          <i style={styles.CategoryStone}>
            <img src={stone} alt="" />
          </i>
          <span style={styles.ItemTitle}>{memoText}</span>
        </p>
        <p style={styles.CategoryText}>{categoryText}</p>
        <p style={styles.DateText}>{memoDate}</p>
      </Link>
    </li>
  );
};

export default MemoItem;

const styles = {
  ItemWrap: {
    borderRadius: "3vw",
    background: "#fff",
    marginTop: "2.5vw",
  },
  ItemWrapIn: {
    display: "block",
    boxSizing: "border-box",
    padding: "2vw 4vw 3vw 2vw",
    color: "initial",
  },
  ItemTitleWrap: {
    display: "flex",
    alignItems: "center",
  },
  ItemTitle: {
    fontWeight: "bold",
    width: "100%",
    color: "#434343",
  },
  CategoryStone: {
    minWidth: "8vw",
    width: "8vw",
    marginRight: "3%",
    padding: "0vw 1.5vw 2.5vw 1.5vw",
    boxSizing: "border-box",
  },
  CategoryText: {
    color: "rgba(67,67,67,0.5)",
    fontSize: "3.3vw",
    paddingLeft: "3vw",
  },
  DateText: {
    color: "rgba(67,67,67,0.5)",
    fontSize: "3.3vw",
    textAlign: "right",
  },
};
