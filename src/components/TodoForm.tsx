import { FormEvent, useState } from "react";
import { todosSignal, activeListAtom } from "@/lib/signals";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";

export const TodoForm = () => {
  const [value, setValue] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (value.trim() === "") {
      return;
    }
    todosSignal.value = {
      ...todosSignal.value,
      data: todosSignal.value.data.map((list) =>
        list.list === activeListAtom.value
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
  return (
    <form
      onSubmit={(e) => handleSubmit(e)}
      className="border-t p-1 flex items-center gap-2"
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
  );
};
