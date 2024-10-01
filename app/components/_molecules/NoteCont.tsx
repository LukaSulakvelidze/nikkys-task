"use client";
import React, { useState } from "react";
import { FaCircleXmark } from "react-icons/fa6";
import { FaDownload } from "react-icons/fa";
import Button from "../_atoms/Button";
import Input from "../_atoms/Input";
import { NoteCont_Props, Task } from "@/app/interfaces/common";
const NoteCont = ({ color, contDeleteButtonClick }: NoteCont_Props) => {
  const [input, setInput] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = () => {
    const lastId = tasks[tasks.length - 1]?.id || 0;
    if (input.trim() !== "") {
      const newTask = {
        id: lastId + 1,
        task: input,
        isComplated: false,
      };
      setTasks([...tasks, newTask]);
      setInput("");
    }
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const checkboxChecker = (task_id: number) => {
    setTasks(
      tasks.map((item) =>
        task_id === item.id ? { ...item, isComplated: !item.isComplated } : item
      )
    );
  };

  return (
    <div
      className={`flex flex-col gap-4 w-[300px] rounded-md p-4 pb-10 ${color}`}
    >
      <div className="flex gap-2 justify-end">
        <Button className={""} onClick={contDeleteButtonClick}>
          <FaCircleXmark className="w-[35px] h-[35px] rounded-[50%] bg-white text-red-600" />
        </Button>
        <Button
          className={"flex justify-center items-center "}
          onClick={() => console.log("click")}
        >
          <FaDownload className="w-[35px] h-[35px] text-white rounded-[50%] bg-blue-700" />
        </Button>
      </div>
      <div className="flex gap-1">
        <Input
          className="p-3 outline-none rounded-md"
          inputOnChange={(e) => setInput(e.target.value)}
          value={input}
          type="text"
          placeholder="Type task"
        />
        <Button
          className={"p-3 text-center rounded-md text-white bg-green-600"}
          onClick={addTask}
        >
          Add
        </Button>
      </div>

      {tasks &&
        tasks.map((item, index) => {
          return (
            <div
              className={
                "w-full max-h-[368px] overflow-y-scroll rounded-md bg-white shadow-[0px_35px_50px_-15px_rgba(194,195,214,0.5)]"
              }
              key={index}
            >
              <div
                className={`flex items-center justify-between border-none bg-${color}-500`}
              >
                <Input
                  className={"bg-red-500"}
                  checked={item.isComplated}
                  inputOnChange={() => checkboxChecker(item.id)}
                  type={"checkbox"}
                />
                <span
                  className={`${item.isComplated && "line-through"} text-white`}
                >
                  {item.task}
                </span>
                <FaCircleXmark
                  className="text-white"
                  onClick={() => deleteTask(item.id)}
                />
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default NoteCont;
