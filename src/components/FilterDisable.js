import React from "react";

const FilterDisable = ({ filterCategoryChanged, filterYearChanged, label }) => {
  return (
    <button
      onClick={
        label === "category"
          ? () => filterCategoryChanged("none")
          : () => filterYearChanged("none")
      }
      style={styles.findModalFilterNonButton}
    >
      指定しない
    </button>
  );
};

export default FilterDisable;

const styles = {
  findModalFilterNonButton: {
    display: "block",
    margin: "6vw auto 0px",
    background: "#fff",
    borderRadius: "1.5vw",
    border: "1px solid rgba(67,67,67,0.5)",
    boxSizing: "border-box",
    padding: "2vw 12vw",
    textAlign: "center",
  },
};
