import { CirclePlus } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function DialogListing() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="absolute bottom-4 right-4  bg-stone-200/30 rounded  p-2 hover:bg-gradient-to-br hover:to-pink-300 hover:from-rose-900"
        >
          <CirclePlus size={32} />{" "}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[450px] border-stone-700 py-10  ">
        <DialogHeader>
          <DialogTitle className="text-2xl mb-6">Add you listing</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4"></div>
        <DialogFooter>
          <Button variant="secondary" type="submit">
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
