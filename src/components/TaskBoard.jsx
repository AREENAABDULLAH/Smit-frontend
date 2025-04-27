import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import axios from "axios";

const TaskBoard = ({ onDragEnd }) => {
  const [tasks, setTasks] = useState({
    "To Do": [],
    "In Progress": [],
    "Done": []
  });

  const [editingTask, setEditingTask] = useState(null);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedDescription, setEditedDescription] = useState("");

  useEffect(() => {
    // Fetch tasks from backend on load
    axios.get("http://localhost:5000/api/tasks")
      .then((response) => {
        // Assuming the tasks are categorized by status on the backend
        const categorizedTasks = { "To Do": [], "In Progress": [], "Done": [] };
        response.data.forEach((task) => {
          categorizedTasks[task.status].push(task);
        });
        setTasks(categorizedTasks);
      })
      .catch((error) => {
        console.error("Error fetching tasks:", error);
      });
  }, []);

  const openEditForm = (task) => {
    setEditingTask(task);
    setEditedTitle(task.title);
    setEditedDescription(task.description);
  };

  const closeEditForm = () => {
    setEditingTask(null);
    setEditedTitle("");
    setEditedDescription("");
  };

  const handleSaveEdit = () => {
    if (editedTitle.trim() === "" || editedDescription.trim() === "") {
      alert("Title aur Description required hain!");
      return;
    }

    const updatedTask = { ...editingTask, title: editedTitle, description: editedDescription };

    // Fix URL by using template literals
    axios.put(`http://localhost:5000/tasks/${editingTask._id}`, updatedTask)
      .then((response) => {
        // Update the tasks state after saving
        setTasks((prevTasks) => {
          const updatedTasks = { ...prevTasks };
          const taskIndex = updatedTasks[editingTask.status].findIndex(
            (task) => task._id === editingTask._id
          );
          updatedTasks[editingTask.status][taskIndex] = response.data;
          return updatedTasks;
        });
        closeEditForm();
      })
      .catch((error) => {
        console.error("Error updating task:", error);
      });
  };

  const handleDeleteTask = (taskId, taskStatus) => {
    // Fix URL by using template literals
    axios.delete(`http://localhost:5000/tasks/${taskId}`)
      .then(() => {
        setTasks((prevTasks) => {
          const updatedTasks = { ...prevTasks };
          updatedTasks[taskStatus] = updatedTasks[taskStatus].filter((task) => task._id !== taskId);
          return updatedTasks;
        });
      })
      .catch((error) => {
        console.error("Error deleting task:", error);
      });
  };

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="task-board">
          {Object.entries(tasks).map(([columnId, columnTasks]) => (
            <Droppable droppableId={columnId} key={columnId}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="task-column"
                >
                  <h2 className="column-title">{columnId}</h2>

                  {columnTasks.length === 0 && (
                    <p className="no-tasks">No tasks</p>
                  )}

                  {columnTasks.map((task, index) => (
                    <Draggable key={task._id} draggableId={task._id} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="task-card"
                        >
                          <h3 className="task-title">{task.title}</h3>
                          <p className="task-description">{task.description}</p>

                          <div className="button-group">
                            <button
                              onClick={() => openEditForm(task)}
                              className="edit-button"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteTask(task._id, columnId)}
                              className="delete-button"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>

      {/* Edit Modal */}
      {editingTask && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Edit Task</h2>

            <input
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              placeholder="Title"
            />
            <textarea
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
              placeholder="Description"
            ></textarea>

            <div className="modal-buttons">
              <button onClick={handleSaveEdit} className="edit-button">
                Save
              </button>
              <button onClick={closeEditForm} className="delete-button">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TaskBoard;
