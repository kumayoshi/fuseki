import React from "react";
import { Link } from "react-router-dom";

import navStone from "../assets/images/nav_stone.svg";
import navStoneActive from "../assets/images/nav_stone_active.svg";

const OnbordContent = ({ onbordNavActive, navIndex, onClick, style }) => {
  return (
    <li onClick={() => onClick(navIndex)} style={style}>
      <img
        src={onbordNavActive >= navIndex ? navStoneActive : navStone}
        alt=""
      />
    </li>
  );
};

export default OnbordContent;
