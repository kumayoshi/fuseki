import React, { useState, useEffect } from "react";
import FilterDisable from "./FilterDisable";

import { getObjectKey, getObjectValue } from "../utils/MemoProcess";

import modalArrow from "../assets/images/modal_arw.svg";
import modalClose from "../assets/images/modal_close.svg";

const FilterDate = ({
  filterYearChanged,
  filterYearLabel,
  filterMonthChanged,
  filterClose,
  filterDateArray,
  filterYear,
  filterMonth,
}) => {
  const filterKeyArray = getObjectKey(filterDateArray);
  const filterValueArray = getObjectValue(filterDateArray);
  const [monthSelect, setMonthSelect] = useState([]);
  useEffect(() => {
    if (filterYear !== "-") {
      const i = filterKeyArray.indexOf(filterYear);
      const filterMonthArray = filterValueArray[i];
      const monthList = filterMonthArray.map((item, key) => (
        <option value={item} key={key}>
          {item}
        </option>
      ));
      setMonthSelect(monthList);
    }
  }, [filterYear]);
  const yearList = filterKeyArray.map((item, key) => (
    <option value={item} key={key}>
      {item !== "0" ? item : "-"}
    </option>
  ));
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
            onChange={(item) => filterYearChanged(item)}
            defaultValue={filterYear}
          >
            {yearList}
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
            defaultValue={filterMonth}
            style={
              filterYearLabel !== "-"
                ? styles.findModalDateItemSelect
                : styles.findModalDateItemSelectDisable
            }
          >
            {monthSelect}
          </select>
        </label>
      </div>
      <FilterDisable filterYearChanged={filterYearChanged} label={"date"} />
      <i style={styles.findModalInArwDate}>
        <img src={modalArrow} alt="" />
      </i>
    </div>
  );
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
