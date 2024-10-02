import { Input_Props } from "@/app/interfaces/common";
import React from "react";

const Input = ({
  className,
  inputOnChange,
  onKeyDown,
  type,
  value,
  checked = false,
  placeholder,
}: Input_Props) => {
  return (
    <input
      className={className}
      onChange={inputOnChange}
      onKeyDown={onKeyDown}
      type={type}
      value={value}
      checked={checked}
      placeholder={placeholder}
    />
  );
};

export default Input;
