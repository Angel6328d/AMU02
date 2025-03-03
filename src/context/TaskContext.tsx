import { createContext, useContext, useEffect, useState, type ReactNode } from "react"

export interface Task {
  id: number
  title: string
  description: string
  completed: boolean
}

interface TaskContextType {
  tasks: Task[]
  addTask: (task: Omit<Task, "id">) => void
  updateTask: (task: Task) => void
  toggleComplete: (id: number) => void
  deleteTask: (id: number) => void
}

const TaskContext = createContext<TaskContextType | undefined>(undefined)

export function TaskProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>(() => {
    if (typeof window !== "undefined") {
      const savedTasks = localStorage.getItem("tasks")
      return savedTasks ? JSON.parse(savedTasks) : []
    }
    return []
  })

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks))
  }, [tasks])

  const addTask = (task: Omit<Task, "id">) => {
    const newTask = {
      ...task,
      id: Date.now(),
    }
    setTasks([...tasks, newTask])
  }

  const updateTask = (updatedTask: Task) => {
    setTasks(tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)))
  }

  const toggleComplete = (id: number) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)))
  }

  const deleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  const value = {
    tasks,
    addTask,
    updateTask,
    toggleComplete,
    deleteTask,
  }

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>
}

export function useTask() {
  const context = useContext(TaskContext)
  if (!context) {
    throw new Error("useTask must be used within a TaskProvider")
  }
  return context
}
