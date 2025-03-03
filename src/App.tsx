import { useState } from "react"
import { TaskProvider } from "./context/TaskContext"
import TaskList from "./components/TaskList"
import TaskModal from "./components/TaskModal"

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <TaskProvider>
      <div className="min-h-screen bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-white transition-colors">
        <div className="container mx-auto px-4 py-8 flex flex-col items-center">
          <header className="w-full max-w-4xl flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-teal-500 to-emerald-500 bg-clip-text text-transparent">
              Administrador de Tareas
            </h1>
          </header>

          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white font-medium px-5 py-3 rounded-xl mb-8 transition-all shadow-md hover:shadow-lg"
          >
            <span>Nueva Tarea</span>
          </button>

          <TaskList />
          {isModalOpen && <TaskModal closeModal={() => setIsModalOpen(false)} />}
        </div>
      </div>
    </TaskProvider>
  )
}

export default App;
