import { Navbar } from "@/components/Navbar";
import { Sidebar } from "@/components/Sidebar";
import { TodoList } from "@/components/TodoList";
import { ThemeProvider } from "@/components/theme-provider";
import { useEffect } from "react";
import { supabase } from "./supabaseClient";
import { Auth } from "@/components/Auth";
import { sessionAtom } from "@/lib/signals";

function App() {
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      sessionAtom.value = session;
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      sessionAtom.value = session;
    });
  }, []);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="flex flex-col h-[100svh]">
        <Navbar />
        {!sessionAtom.value ? (
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
