import { FormEvent, useState } from "react"
import { dataAtom } from '@/lib/atoms'
import { useAtom } from "jotai"
import { Input } from "@/components/ui/input"

export const SidebarForm = () => {
    const [value, setValue] = useState('')
    const [data, setData] = useAtom(dataAtom)

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        if (value.trim() === '') { return null }
        setData([...data, { list: value, todos: [] }]);
        setValue('')
    }

    return (
        <form onSubmit={e => handleSubmit(e)} className="m-1">
            <Input type='text' value={value} onChange={e => setValue(e.target.value)} placeholder="new List" />
        </form>
    )
}