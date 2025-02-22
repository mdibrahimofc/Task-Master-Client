import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Plus, Edit, Trash2 } from "lucide-react";

const initialTasks = {
  todo: [
    { id: "1", title: "Learn React", description: "Cover hooks and context" },
    { id: "2", title: "Study TailwindCSS", description: "Learn responsive design" },
  ],
  inProgress: [
    { id: "3", title: "Build Task App", description: "Implement drag & drop" },
  ],
  done: [
    { id: "4", title: "Set up Project", description: "Initialize Vite & Tailwind" },
  ],
};

const TaskBoard = () => {
  const [tasks, setTasks] = useState(initialTasks);

  // Handle Drag and Drop
  const onDragEnd = (result) => {
    if (!result.destination) return;

    const { source, destination } = result;
    const sourceColumnId = source.droppableId;
    const destinationColumnId = destination.droppableId;

    const sourceTasks = [...tasks[sourceColumnId]];
    const destinationTasks = sourceColumnId === destinationColumnId ? sourceTasks : [...tasks[destinationColumnId]];

    // Remove the task from the source column
    const [movedTask] = sourceTasks.splice(source.index, 1);

    // Add task to the destination column at the new position
    destinationTasks.splice(destination.index, 0, movedTask);

    // Update state
    setTasks({
      ...tasks,
      [sourceColumnId]: sourceTasks,
      [destinationColumnId]: destinationTasks,
    });
  };

  // Add New Task
  const addTask = (columnId) => {
    const title = prompt("Enter task title:");
    const description = prompt("Enter task description:");
    if (title && description) {
      const newTask = { id: Date.now().toString(), title, description };
      setTasks({ ...tasks, [columnId]: [...tasks[columnId], newTask] });
    }
  };

  // Edit Task
  const editTask = (columnId, index) => {
    const updatedTitle = prompt("Edit task title:", tasks[columnId][index].title);
    const updatedDescription = prompt("Edit task description:", tasks[columnId][index].description);

    if (updatedTitle && updatedDescription) {
      const updatedTasks = [...tasks[columnId]];
      updatedTasks[index] = { ...updatedTasks[index], title: updatedTitle, description: updatedDescription };
      setTasks({ ...tasks, [columnId]: updatedTasks });
    }
  };

  // Delete Task
  const deleteTask = (columnId, index) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      const updatedTasks = [...tasks[columnId]];
      updatedTasks.splice(index, 1);
      setTasks({ ...tasks, [columnId]: updatedTasks });
    }
  };

  return (
    <div className="w-full min-h-screen py-10 bg-gradient-to-b from-gray-100 to-gray-300 dark:from-gray-900 dark:to-gray-800">
      <h2 className="text-4xl font-extrabold text-center text-gray-800 dark:text-white mb-6">
        Task Management Board
      </h2>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
          {Object.keys(tasks).map((columnId) => (
            <Droppable key={columnId} droppableId={columnId}>
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps} className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 min-h-[300px]">
                  {/* Column Title & Add Button */}
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold text-gray-700 dark:text-white">
                      {columnId === "todo" && "📝 To-Do"}
                      {columnId === "inProgress" && "⚡ In Progress"}
                      {columnId === "done" && "✅ Done"}
                    </h3>
                    <button onClick={() => addTask(columnId)} className="px-3 py-1 flex items-center bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
                      <Plus className="w-4 h-4 mr-1" /> Add
                    </button>
                  </div>

                  {/* Task List */}
                  {tasks[columnId].map((task, index) => (
                    <Draggable key={task.id} draggableId={task.id} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="p-4 bg-white dark:bg-gray-700 rounded-lg mb-3 shadow-md border border-gray-300 dark:border-gray-600 transition hover:shadow-lg"
                        >
                          <div className="flex justify-between">
                            <div>
                              <h4 className="text-lg font-semibold text-gray-800 dark:text-white">{task.title}</h4>
                              <p className="text-sm text-gray-600 dark:text-gray-300">{task.description}</p>
                            </div>
                            {/* Edit & Delete Buttons */}
                            <div className="flex space-x-3">
                              <button onClick={() => editTask(columnId, index)} className="text-yellow-500 hover:text-yellow-600">
                                <Edit className="w-5 h-5" />
                              </button>
                              <button onClick={() => deleteTask(columnId, index)} className="text-red-500 hover:text-red-600">
                                <Trash2 className="w-5 h-5" />
                              </button>
                            </div>
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
    </div>
  );
};

export default TaskBoard;
