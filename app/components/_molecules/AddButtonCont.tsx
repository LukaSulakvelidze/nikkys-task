"use client";
import React, { useState } from "react";
import { FaCirclePlus } from "react-icons/fa6";
import Button from "../_atoms/Button";
import { AddbuttonCont_Props, Container } from "@/app/interfaces/common";

const AddButtonCont = ({ containers, setContainers }: AddbuttonCont_Props) => {
  const [show, setShow] = useState(false);
  const colors = ["bg-red-500", "bg-blue-500", "bg-green-500", "bg-yellow-500"];

  const createNoteCont = (color: string) => {
    const lastId = containers[containers.length - 1]?.id || 0;
    const newContainer: Container = {
      id: lastId + 1,
      color: color,
    };
    setContainers([...containers, newContainer]);
    localStorage.setItem(
      "containers",
      JSON.stringify([...containers, newContainer])
    );
  };
  return (
    <div className="flex flex-col-reverse gap-3 fixed bottom-3 right-3">
      <Button
        className={"w-[60px] h-[60px]"}
        onClick={() => {
          setShow(!show);
        }}
      >
        <FaCirclePlus className="w-full h-full text-blue-500" />
      </Button>
      {colors.map((col, index) => {
        return (
          <Button
            key={index}
            className={`${
              !show && "hidden"
            } w-[60px] h-[60px] ${col} rounded-[50%] opacity-[0.3]`}
            onClick={() => {
              createNoteCont(col);
            }}
          ></Button>
        );
      })}
    </div>
  );
};

export default AddButtonCont;
