import { todosSignal, activeListAtom } from "@/lib/signals";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

export const TodoItem = ({ id }: { id: string }) => {
  const todo = todosSignal.value
    .find((item) => item.list === activeListAtom.value)
    ?.todos.find((todo) => todo.id === id);

  const toggleTodo = () => {
    todosSignal.value = todosSignal.value.map((list) =>
      list.list === activeListAtom.value
        ? {
            ...list,
            todos: list.todos.map((todo) =>
              todo.id === id ? { ...todo, completed: !todo.completed } : todo,
            ),
          }
        : list,
    );
  };

  const deleteTodo = () => {
    todosSignal.value = todosSignal.value.map((list) =>
      list.list === activeListAtom.value
        ? {
            ...list,
            todos: list.todos.filter((todo) => todo.id !== id),
          }
        : list,
    );
  };

  if (!todo) {
    return null;
  }

  return (
    <div className="flex items-center gap-2">
      <Checkbox checked={todo.completed} onCheckedChange={toggleTodo} />
      <div className="grow">{todo.title}</div>
      <Button onClick={deleteTodo} variant={"ghost"}>
        delete
      </Button>
    </div>
  );
};
