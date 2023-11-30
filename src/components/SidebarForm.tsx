import { FormEvent, useState } from "react";
import { todosSignal } from "@/lib/signals";
import { Input } from "@/components/ui/input";

export const SidebarForm = () => {
  const [value, setValue] = useState("");

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
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)} className="m-1">
      <Input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="new List"
      />
    </form>
  );
};
