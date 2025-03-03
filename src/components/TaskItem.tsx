import type React from "react"
import { useTask, type Task } from "../context/TaskContext"
import { CheckCircle, Edit, Trash } from "lucide-react"

interface TaskItemProps {
  task: Task
  openModal: () => void
}

const TaskItem: React.FC<TaskItemProps> = ({ task, openModal }) => {
  const { toggleComplete, deleteTask } = useTask()

  return (
    <div className="bg-white dark:bg-slate-800 p-5 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 transition-all hover:shadow-md">
      <h3
        className={`text-lg font-semibold ${task.completed ? "line-through text-slate-400" : "text-slate-800 dark:text-white"}`}
      >
        {task.title}
      </h3>
      <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm">{task.description}</p>
      <div className="mt-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
        <button
          onClick={() => toggleComplete(task.id)}
          className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-all ${
            task.completed
              ? "bg-amber-100 hover:bg-amber-200 text-amber-700 dark:bg-amber-900/30 dark:hover:bg-amber-800/50 dark:text-amber-400"
              : "bg-emerald-100 hover:bg-emerald-200 text-emerald-700 dark:bg-emerald-900/30 dark:hover:bg-emerald-800/50 dark:text-emerald-400"
          }`}
        >
          <CheckCircle className="w-4 h-4" />
          <span>{task.completed ? "Marcar como pendiente" : "Marcar como completada"}</span>
        </button>
        <div className="flex gap-2">
          <button
            onClick={openModal}
            className="flex items-center justify-center gap-2 bg-sky-100 hover:bg-sky-200 text-sky-700 dark:bg-sky-900/30 dark:hover:bg-sky-800/50 dark:text-sky-400 px-4 py-2 rounded-lg transition-all"
          >
            <Edit className="w-4 h-4" />
            <span>Editar</span>
          </button>
          <button
            onClick={() => deleteTask(task.id)}
            className="flex items-center justify-center gap-2 bg-rose-100 hover:bg-rose-200 text-rose-700 dark:bg-rose-900/30 dark:hover:bg-rose-800/50 dark:text-rose-400 px-4 py-2 rounded-lg transition-all"
          >
            <Trash className="w-4 h-4" />
            <span>Eliminar</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default TaskItem;
