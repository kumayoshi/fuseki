import React, { useState, useEffect } from "react";
// style
import CommonStyles from "../assets/css/CommonStyles.css";
// firebase
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
// library
import { useNavigate } from "react-router-dom";
// component
import Header from "../components/Header";
import OnbordContent from "../components/OnbordContent";
import OnbordNav from "../components/OnbordNav";
// images
import onbord3 from "../assets/images/onbord_3.svg";
import onbord2 from "../assets/images/onbord_2.svg";
import onbord1 from "../assets/images/onbord_1.svg";

const OnBord = () => {
  // オンボーディングの画像切り替え用の変数
  const contentArray = [onbord1, onbord2, onbord3];
  const contentArrayLength = contentArray.length - 1;
  const [contentCurrent, setContentCurrent] = useState(0);
  const [onbordNavActive, setOnbordNavActive] = useState(0);
  // nanigate用の変数
  const navigate = useNavigate();
  // オンボーディングの画像とナビ画像の切り替え
  const onbordNavChange = (index) => {
    setContentCurrent(index);
    setOnbordNavActive(index);
  };
  // ログイン監視
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        navigate("/");
      }
    });
  }, []);

  return (
    <div className={CommonStyles.wrap} style={styles.base}>
      <Header currentPage="オンボーディング" user="" />
      <div style={styles.wrap}>
        <OnbordContent
          contentSrc={contentArray[contentCurrent]}
          contentCurrent={contentCurrent}
          contentArrayLength={contentArrayLength}
        />
        <ul style={styles.navList}>
          {contentArray.map((item, index) => (
            <OnbordNav
              key={index}
              style={styles.navItem}
              navIndex={index}
              onbordNavActive={onbordNavActive}
              onClick={(index) => onbordNavChange(index)}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default OnBord;

const styles = {
  base: {
    width: "100vw",
    height: "100vh",
    background: "#fafafa",
    padding: "0px",
    paddingTop: "11vw",
    boxSizing: "border-box",
    margin: "0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  wrap: {
    padding: "10vw 8vw",
    margin: "0",
    width: "80%",
    borderRadius: "10px",
    backgroundColor: "#fff",
    boxSizing: "border-box",
  },
  navList: {
    width: "37%",
    margin: "0 auto",
    display: "flex",
    justifyContent: "space-between",
  },
  navItem: {
    width: "25%",
  },
};
