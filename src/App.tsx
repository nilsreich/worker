import { Navbar } from   "@/components/Navbar"
import { Sidebar } from  "@/components/Sidebar"
import { TodoList } from "@/components/TodoList"
import { ThemeProvider } from "@/components/theme-provider"

function App() {

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
<div className='flex flex-col h-[100svh]'>
      <Navbar />
      <div className="flex grow">
        <Sidebar />
        <TodoList />
      </div>
    </div>  </ThemeProvider>
    
  )
}

export default App
