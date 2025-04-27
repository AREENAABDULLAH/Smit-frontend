// import React, { useState } from "react";
// import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
// import "./Home.css"; // ← Import CSS

// const Home = () => {
//   const [tasks, setTasks] = useState({
//     "To Do": [],
//     "In Progress": [],
//     "Done": []
//   });

//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [status, setStatus] = useState("To Do"); // Default status

//   const handleAddTask = (e) => {
//     e.preventDefault();
//     const newTask = {
//       id: Date.now().toString(),
//       title,
//       description,
//     };
//     setTasks((prev) => ({
//       ...prev,
//       [status]: [...prev[status], newTask], // Add to the selected status column
//     }));
//     setTitle("");
//     setDescription("");
//     setStatus("To Do"); // Reset status to "To Do" after adding
//   };

//   const handleDeleteTask = (column, taskId) => {
//     setTasks((prev) => ({
//       ...prev,
//       [column]: prev[column].filter((task) => task.id !== taskId),
//     }));
//   };

//   const onDragEnd = (result) => {
//     const { source, destination } = result;
//     if (!destination) return;

//     const sourceColumn = source.droppableId;
//     const destColumn = destination.droppableId;
//     const sourceTasks = Array.from(tasks[sourceColumn]);
//     const destTasks = Array.from(tasks[destColumn]);
//     const [movedTask] = sourceTasks.splice(source.index, 1);

//     if (sourceColumn === destColumn) {
//       sourceTasks.splice(destination.index, 0, movedTask);
//       setTasks((prev) => ({
//         ...prev,
//         [sourceColumn]: sourceTasks,
//       }));
//     } else {
//       destTasks.splice(destination.index, 0, movedTask);
//       setTasks((prev) => ({
//         ...prev,
//         [sourceColumn]: sourceTasks,
//         [destColumn]: destTasks,
//       }));
//     }
//   };

//   return (
//     <div className="p-6 min-h-screen bg-gray-50 flex justify-center items-center">
//       <div className="w-full max-w-4xl">
//         <h1 className="text-3xl font-bold text-center mb-8">Task Manager</h1>

//         {/* Add Task Form */}
//         <form onSubmit={handleAddTask} className="bg-white p-6 rounded shadow mb-8">
//           <input
//             type="text"
//             placeholder="Task Title"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             className="border p-2 w-full mb-4 rounded"
//             required
//           />
//           <textarea
//             placeholder="Task Description"
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             className="border p-2 w-full mb-4 rounded"
//             rows="3"
//             required
//           />
          
//           {/* Status Dropdown */}
//           <select
//             value={status}
//             onChange={(e) => setStatus(e.target.value)}
//             className="border p-2 w-full mb-4 rounded"
//           >
//             <option value="To Do">To Do</option>
//             <option value="In Progress">In Progress</option>
//             <option value="Done">Done</option>
//           </select>

//           <button
//             type="submit"
//             className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded w-full"
//           >
//             Add Task
//           </button>
//         </form>

//         {/* Task Board */}
//         <DragDropContext onDragEnd={onDragEnd}>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             {Object.entries(tasks).map(([columnId, columnTasks]) => (
//               <Droppable droppableId={columnId} key={columnId}>
//                 {(provided) => (
//                   <div
//                     ref={provided.innerRef}
//                     {...provided.droppableProps}
//                     className="bg-white p-4 rounded shadow min-h-[400px] flex flex-col"
//                   >
//                     <h2 className="text-xl font-semibold mb-4 text-center">{columnId}</h2>

//                     {columnTasks.length === 0 && (
//                       <p className="text-gray-400 text-center">No tasks</p>
//                     )}

//                     {columnTasks.map((task, index) => (
//                       <Draggable key={task.id} draggableId={task.id} index={index}>
//                         {(provided) => (
//                           <div
//                             ref={provided.innerRef}
//                             {...provided.draggableProps}
//                             {...provided.dragHandleProps}
//                             className="bg-gray-100 p-4 rounded shadow mb-4 flex flex-col"
//                           >
//                             <h3 className="font-bold text-lg">{task.title}</h3>
//                             <p className="text-sm text-gray-600 mb-2">{task.description}</p>
//                             <button
//                               onClick={() => handleDeleteTask(columnId, task.id)}
//                               className="bg-red-500 hover:bg-red-600 text-white text-xs py-1 px-2 rounded self-end"
//                             >
//                               Delete
//                             </button>
//                           </div>
//                         )}
//                       </Draggable>
//                     ))}

//                     {provided.placeholder}
//                   </div>
//                 )}
//               </Droppable>
//             ))}
//           </div>
//         </DragDropContext>
//       </div>
//     </div>
//   );
// };

// export default Home;  



import React from "react";
import useTasks from "../hooks/useTasks";
import AddTaskForm from "../components/AddTaskForm";
import TaskBoard from "../components/TaskBoard";
import "./Home.css"; // CSS import

const Home = () => {
  const {
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
  } = useTasks();

  return (
    <div className="p-6 min-h-screen bg-gray-50 flex justify-center items-center">
      <div className="w-full max-w-4xl">
        <h1 className="text-3xl font-bold text-center mb-8">Task Manager</h1>
        <AddTaskForm
          title={title}
          description={description}
          status={status}
          setTitle={setTitle}
          setDescription={setDescription}
          setStatus={setStatus}
          handleAddTask={handleAddTask}
        />
        <TaskBoard
          tasks={tasks}
          handleDeleteTask={handleDeleteTask}
          onDragEnd={onDragEnd}
        />
      </div>
    </div>
  );
};

export default Home;

