import React from "react";
import { Link } from "react-router-dom";

const MemoItem = ({ memoText, stone, categoryText, memoDate, articleId }) => {
  return (
    <li style={styles.itemWrap}>
      <Link style={styles.itemWrapIn} to={"/article/" + articleId}>
        <p style={styles.itemTitleWrap}>
          <i style={styles.categoryStone}>
            <img src={stone} alt="" />
          </i>
          <span style={styles.itemTitle}>{memoText}</span>
        </p>
        <div style={styles.infoWrap}>
          <p style={styles.categoryText}>
            {categoryText !== "" ? (
              <span style={styles.categoryTagItem}>{categoryText}</span>
            ) : (
              ""
            )}
          </p>
          <p style={styles.dateText}>{memoDate}</p>
        </div>
      </Link>
    </li>
  );
};

export default MemoItem;

const styles = {
  itemWrap: {
    borderRadius: "3vw",
    background: "#fff",
    marginTop: "2.5vw",
  },
  itemWrapIn: {
    display: "block",
    boxSizing: "border-box",
    padding: "2vw 4vw 3vw 2vw",
    color: "initial",
  },
  itemTitleWrap: {
    display: "flex",
    alignItems: "center",
  },
  itemTitle: {
    fontWeight: "bold",
    width: "100%",
    color: "#434343",
  },
  categoryStone: {
    minWidth: "8vw",
    width: "8vw",
    marginRight: "3%",
    padding: "0vw 1.5vw 2.5vw 1.5vw",
    boxSizing: "border-box",
  },
  infoWrap: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "3vw",
  },
  categoryText: {
    color: "rgba(67,67,67,0.5)",
    fontSize: "3.3vw",
    paddingLeft: "3vw",
  },
  categoryTagItem: {
    display: "inline-block",
    marginRight: "2vw",
    boxSizing: "border-box",
    padding: "0px 7px",
    borderRadius: "4px",
    letterSpacing: "0.05em",
    border: "1px solid rgba(67, 67, 67, 0.4)",
  },
  dateText: {
    color: "rgba(67,67,67,0.5)",
    fontSize: "3.3vw",
    textAlign: "right",
  },
};
