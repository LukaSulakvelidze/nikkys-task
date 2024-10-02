"use client";
import React, { useEffect, useState } from "react";
import AddButtonCont from "../_molecules/AddButtonCont";
import NoteCont from "../_molecules/NoteCont";
import { Container } from "@/app/interfaces/common";
import { Reorder } from "framer-motion";
import Button from "../_atoms/Button";
import { FaDownload } from "react-icons/fa";
import { handleDownloadAllTasks } from "../service/downloadFunctions";
import { ToastContainer, toast } from "react-toastify";

const Main = () => {
  const [containers, setContainers] = useState<Container[]>([]);

  const containerDelete = (id: number) => {
    const updatedContainers = containers.filter(
      (container) => container?.id !== id
    );
    localStorage.removeItem(`${id}`);
    setContainers(updatedContainers);
    localStorage.setItem("containers", JSON.stringify(updatedContainers));
  };

  useEffect(() => {
    const dataFromLocalStorage = JSON.parse(
      localStorage.getItem("containers") || "[]"
    );
    setContainers(dataFromLocalStorage);
  }, []);

  return (
    <main className="flex flex-col justify-center items-center gap-6 my-8">
      <Button
        className={"absolute bottom-7 left-7"}
        onClick={() => handleDownloadAllTasks(toast)}
      >
        <FaDownload className="w-[40px] h-[40px] text-blue-700" />
      </Button>
      <AddButtonCont setContainers={setContainers} containers={containers} />
      <Reorder.Group
        className="flex flex-col justify-center items-center gap-6"
        axis="y"
        values={containers}
        onReorder={setContainers}
      >
        {containers &&
          containers.map((cont, index) => {
            return (
              <Reorder.Item key={cont.id} value={cont}>
                <NoteCont
                  key={index}
                  containerId={cont.id}
                  color={cont.color}
                  contDeleteButtonClick={() => containerDelete(cont.id)}
                />
              </Reorder.Item>
            );
          })}
      </Reorder.Group>
      <ToastContainer />
    </main>
  );
};

export default Main;
