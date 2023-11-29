import { ModeToggle } from "@/components/mode-toggle"

export const Navbar = () =>{

    return (
        <nav className="flex items-center justify-between border-b p-1">
<div className="font-medium ml-2">Todo App</div>
<ModeToggle />
        </nav>
    )
}