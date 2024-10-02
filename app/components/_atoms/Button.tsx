import { Button_Props } from "@/app/interfaces/common";
import React from "react";

const Button = ({ className, onClick, children }: Button_Props) => {
  return (
    <button className={className} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
