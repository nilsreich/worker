import { useAtom, useAtomValue } from 'jotai'
import { dataAtom, activeListAtom } from '@/lib/atoms'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'

export const TodoItem = ({ id }: { id: string }) => {
    const [data, setData] = useAtom(dataAtom)
    const activeList = useAtomValue(activeListAtom)

    const todo = data.find(item => item.list === activeList)?.todos.find(todo => todo.id === id)

    const toggleTodo = () => {
        setData(prevTodos => prevTodos.map(list =>
            list.list === activeList ? {
                ...list,
                todos: list.todos.map(todo =>
                    todo.id === id ? { ...todo, completed: !todo.completed } : todo
                )
            } : list
        ));
    };

    const deleteTodo = () => {
        setData(prevTodos => prevTodos.map(list =>
            list.list === activeList ? {
                ...list,
                todos: list.todos.filter(todo => todo.id !== id)
            } : list
        ));
    };

    if (!todo) {
        return null;
    }

    return (
        <div className='flex items-center gap-2'>
            <Checkbox checked={todo.completed} onCheckedChange={toggleTodo} />
            <div className='grow'>{todo.title}</div>
            <Button onClick={deleteTodo} variant={'ghost'}>delete</Button>
        </div>
    )
}