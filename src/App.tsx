import { Navbar } from "../components/Navbar"
import { Sidebar } from "../components/Sidebar"
import { TodoList } from "../components/TodoList"

function App() {

  return (
    <div className='flex flex-col h-[100svh]'>
      <Navbar />
      <div className="flex grow">
        <Sidebar />
        <TodoList />
      </div>
    </div>
  )
}

export default App
