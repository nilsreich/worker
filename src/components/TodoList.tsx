import { activeListSignal, todosSignal } from "@/lib/signals";
import { TodoItem } from "@/components/TodoItem";
import { Button } from "@/components/ui/button";
import { FormEvent, useState } from "react";
import { Input } from "@/components/ui/input";
import { PlusIcon } from "lucide-react";
import { ScrollArea } from "./ui/scroll-area";

export const TodoList = () => {
  const [value, setValue] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (value.trim() === "") {
      return;
    }
    todosSignal.value = {
      ...todosSignal.value,
      data: todosSignal.value.data.map((list) =>
        list.list === activeListSignal.value
          ? {
              ...list,
              todos: [
                ...list.todos,
                { id: crypto.randomUUID(), title: value, completed: false },
              ],
            }
          : list
      ),
    };
    setValue("");
  };

  const todos = todosSignal.value.data.find(
    (item) => item.list === activeListSignal.value,
  );

  const deleteList = () => {
    todosSignal.value = {
      ...todosSignal.value,
      data: todosSignal.value.data.filter(
        (list) => list.list !== activeListSignal.value
      )
    };
    activeListSignal.value=todosSignal.value.data[0].list
  };
  return (
    <div className="flex flex-col grow">
      <ScrollArea className="h-[calc(100svh-7rem)]">
      <div className="text-6xl py-12 m-4">{activeListSignal.value}</div>
      <div className="m-4">
        <Button onClick={deleteList} variant={"ghost"} className="text-red-500">
          delete List
        </Button>
      </div>
      <div className="grow m-4">
        {todos?.todos.map((todo) => <TodoItem key={todo.id} id={todo.id} />)}
      </div>
      </ScrollArea>
      <form
      onSubmit={(e) => handleSubmit(e)}
      className=" p-4 flex items-center gap-2"
    >
      <Input
        type="text"
        value={value}
        className="border rounded pl-2"
        onChange={(e) => setValue(e.target.value)}
        placeholder="add todo"
      />
      <Button>
        <PlusIcon />
      </Button>
    </form>
    </div>
  );
};
