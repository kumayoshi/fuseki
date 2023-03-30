import React from "react";
import FilterDisable from "./FilterDisable";

import modalArrow from "../assets/images/modal_arw.svg";
import modalClose from "../assets/images/modal_close.svg";

const FilterCategory = ({
  categoryList,
  filterCategoryChanged,
  filterClose,
}) => {
  return (
    <div style={styles.findModalIn}>
      <i style={styles.modalClose} onClick={() => filterClose()}>
        <img src={modalClose} alt="" />
      </i>
      <div style={styles.findModalCategoryList}>
        {categoryList.map((item, index) => {
          if (index <= 3) {
            return (
              <button
                style={styles.findModalCategoryItem}
                onClick={() => filterCategoryChanged(item.categoryId)}
                key={index}
              >
                <img src={item.stoneImg} alt="" />
              </button>
            );
          } else {
            return (
              <button
                style={styles.findModalCategoryItembottom}
                onClick={() => filterCategoryChanged(item.categoryId)}
                key={index}
              >
                <img src={item.stoneImg} alt="" />
              </button>
            );
          }
        })}
      </div>
      <FilterDisable
        filterCategoryChanged={filterCategoryChanged}
        label={"category"}
      />
      <i style={styles.findModalInArwCategory}>
        <img src={modalArrow} alt="" />
      </i>
    </div>
  );
};

export default FilterCategory;

const styles = {
  findModalIn: {
    position: "relative",
    top: "0",
    left: "0",
    boxSizing: "border-box",
    padding: "12vw 8vw 8vw 8vw",
  },
  modalClose: {
    position: "absolute",
    top: "6%",
    right: "5%",
    width: "5vw",
    height: "5vw",
    display: "block",
  },
  findModalInArwDate: {
    position: "absolute",
    bottom: "-6vw",
    right: "15vw",
    width: "8vw",
  },
  findModalCategoryList: {
    display: "flex",
    flexWrap: "wrap",
  },
  findModalCategoryItem: {
    width: "21%",
    padding: "4vw 3vw",
    marginRight: "4%",
    position: "relative",
    top: "0",
    left: "0",
    background: "#fff",
    borderRadius: "1.5vw",
    border: "1px solid rgba(67,67,67,0.5)",
  },
  findModalCategoryItembottom: {
    width: "21%",
    padding: "4vw 3vw",
    marginRight: "4%",
    marginTop: "3vw",
    position: "relative",
    top: "0",
    left: "0",
    background: "#fff",
    borderRadius: "1.5vw",
    border: "1px solid rgba(67,67,67,0.5)",
  },
  findModalInArwCategory: {
    position: "absolute",
    bottom: "-6vw",
    left: "15vw",
    width: "8vw",
  },
};
