import type React from "react"
import { useState } from "react"
import { type Task, useTask } from "../context/TaskContext"
import TaskItem from "./TaskItem"
import TaskModal from "./TaskModal"
import { ListFilter } from "lucide-react"

const TaskList: React.FC = () => {
  const { tasks } = useTask()
  const [filter, setFilter] = useState<"all" | "pending" | "completed">("all")
  const [editingTask, setEditingTask] = useState<Task | null>(null)

  const filteredTasks = tasks.filter((task) => {
    if (filter === "pending") return !task.completed
    if (filter === "completed") return task.completed
    return true
  })

  return (
    <div className="w-full max-w-4xl">
      <div className="flex items-center justify-center mb-6">
        <div className="inline-flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl shadow-inner">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              filter === "all"
                ? "bg-white dark:bg-slate-700 text-slate-800 dark:text-white shadow-sm"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white"
            }`}
          >
            Todas
          </button>
          <button
            onClick={() => setFilter("pending")}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              filter === "pending"
                ? "bg-white dark:bg-slate-700 text-slate-800 dark:text-white shadow-sm"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white"
            }`}
          >
            Pendientes
          </button>
          <button
            onClick={() => setFilter("completed")}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              filter === "completed"
                ? "bg-white dark:bg-slate-700 text-slate-800 dark:text-white shadow-sm"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white"
            }`}
          >
            Finalizadas
          </button>
        </div>
      </div>

      {filteredTasks.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-8 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
          <ListFilter className="w-12 h-12 text-slate-400 mb-4" />
          <p className="text-slate-600 dark:text-slate-400 text-center">
            No hay tareas {filter === "pending" ? "pendientes" : filter === "completed" ? "completadas" : ""} para
            mostrar
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {filteredTasks.map((task) => (
            <TaskItem key={task.id} task={task} openModal={() => setEditingTask(task)} />
          ))}
        </div>
      )}

      {editingTask && <TaskModal taskToEdit={editingTask} closeModal={() => setEditingTask(null)} />}
    </div>
  )
}

export default TaskList;
