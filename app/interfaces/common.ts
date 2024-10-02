import { ChangeEvent } from "react";

export interface Button_Props {
  className: string;
  onClick: () => void;
  children?: string | React.ReactNode;
}

export interface Input_Props {
  className: string;
  inputOnChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  type: string;
  value?: string;
  checked?: boolean;
  placeholder?: string;
}

export interface Task {
  id: number;
  task: string;
  isComplated: boolean;
}

export interface Container {
  id: number;
  color: string;
}

export interface AddbuttonCont_Props {
  setContainers: React.Dispatch<React.SetStateAction<Container[]>>;
  containers: Container[];
}

export interface NoteCont_Props {
  containerId: number;
  color: string;
  contDeleteButtonClick: () => void;
}
