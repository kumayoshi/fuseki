import React from "react";

const Header = ({ memoText, stone, categoryText, memoDate }) => {
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

export default Header;

const styles = {
  ItemWrap: {
    borderRadius: "5px",
    background: "#fff",
    boxSizing: "border-box",
    padding: "10px",
  },
};
