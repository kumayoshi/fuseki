import React from "react";

import StoneShadow from "../assets/images/stone_shadow.svg";
import ModalArrow from "../assets/images/modal_arw.svg";

import Stone from "../assets/images/stone.png";
import StoneMomo from "../assets/images/stone_momo.png";
import StoneAka from "../assets/images/stone_aka.png";
import StoneAomidori from "../assets/images/stone_aomidori.png";
import StoneAsagi from "../assets/images/stone_asagi.png";
import StoneKi from "../assets/images/stone_ki.png";

const MemoFilter = ({
  categoryList,
  categoryFilterOn,
  categoryFilterNon,
  categoryModalOpen,
  modalTypeChanged,
  modalType,
}) => {
  // number === 3 && console.log("&&の2です");
  // number === 3 || console.log("||の3以外です");
  // console.log(number === 2);

  return (
    // 絞り込みウィンドウ　全体
    <div style={styles.FindWrap}>
      {/* 絞り込みモーダル */}
      <div style={styles.FindModalWrap}>
        {/* カテゴリー絞り込み */}
        {modalType === "category" && (
          <div style={styles.FindModalIn}>
            <div style={styles.FindModalCategoryList}>
              {categoryList.map((item, index) => {
                if (index <= 3) {
                  // const itemStyle = styles.FindModalCategoryItem;
                  return (
                    <button
                      style={styles.FindModalCategoryItem}
                      onClick={() => categoryFilterOn(item.categoryId)}
                      key={index}
                    >
                      <img src={item.stoneImg} alt="" />
                    </button>
                  );
                } else {
                  return (
                    <button
                      style={styles.FindModalCategoryItembottom}
                      onClick={() => categoryFilterOn(item.categoryId)}
                      key={index}
                    >
                      <img src={item.stoneImg} alt="" />
                    </button>
                  );
                }
              })}
              <button
                style={styles.FindModalCategoryItembottom}
                onClick={() => categoryFilterOn(55)}
              >
                <img src={Stone} alt="" />
              </button>
            </div>
            <button
              style={styles.FindModalFilterNonButton}
              onClick={() => modalTypeChanged("none")}
            >
              指定しない
            </button>
            <i style={styles.FindModalInArwCategory}>
              <img src={ModalArrow} alt="" />
            </i>
          </div>
        )}
        {/* 日付絞り込み */}
        {modalType === "date" && (
          <div style={styles.FindModalIn}>
            <div style={styles.FindModalDateList}>
              <label style={styles.FindModalDateItem}>
                <span style={styles.FindModalDateItemText}>年</span>
                <select style={styles.FindModalDateItemSelect}>
                  <option value="-">-</option>
                  <option value="2022">2022</option>
                  <option value="2023">2023</option>
                </select>
              </label>
              <label style={styles.FindModalDateItem}>
                <span style={styles.FindModalDateItemText}>月</span>
                <select style={styles.FindModalDateItemSelect}>
                  <option value="-">-</option>
                  <option value="10">10</option>
                  <option value="11">11</option>
                  <option value="12">12</option>
                </select>
              </label>
            </div>
            <button
              onClick={() => modalTypeChanged("none")}
              style={styles.FindModalFilterNonButton}
            >
              指定しない
            </button>
            <i style={styles.FindModalInArwDate}>
              <img src={ModalArrow} alt="" />
            </i>
          </div>
        )}
      </div>
      {/* 検索ウィンドウ */}
      <div>
        <div style={styles.FindButtonList}>
          <button
            style={styles.FindButton}
            onClick={() => modalTypeChanged("category")}
          >
            <img style={styles.FindButtonImg} src={StoneShadow} alt="" />
          </button>
          <button
            style={styles.FindButton}
            onClick={() => modalTypeChanged("date")}
          >
            年/月
          </button>
        </div>
        <input
          style={styles.FindText}
          type="text"
          placeholder="キーワードで検索"
        />
      </div>
    </div>
  );
};

export default MemoFilter;

const styles = {
  FindWrap: {
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
  FindButtonList: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "3vw",
  },
  FindButton: {
    width: "48%",
    textAlign: "center",
    background: "#fff",
    boxSizing: "border-box",
    padding: "2vw 0",
    borderRadius: "1.5vw",
    color: "rgba(67,67,67,0.5)",
    fontSize: "3.6vw",
  },
  FindButtonImg: {
    width: "20%",
  },
  FindText: {
    textAlign: "center",
    boxSizing: "border-box",
    padding: "2vw 0",
    borderRadius: "1.5vw",
    color: "rgba(67,67,67,0.5)",
    fontSize: "3.6vw",
    width: "100%",
  },
  FindModalWrap: {
    position: "absolute",
    bottom: "calc(100% + 3vw)",
    left: "8vw",
    width: "84vw",
    background: "#fff",
    borderRadius: "3vw",
    boxShadow: "0px 1px 4px rgba(67,67,67,0.1)",
    zIndex: "5",
  },
  FindModalIn: {
    position: "relative",
    top: "0",
    left: "0",
    boxSizing: "border-box",
    padding: "8vw",
  },
  FindModalInArwDate: {
    position: "absolute",
    bottom: "-6vw",
    right: "15vw",
    width: "8vw",
  },
  FindModalCategoryList: {
    display: "flex",
    flexWrap: "wrap",
  },
  FindModalCategoryItem: {
    width: "21%",
    marginRight: "4%",
    position: "relative",
    top: "0",
    left: "0",
    background: "#fff",
    borderRadius: "1.5vw",
    border: "1px solid rgba(67,67,67,0.5)",
  },
  FindModalCategoryItembottom: {
    width: "21%",
    marginRight: "4%",
    marginTop: "3vw",
    position: "relative",
    top: "0",
    left: "0",
    background: "#fff",
    borderRadius: "1.5vw",
    border: "1px solid rgba(67,67,67,0.5)",
  },
  FindModalInArwCategory: {
    position: "absolute",
    bottom: "-6vw",
    left: "15vw",
    width: "8vw",
  },
  FindModalFilterNonButton: {
    display: "block",
    margin: "6vw auto 0px",
    background: "#fff",
    borderRadius: "1.5vw",
    border: "1px solid rgba(67,67,67,0.5)",
    boxSizing: "border-box",
    padding: "2vw 12vw",
    textAlign: "center",
  },
  FindModalDateList: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  FindModalDateItem: {
    width: "46%",
    display: "flex",
    alignItems: "center",
  },
  FindModalDateItemText: {
    color: "rgba(67,67,67,0.5)",
    fontSize: "3.3vw",
    marginRight: "2vw",
  },
  FindModalDateItemSelect: {
    boxSizing: "border-box",
    padding: "2vw 0",
    textAlign: "center",
    borderRadius: "1.5vw",
    border: "1px solid rgba(67,67,67,0.5)",
    width: "100%",
  },
};
