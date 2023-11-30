import { todosSignal, activeListAtom } from "@/lib/signals";
import { SidebarForm } from "@/components/SidebarForm";
import { Button } from "@/components/ui/button";

export const Sidebar = () => {
  return (
    <div className="w-[250px] border-r hidden md:flex flex-col">
      <div className="grow flex flex-col">
        {todosSignal.value.map((item, index) => (
          <Button
            variant={"ghost"}
            key={index}
            onClick={() => {
              activeListAtom.value = item.list;
            }}
            className={`${
              activeListAtom.value === item.list ? "bg-foreground/10" : ""
            } hover:bg-foreground/30  m-2`}
          >
            {item.list}
          </Button>
        ))}
      </div>
      <SidebarForm />
    </div>
  );
};
