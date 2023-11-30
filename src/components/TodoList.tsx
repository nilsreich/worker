import { TodoForm } from "./TodoForm";
import { activeListAtom, todosSignal } from "@/lib/signals";
import { TodoItem } from "@/components/TodoItem";
import { Button } from "@/components/ui/button";

export const TodoList = () => {
  const todos = todosSignal.value.find(
    (item) => item.list === activeListAtom.value,
  );

  const deleteList = () => {
    todosSignal.value = todosSignal.value.filter(
      (list) => list.list !== activeListAtom.value,
    );
  };
  return (
    <div className="flex flex-col grow">
      <div className="text-6xl py-12 m-4">{activeListAtom.value}</div>
      <div className="m-4">
        <Button onClick={deleteList} variant={"ghost"} className="text-red-500">
          delete List
        </Button>
      </div>
      <div className="grow m-4">
        {todos?.todos.map((todo) => <TodoItem key={todo.id} id={todo.id} />)}
      </div>
      <TodoForm />
    </div>
  );
};
