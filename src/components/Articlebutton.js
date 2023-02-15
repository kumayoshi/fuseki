import React from "react";

const Articlebutton = ({ text, styleName, onClick }) => {
  return (
    <button style={styleName} onClick={(e) => onClick(e)}>
      {text}
    </button>
  );
};

export default Articlebutton;
