import { useState } from "react";

const useTasks = () => {
  const [tasks, setTasks] = useState({
    "To Do": [],
    "In Progress": [],
    "Done": [],
  });

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("To Do");

  const handleAddTask = (e) => {
    e.preventDefault();
    const newTask = {
      id: Date.now().toString(),
      title,
      description,
    };
    setTasks((prev) => ({
      ...prev,
      [status]: [...prev[status], newTask],
    }));
    setTitle("");
    setDescription("");
    setStatus("To Do");
  };

  const handleDeleteTask = (column, taskId) => {
    setTasks((prev) => ({
      ...prev,
      [column]: prev[column].filter((task) => task.id !== taskId),
    }));
  };

  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;

    const sourceColumn = source.droppableId;
    const destColumn = destination.droppableId;
    const sourceTasks = Array.from(tasks[sourceColumn]);
    const destTasks = Array.from(tasks[destColumn]);
    const [movedTask] = sourceTasks.splice(source.index, 1);

    if (sourceColumn === destColumn) {
      sourceTasks.splice(destination.index, 0, movedTask);
      setTasks((prev) => ({
        ...prev,
        [sourceColumn]: sourceTasks,
      }));
    } else {
      destTasks.splice(destination.index, 0, movedTask);
      setTasks((prev) => ({
        ...prev,
        [sourceColumn]: sourceTasks,
        [destColumn]: destTasks,
      }));
    }
  };

  return {
    tasks,
    title,
    description,
    status,
    setTitle,
    setDescription,
    setStatus,
    handleAddTask,
    handleDeleteTask,
    onDragEnd,
  };
};

export default useTasks;
