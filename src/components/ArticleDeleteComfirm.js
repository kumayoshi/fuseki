import React from "react";
import Articlebutton from "../components/Articlebutton";

const ArticleDeleteComfirm = ({
  itemDeleteModal,
  buttonDeleteComfirmCancel,
  buttonDelete,
}) => {
  return (
    <div style={itemDeleteModal === true ? styles.open : styles.close}>
      <div style={styles.wrap}>
        <p style={styles.text}>
          一度削除をすれば
          <br />
          この記事は戻すことができません。
        </p>
        <p style={styles.textLarge}>本当に削除しますか？</p>
        <div style={styles.buttonWrap}>
          <Articlebutton
            text="戻る"
            styleName={styles.deleteCancel}
            onClick={() => buttonDeleteComfirmCancel()}
          />
          <Articlebutton
            text="削除する"
            styleName={styles.deleteIn}
            onClick={() => buttonDelete()}
          />
        </div>
      </div>
    </div>
  );
};

export default ArticleDeleteComfirm;

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
    borderRadius: "3vw",
    background: "#fff",
    marginTop: "2.5vw",
    width: "80%",
    padding: "20% 4%",
    boxSizing: "border-box",
  },
  text: {
    fontSize: "3.7vw",
    fontWeight: "bold",
  },
  textLarge: {
    fontSize: "4.3vw",
    fontWeight: "bold",
    marginTop: "10vw",
  },
  deleteCancel: {
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
  deleteIn: {
    width: "49vw",
    margin: "3vw auto 0px",
    display: "block",
    padding: "2vw 0",
    boxSizing: "border-box",
    textAlign: "center",
    fontSize: "4vw",
    fontWeight: "bold",
    border: "1vw solid #F27855",
    color: "#fff",
    borderRadius: "8px",
    background: "#F27855",
  },
};
