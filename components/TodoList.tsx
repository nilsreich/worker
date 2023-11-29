import { useSetAtom, useAtom } from "jotai"
import { TodoForm } from "./TodoForm"
import { activeListAtom, dataAtom } from "../lib/atoms"
import { TodoItem } from "./TodoItem"


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
            <div className="text-5xl py-12">{activeList}</div>
            <div>
                <button onClick={deleteList}>delete List</button>
            </div>
            <div className="grow">
                {todos?.todos.map(todo => <TodoItem key={todo.id} id={todo.id} />)}
            </div>
            <TodoForm />
        </div>
    )
}