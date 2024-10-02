import { ToastContent, ToastOptions } from "react-toastify";

const handleDownloadAllTasks = (toast: {
  error: (message: ToastContent, options?: ToastOptions) => void;
  success: (message: ToastContent, options?: ToastOptions) => void;
}) => {
  const allKeys = Object.keys(localStorage);
  let allTasksText = "";

  allKeys.forEach((containerId) => {
    const tasks = JSON.parse(localStorage.getItem(containerId) || "[]");
    if (tasks.length > 0) {
      const tasksText = tasks
        .map((task: { task: string }) => task.task)
        .join("\n");

      allTasksText += `Container ${containerId}:\n${tasksText}\n\n`;
    }
  });

  if (!allTasksText.trim()) {
    toast.error("Cannot download because there are no tasks");
    return;
  }

  toast.success("Downloaded successfully");

  const blob = new Blob([allTasksText], { type: "text/plain" });

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "all_tasks.txt";

  link.click();

  URL.revokeObjectURL(url);
};

const handleDownloadTasks = (
  containerId: number,
  toast: {
    error: (message: ToastContent, options?: ToastOptions) => void;
    success: (message: ToastContent, options?: ToastOptions) => void;
  }
) => {
  const tasks = JSON.parse(localStorage.getItem(`${containerId}`) || "[]");
  if (tasks.length === 0) {
    toast.error("Cannot download because it's Empty");
    return;
  }
  const tasksText = tasks.map((task: { task: string }) => task.task).join("\n");

  const blob = new Blob([tasksText], { type: "text/plain" });

  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;

  link.download = `container_${containerId}_tasks.txt`;

  link.click();

  URL.revokeObjectURL(url);
  toast.success("Downloaded successfully");
};
export { handleDownloadAllTasks, handleDownloadTasks };
