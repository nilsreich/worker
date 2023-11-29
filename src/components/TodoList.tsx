import { useSetAtom, useAtom } from "jotai"
import { TodoForm } from "./TodoForm"
import { activeListAtom, dataAtom } from "@/lib/atoms"
import { TodoItem } from "@/components/TodoItem"
import { Button } from "@/components/ui/button"


export const TodoList = () => {
    const [activeList, setActiveList] = useAtom(activeListAtom)
    const [data, setData] = useAtom(dataAtom)
    const todos = data.find(item => item.list === activeList)

    const deleteList = () => {
        setData(prevTodos => {
            const filteredTodos = prevTodos.filter(list => list.list !== activeList);

            // If the deleted list was the active one, set a new active list
            if (activeList === activeList) {
                setActiveList(filteredTodos.length > 0 ? filteredTodos[0].list : null);
            }

            return filteredTodos;
        });

    };

    return (
        <div className="flex flex-col grow">
            <div className="text-6xl py-12 m-4">{activeList}</div>
            <div className="m-4">
                <Button onClick={deleteList} variant={'ghost'} className="text-red-500">delete List</Button>
            </div>
            <div className="grow m-4">
                {todos?.todos.map(todo => <TodoItem key={todo.id} id={todo.id} />)}
            </div>
            <TodoForm />
        </div>
    )
}