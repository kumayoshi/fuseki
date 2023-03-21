import React from "react";
import SignForm from "../components/SignForm";
import Articlebutton from "../components/Articlebutton";

const UserInformationChengeModal = ({
  modalFlug,
  desciptionText,
  onMailChange,
  onPassChange,
  cancel,
  updateInfomation,
}) => {
  const text = desciptionText.split("\n").map((item, index) => {
    return (
      <React.Fragment key={index}>
        {item}
        <br />
      </React.Fragment>
    );
  });
  return (
    <div style={modalFlug === "none" ? styles.close : styles.open}>
      <div style={styles.wrap}>
        <p style={styles.text}>{text}</p>
        {modalFlug === "mail" ? (
          <SignForm
            passExistence="none"
            onMailChange={(text) => onMailChange(text)}
          />
        ) : (
          <SignForm
            mailExistence="none"
            mailChangeExistence="none"
            onPassChange={(text) => onPassChange(text)}
          />
        )}
        <div style={styles.buttonWrap}>
          <Articlebutton
            text="戻る"
            styleName={styles.updateCancel}
            onClick={() => cancel()}
          />
          <Articlebutton
            text="変更する"
            styleName={styles.updateOn}
            onClick={() => updateInfomation()}
          />
        </div>
      </div>
    </div>
  );
};

export default UserInformationChengeModal;

const styles = {
  open: {
    position: "fixed",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    zIndex: "10",
    background: "rgba(0,0,0,0.6)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  close: {
    display: "none",
  },
  wrap: {
    textAlign: "center",
    // borderRadius: "3vw",
    background: "#f8f8f8",
    marginTop: "2.5vw",
    width: "100%",
    padding: "20% 4%",
    boxSizing: "border-box",
  },
  text: {
    fontSize: "3.7vw",
    fontWeight: "bold",
    marginBottom: "10vw",
    lineHeight: "2em",
  },
  textLarge: {
    fontSize: "4.3vw",
    fontWeight: "bold",
    marginTop: "10vw",
  },
  updateCancel: {
    width: "49vw",
    margin: "11vw auto 0px",
    display: "block",
    padding: "2vw 0",
    boxSizing: "border-box",
    textAlign: "center",
    fontSize: "4vw",
    fontWeight: "bold",
    border: "1vw solid #5bcbcb",
    color: "#5bcbcb",
    borderRadius: "8px",
    background: "#fff",
  },
  updateOn: {
    width: "49vw",
    margin: "3vw auto 0px",
    display: "block",
    padding: "2vw 0",
    boxSizing: "border-box",
    textAlign: "center",
    fontSize: "4vw",
    fontWeight: "bold",
    border: "1vw solid #5bcbcb",
    color: "#fff",
    borderRadius: "8px",
    background: "#5bcbcb",
  },
};
