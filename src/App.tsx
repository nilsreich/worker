import { Navbar } from "@/components/Navbar";
import { Sidebar } from "@/components/Sidebar";
import { TodoList } from "@/components/TodoList";
import { ThemeProvider } from "@/components/theme-provider";
import { useEffect } from "react";
import { supabase } from "./supabaseClient";
import { Auth } from "@/components/Auth";
import { sessionSignal } from "@/lib/signals";
import { todosSignal } from "@/lib/signals";

function App() {
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      sessionSignal.value = session;
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      sessionSignal.value = session;
    });
  }, []);

  useEffect(() => {
    let ignore = false;
    async function getTodos() {
      // Check if sessionSignal.value is not null and has a 'user' property
      if (sessionSignal.value && 'user' in sessionSignal.value) {
        const { user } = sessionSignal.value;
  
        const { data, error } = await supabase
          .from("todos")
          .select(`data`)
          .eq("id", user.id)
          .single();
  
        if (!ignore) {
          if (error) {
            console.warn(error);
          } else if (data) {
            todosSignal.value = data.data;
          }
        }
      }
    }
  
    if (sessionSignal.value && 'user' in sessionSignal.value) {
      getTodos();
    }
    return () => {
      ignore = true;
    };
  }, [sessionSignal.value]);

  useEffect(() => {
    async function setTodos() {
      // Ensure sessionSignal.value and sessionSignal.value.user are not null
      if (sessionSignal.value && sessionSignal.value.user) {
        const { error } = await supabase
          .from("todos")
          .upsert({ id: sessionSignal.value.user.id, data: todosSignal.value });
        if (error) {
          console.log(error.message);
        }
      }
    }
  
    if (sessionSignal.value && sessionSignal.value.user) {
      setTodos();
    }
    // Return a cleanup function or remove the return statement if not needed
    return () => {};
  }, [todosSignal.value]);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="flex flex-col h-[100svh]">
        <Navbar />
        {!sessionSignal.value ? (
          <Auth />
        ) : (
          <div className="flex grow">
            <Sidebar />
            <TodoList />
          </div>
        )}
      </div>
    </ThemeProvider>
  );
}

export default App;
