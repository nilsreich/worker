import { FormEvent, useState } from "react"
import { dataAtom } from '../lib/atoms'
import { useAtom } from "jotai"

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
        <form onSubmit={e => handleSubmit(e)}>
            <input type='text' value={value} onChange={e => setValue(e.target.value)} placeholder="new List" />
        </form>
    )
}