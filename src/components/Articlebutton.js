import React, { useState } from "react";

const Articlebutton = ({ text, styleName, onClick }) => {
  console.log(styleName);
  return (
    <button style={styleName} onClick={(e) => onClick(e)}>
      {text}
    </button>
  );
};

export default Articlebutton;
