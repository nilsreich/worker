import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "./ui/button";
import { PanelLeft } from "lucide-react";
import { sidebarSignal } from "@/lib/signals";

export const Navbar = () => {
  return (
    <nav className="flex items-center justify-between  h-12">
      <div className="flex items-center gap-2">
        <Button
          variant={"ghost"}
          className="block md:hidden"
          onClick={() => (sidebarSignal.value = !sidebarSignal.value)}
        >
          <PanelLeft className="w-4 h-4"/>
        </Button>
        <div className="font-medium ml-2">Todo App</div>
      </div>
      <ModeToggle />

    </nav>
  );
};
