import { useAtom, useAtomValue } from "jotai"
import { dataAtom,  activeListAtom } from '@/lib/atoms'
import { SidebarForm } from '@/components/SidebarForm'
import { Button } from "@/components/ui/button"

export const Sidebar = () => {

    const data = useAtomValue(dataAtom)
    const [activeList, setActiveList] = useAtom(activeListAtom)


    return (
        <div className="w-[250px] border-r flex flex-col">
            <div className="grow flex flex-col">
                {data.map((item, index)=>
                    <Button variant={'ghost'} key={index} onClick={() => setActiveList(item.list)} className={`${activeList === item.list ? 'bg-foreground/10' : ''} hover:bg-foreground/30  m-2`}>{item.list}</Button>
                )}
            </div>
            <SidebarForm />
        </div>
    )
}