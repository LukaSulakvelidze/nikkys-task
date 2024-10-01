import { Input_Props } from "@/app/interfaces/common";
import React from "react";

const Input = ({
  className,
  inputOnChange,
  type,
  value,
  checked = false,
  placeholder,
}: Input_Props) => {
  return (
    <input
      className={className}
      onChange={inputOnChange}
      type={type}
      value={value}
      checked={checked}
      placeholder={placeholder}
    />
  );
};

export default Input;
