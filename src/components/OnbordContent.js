import React from "react";

const OnbordContent = ({ contentSrc, contentCurrent, contentArrayLength }) => {
  return (
    <div>
      <img src={contentSrc} alt="" />
      {contentCurrent === contentArrayLength && (
        <button style={styles.button}>
          <a style={styles.buttonLink} href={"/memolist/"}>
            fusekiのページへ
          </a>
        </button>
      )}
    </div>
  );
};

export default OnbordContent;

const styles = {
  button: {
    margin: "2vw auto 5vw",
    display: "block",
    background: "none",
    backgroundColor: "#5BCBCB",
    borderRadius: "5px",
  },
  buttonLink: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: "4.2vw",
    boxSizing: "border-box",
    padding: "2vw 6vw",
    display: "block",
  },
};
