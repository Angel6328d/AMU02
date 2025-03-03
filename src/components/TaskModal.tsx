"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useTask, type Task } from "../context/TaskContext"
import { X } from "lucide-react"

interface TaskModalProps {
  closeModal: () => void
  taskToEdit?: Task | null
}

const TaskModal: React.FC<TaskModalProps> = ({ closeModal, taskToEdit }) => {
  const { addTask, updateTask } = useTask()
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [completed, setCompleted] = useState(false)

  useEffect(() => {
    if (taskToEdit) {
      setTitle(taskToEdit.title)
      setDescription(taskToEdit.description)
      setCompleted(taskToEdit.completed)
    }
  }, [taskToEdit])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const taskData = { title, description, completed }
    if (taskToEdit) {
      updateTask({ ...taskData, id: taskToEdit.id })
    } else {
      addTask(taskData)
    }
    closeModal()
  }

  return (
    <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm flex justify-center items-center z-50 p-4">
      <div className="bg-white dark:bg-slate-800 p-6 rounded-xl w-full max-w-md shadow-xl border border-slate-200 dark:border-slate-700">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-slate-800 dark:text-white">
            {taskToEdit ? "Editar Tarea" : "Agregar Tarea"}
          </h2>
          <button
            onClick={closeModal}
            className="text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-slate-700 dark:text-slate-300 font-medium mb-2">
              Título
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-400 transition-all"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-slate-700 dark:text-slate-300 font-medium mb-2">
              Descripción
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-400 transition-all"
              rows={3}
            ></textarea>
          </div>
          <div className="mb-6">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={completed}
                onChange={(e) => setCompleted(e.target.checked)}
                className="w-5 h-5 rounded text-teal-500 focus:ring-teal-400 mr-3"
              />
              <span className="text-slate-700 dark:text-slate-300 font-medium">Completada</span>
            </label>
          </div>
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={closeModal}
              className="bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 font-medium py-2 px-4 rounded-lg transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-teal-500 hover:bg-teal-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
            >
              {taskToEdit ? "Actualizar" : "Agregar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default TaskModal;
