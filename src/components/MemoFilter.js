import React from "react";

import FilterDate from "../components/Filterdate";

const MemoFilter = ({
  categoryList,
  filterCategoryImg,
  filterCategoryChanged,
  modalTypeChanged,
  modalType,
  filterYearText,
  filterYearChanged,
  filterYearLabel,
  filterMonthChanged,
}) => {
  // number === 3 && console.log("&&の2です");
  // number === 3 || console.log("||の3以外です");
  // console.log(number === 2);

  return (
    // 絞り込みウィンドウ　全体
    <div style={styles.findWrap}>
      {/* 絞り込みモーダル */}
      <div style={styles.findModalWrap}>
        <FilterDate
          categoryList={categoryList}
          filterCategoryChanged={filterCategoryChanged}
          modalType={modalType}
          filterYearChanged={filterYearChanged}
          filterYearLabel={filterYearLabel}
          filterMonthChanged={filterMonthChanged}
        />
      </div>
      {/* 検索ウィンドウ */}
      <div>
        <div style={styles.findButtonList}>
          <button
            style={
              filterCategoryImg.indexOf("_shadow") !== -1
                ? styles.findButton
                : styles.findButtonActive
            }
            onClick={() => modalTypeChanged("category")}
          >
            <img style={styles.findButtonImg} src={filterCategoryImg} alt="" />
          </button>
          <button
            style={
              !isNaN(filterYearLabel)
                ? styles.findButtonActive
                : styles.findButton
            }
            onClick={() => modalTypeChanged("date")}
          >
            {filterYearText}
          </button>
        </div>
        <input
          style={styles.findText}
          type="text"
          placeholder="キーワードで検索"
        />
      </div>
    </div>
  );
};

export default MemoFilter;

const styles = {
  findWrap: {
    position: "fixed",
    bottom: "0",
    left: "0",
    width: "100%",
    background: "#fafafa",
    borderRadius: "3vw 3vw 0 0",
    boxSizing: "border-box",
    padding: "4vw 6vw",
    boxShadow: "0px 5px 10px rgba(67,67,67,0.5)",
  },
  findButtonList: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "3vw",
  },
  findButton: {
    width: "48%",
    textAlign: "center",
    background: "#fff",
    boxSizing: "border-box",
    padding: "2vw 0",
    borderRadius: "1.5vw",
    color: "rgba(67,67,67,0.5)",
    fontSize: "3.6vw",
    border: "3px solid #fff",
    transition: "all .2s ease-out",
  },
  findButtonActive: {
    width: "48%",
    textAlign: "center",
    background: "#fff",
    boxSizing: "border-box",
    padding: "2vw 0",
    borderRadius: "1.5vw",
    color: "rgba(67,67,67,0.5)",
    fontSize: "3.6vw",
    transition: "all .2s ease-out",
    border: "3px solid #5BCBCB",
  },
  findButtonImg: {
    width: "20%",
  },
  findText: {
    textAlign: "center",
    boxSizing: "border-box",
    padding: "2vw 0",
    borderRadius: "1.5vw",
    color: "rgba(67,67,67,0.5)",
    fontSize: "3.6vw",
    width: "100%",
  },
  findModalWrap: {
    position: "absolute",
    bottom: "calc(100% + 3vw)",
    left: "8vw",
    width: "84vw",
    background: "#fff",
    borderRadius: "3vw",
    boxShadow: "0px 1px 4px rgba(67,67,67,0.1)",
    zIndex: "5",
  },
};
