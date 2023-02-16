import React from "react";
import Logo from "../assets/images/logo.png";
import AuthIcon from "../assets/images/auth_icon.svg";

const Header = ({ currentPage, user }) => {
  if (user) {
    return (
      <header>
        <figure>
          <a href={"/todoList/"}>
            <img src={Logo} alt="ロゴ" />
          </a>
        </figure>
        <h1>{currentPage}</h1>
        <div className={"auth_link"}>
          <a href={"/auth/"}>
            <img src={AuthIcon} alt="アカウントの設定　アイコン" />
          </a>
        </div>
      </header>
    );
  } else {
    return (
      <header>
        <figure>
          <a href={"/"}>
            <img src={Logo} alt="ロゴ" />
          </a>
        </figure>
        <h1>{currentPage}</h1>
        <div className={"auth_link"}></div>
      </header>
    );
  }
};

export default Header;
