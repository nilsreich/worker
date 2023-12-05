import { useTheme } from "@/components/theme-provider";

import {
  activeListSignal,
  sidebarSignal,
  todosSignal,
  sessionSignal,
} from "@/lib/signals";
import { FormEvent, useState } from "react";

import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,

  MenubarLabel,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { supabase } from "@/supabaseClient";

export const Navbar =  () => {
  const { setTheme, theme } = useTheme();
  const [value, setValue] = useState("");
  const [open, setOpen] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (value.trim() === "") {
      return null;
    }
    todosSignal.value = {
      ...todosSignal.value,
      data: [...todosSignal.value.data, { list: value, todos: [] }],
    };
    setValue("");
    setOpen(false);
  };

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) console.log("Error logging out:", error.message);
  };

  const refetchTodos = async () =>{
    // Check if sessionSignal.value is not null and has a 'user' property
    if (sessionSignal.value && "user" in sessionSignal.value) {
      const { user } = sessionSignal.value;

      const { data } = await supabase
        .from("todos")
        .select(`data`)
        .eq("id", user.id)
        .single();

      if (data) {
          todosSignal.value = data.data;
        }
      }
    }
  

  return (
    <nav className="flex items-center justify-between  h-12">
      <Dialog open={open} onOpenChange={() => setOpen(!open)}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create a new list</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <form onSubmit={(e) => handleSubmit(e)} className="m-1">
              <Input
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="new List"
              />
              <DialogFooter className="mt-5 -mb-4">
                <Button type="submit">Add </Button>
              </DialogFooter>
            </form>
          </div>
        </DialogContent>
      </Dialog>
      <Menubar className="border-none w-full flex items-center">
        <MenubarMenu>
          <MenubarTrigger>Lists</MenubarTrigger>
          <MenubarContent>
            <MenubarLabel>Lists</MenubarLabel>
            <MenubarRadioGroup
              value={activeListSignal.value}
              onValueChange={(e) => {
                activeListSignal.value = e;
              }}
            >
              {todosSignal.value.data.map((item, index) => (
                <MenubarRadioItem value={item.list} key={index}>
                  {item.list} <MenubarShortcut>⇧⌘1</MenubarShortcut>
                </MenubarRadioItem>
              ))}
            </MenubarRadioGroup>
            <MenubarSeparator />
            <MenubarItem onSelect={() => setOpen(!open)}>
              Create a new list...
            </MenubarItem>

            <MenubarSeparator />
            <MenubarItem>
              Archive <MenubarShortcut>⇧⌘A</MenubarShortcut>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>View</MenubarTrigger>
          <MenubarContent>

            <MenubarCheckboxItem checked>
              Hide completed todos <MenubarShortcut>⇧⌘H</MenubarShortcut>
            </MenubarCheckboxItem>
            <MenubarCheckboxItem
              checked={theme === "dark" ? true : false}
              onCheckedChange={() =>
                setTheme(theme === "dark" ? "light" : "dark")
              }
            >
              Darkmode <MenubarShortcut>⇧⌘D</MenubarShortcut>
            </MenubarCheckboxItem>
            <MenubarCheckboxItem
              checked={sidebarSignal.value}
              onCheckedChange={() =>
                (sidebarSignal.value = !sidebarSignal.value)
              }
            >
              Show sidebar <MenubarShortcut>⇧⌘L</MenubarShortcut>
            </MenubarCheckboxItem>
          </MenubarContent>
        </MenubarMenu>
        <div className="grow"></div>
        <MenubarMenu>
          <MenubarTrigger>{sessionSignal.value?.user.email}</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>Statistics</MenubarItem>
            <MenubarItem onSelect={()=>refetchTodos()}>Refetch from database</MenubarItem>
            <MenubarSeparator />
            <MenubarItem onSelect={() => handleLogout()}>Logout</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
      {/* <div className="flex items-center gap-2">
        <Button
          variant={"ghost"}
          className="block md:hidden"
          onClick={() => (sidebarSignal.value = !sidebarSignal.value)}
        >
          <PanelLeft className="w-4 h-4" />
        </Button>
        <div className="font-medium ml-2">Todo App</div>
      </div>
      <ModeToggle />*/}
    </nav>
  );
};
