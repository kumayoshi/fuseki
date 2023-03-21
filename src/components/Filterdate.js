import React from "react";
import FilterDisable from "./FilterDisable";

import modalArrow from "../assets/images/modal_arw.svg";
import modalClose from "../assets/images/modal_close.svg";

const FilterDate = ({
  categoryList,
  filterCategoryChanged,
  modalType,
  filterYearChanged,
  filterYearLabel,
  filterMonthChanged,
  filterClose,
}) => {
  if (modalType === "category") {
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
  } else if (modalType === "date") {
    return (
      <div style={styles.findModalIn}>
        <i style={styles.modalClose} onClick={() => filterClose()}>
          <img src={modalClose} alt="" />
        </i>
        <div style={styles.findModalDateList}>
          <label style={styles.findModalDateItem}>
            <span style={styles.findModalDateItemText}>年</span>
            <select
              name="filteryear"
              style={styles.findModalDateItemSelect}
              onChange={(label) => filterYearChanged(label)}
            >
              <option value="-">-</option>
              <option value="2022">2022</option>
              <option value="2023">2023</option>
            </select>
          </label>
          <label
            name="filtermonth"
            style={
              filterYearLabel !== "-"
                ? styles.findModalDateItem
                : styles.findModalDateItemDisable
            }
            onChange={(label) => filterMonthChanged(label)}
          >
            <span style={styles.findModalDateItemText}>月</span>
            <select
              style={
                filterYearLabel !== "-"
                  ? styles.findModalDateItemSelect
                  : styles.findModalDateItemSelectDisable
              }
            >
              <option value="-">-</option>
              <option value="10">10</option>
              <option value="11">11</option>
              <option value="12">12</option>
            </select>
          </label>
        </div>
        <FilterDisable filterYearChanged={filterYearChanged} label={"date"} />
        <i style={styles.findModalInArwDate}>
          <img src={modalArrow} alt="" />
        </i>
      </div>
    );
  }
};

export default FilterDate;

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
  findModalDateList: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  findModalDateItem: {
    width: "46%",
    display: "flex",
    alignItems: "center",
  },
  findModalDateItemDisable: {
    width: "46%",
    display: "flex",
    alignItems: "center",
    opacity: "0.4",
  },
  findModalDateItemText: {
    color: "rgba(67,67,67,0.5)",
    fontSize: "3.3vw",
    marginRight: "2vw",
  },
  findModalDateItemSelect: {
    boxSizing: "border-box",
    padding: "2vw 0",
    textAlign: "center",
    borderRadius: "1.5vw",
    border: "1px solid rgba(67,67,67,0.5)",
    width: "100%",
  },
  findModalDateItemSelectDisable: {
    boxSizing: "border-box",
    padding: "2vw 0",
    textAlign: "center",
    borderRadius: "1.5vw",
    border: "1px solid rgba(67,67,67,0.5)",
    width: "100%",
    pointerEvents: "none",
  },
};
