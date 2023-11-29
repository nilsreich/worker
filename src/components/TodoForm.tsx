import { FormEvent, useState } from "react"
import { useSetAtom, useAtomValue } from 'jotai'
import { dataAtom, activeListAtom } from "@/lib/atoms"
import { Input } from  "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { PlusIcon } from "lucide-react"

export const TodoForm = () => {
    const setData = useSetAtom(dataAtom)
    const activeList = useAtomValue(activeListAtom)
    const [value, setValue] = useState('')

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        if (value.trim() === '') { return }
        setData(prevData => prevData.map(list =>
            list.list === activeList ? {
                ...list,
                todos: [...list.todos, { id: crypto.randomUUID(), title: value, completed: false }]
            } : list
        ));
        setValue('')
    }

    return (
        <form onSubmit={e => handleSubmit(e)} className="border-t p-1 flex items-center gap-2">
            <Input type='text' value={value} className="border rounded pl-2" onChange={e => setValue(e.target.value)} placeholder="add todo" /><Button><PlusIcon /></Button>
        </form>
    )
}