import React from "react";

const MemoItem = ({ memoText, stone, categoryText, memoDate }) => {
  console.log(22);
  return (
    <li style={styles.ItemWrap}>
      <p>
        <i>
          <img src={stone} alt="" />
        </i>
        {memoText}
      </p>
      <p>{categoryText}</p>
      <p>{memoDate}</p>
    </li>
  );
};

export default MemoItem;

const styles = {
  ItemWrap: {
    borderRadius: "5px",
    background: "#fff",
    boxSizing: "border-box",
    padding: "10px",
  },
};
