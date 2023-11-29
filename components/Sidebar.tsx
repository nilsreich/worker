import { useAtom, useAtomValue } from "jotai"
import { dataAtom,  activeListAtom } from '../lib/atoms'
import { SidebarForm } from './SidebarForm'

export const Sidebar = () => {

    const data = useAtomValue(dataAtom)
    const [activeList, setActiveList] = useAtom(activeListAtom)


    return (
        <div className="w-[250px] border-r grow flex flex-col">
            <div className="grow">
                {data.map((item, index)=>
                    <button key={index} onClick={() => setActiveList(item.list)} className={`${activeList === item.list ? 'bg-neutral-300' : ''} hover:bg-neutral-200 block`}>{item.list}</button>
                )}
            </div>
            <SidebarForm />
        </div>
    )
}