import { todosSignal, activeListSignal } from "@/lib/signals";
import { Button } from "@/components/ui/button";
import { sidebarSignal } from "@/lib/signals";
import { FormEvent, useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PlusIcon } from "lucide-react";

export const Sidebar = () => {
  const [value, setValue] = useState("");
  const [open, setOpen] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (value.trim() === "") {
      return null;
    }
    todosSignal.value = {
      ...todosSignal.value,
      data: [...todosSignal.value.data, { list: value, todos: [] }],
    };
    setValue("");
    setOpen(false);
  };
  return (
    <div
      className={`w-[250px] ${
        sidebarSignal.value ? " flex" : "hidden"
      } flex-col`}
    >
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild className="">
          <Button variant={"link"} className=" flex gap-2 text-foreground/70">
            <PlusIcon className="w-4 h-4" />
            <span>new list</span>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create a new list</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <form onSubmit={(e) => handleSubmit(e)} className="m-1">
              <Input
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="new List"
              />
              <DialogFooter className="mt-5 -mb-4">
                <Button type="button">Add </Button>
              </DialogFooter>
            </form>
          </div>
        </DialogContent>
      </Dialog>
      <div className="grow flex  flex-col">
        {todosSignal.value.data.map((item, index) => (
          <Button
            variant={"ghost"}
            key={index}
            onClick={() => {
              activeListSignal.value = item.list;
            }}
            className={`${
              activeListSignal.value === item.list ? "bg-foreground/10" : ""
            } hover:bg-foreground/30 justify-start font-normal`}
          >
            {item.list}
          </Button>
        ))}
      </div>
    </div>
  );
};
