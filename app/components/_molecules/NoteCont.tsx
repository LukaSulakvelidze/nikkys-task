"use client";
import React, { useEffect, useState } from "react";
import { FaCircleXmark } from "react-icons/fa6";
import { FaDownload } from "react-icons/fa";
import Button from "../_atoms/Button";
import Input from "../_atoms/Input";
import { NoteCont_Props, Task } from "@/app/interfaces/common";
import { handleDownloadTasks } from "../service/downloadFunctions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const NoteCont = ({
  containerId,
  color,
  contDeleteButtonClick,
}: NoteCont_Props) => {
  const [input, setInput] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = () => {
    if (input.trim() !== "") {
      const newTask = {
        id: new Date().getTime(),
        task: input,
        isComplated: false,
      };
      setTasks([...tasks, newTask]);
      setInput("");
      localStorage.setItem(
        `${containerId}`,
        JSON.stringify([...tasks, newTask])
      );
      toast.success("Task added successfuly");
    } else {
      toast.error("Type something");
    }
  };

  const addTaskOnEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      addTask();
      e.preventDefault();
    }
  };

  useEffect(() => {
    const taskFromLocalStorage = JSON.parse(
      localStorage.getItem(`${containerId}`) || "[]"
    );
    setTasks(taskFromLocalStorage);
  }, [containerId]);

  const deleteTask = (id: number) => {
    const updatedTasksAfterDelete = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasksAfterDelete);
    localStorage.setItem(
      `${containerId}`,
      JSON.stringify(updatedTasksAfterDelete)
    );
    const dataFromLocal = JSON.parse(
      localStorage.getItem(`${containerId}`) || "[]"
    );
    if (dataFromLocal.length === 0) {
      localStorage.removeItem(`${containerId}`);
    }
  };

  const checkboxChecker = (task_id: number) => {
    const updatedChecker = tasks.map((item) =>
      task_id === item.id ? { ...item, isComplated: !item.isComplated } : item
    );
    setTasks(updatedChecker);
    localStorage.setItem(`${containerId}`, JSON.stringify(updatedChecker));
  };

  return (
    <div
      className={`flex flex-col gap-4 w-[300px] rounded-md p-4 pb-10 ${color}`}
    >
      <div className="flex gap-2 justify-end">
        <Button className={""} onClick={contDeleteButtonClick}>
          <FaCircleXmark className="w-[35px] h-[35px] rounded-[50%] bg-red-600 text-white" />
        </Button>
        <Button
          className={"flex justify-center items-center "}
          onClick={() => handleDownloadTasks(containerId, toast)}
        >
          <FaDownload className="w-[35px] h-[35px] text-white rounded-[50%] bg-blue-700" />
        </Button>
      </div>
      <div className="flex gap-1">
        <Input
          className="p-3 outline-none rounded-md"
          inputOnChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => addTaskOnEnter(e)}
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
                className={`flex items-center justify-between border-none ${color}`}
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
      <ToastContainer />
    </div>
  );
};

export default NoteCont;
