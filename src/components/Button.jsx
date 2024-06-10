import React from "react";
import style from "./Button.module.scss";
const Button = ({ children, width = "auto" }) => {
  return (
    <button className={style.btnCustom} style={{ width: `${width}` }}>
      {children}
    </button>
  );
};

export default Button;
