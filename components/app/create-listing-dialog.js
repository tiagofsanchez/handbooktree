import { CirclePlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";

// TODO:
// Connect to supabase
// - create supabase listings table
// - define the RLS for that specific table
// - create the asycn function that will connect to the supabase table

export function CreateListingDialog() {
  const [data, setData] = useState({
    name: "",
    subdomain: "",
  });

  useEffect(() => {
    setData((prev) => ({
      ...prev,
      subdomain: prev.name
        .toLowerCase()
        .trim()
        .replace(/[\W_]+/g, "-"),
    }));
  }, [data.name]);

  function handleSubmit(event) {
    event.preventDefault(); // prevent the form from submitting
    console.log("Input value on submit: ");
    console.log(data);
  }

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
      <DialogContent className="sm:max-w-[450px] border-stone-700 -p-6">
        <DialogHeader className="pt-8 px-8">
          <DialogTitle className="text-2xl">Add your listing</DialogTitle>
        </DialogHeader>
        <form action="" onSubmit={handleSubmit}>
          <div className="p-8 space-y-4">
            <div className="flex flex-col space-y-2">
              <label
                htmlFor="name"
                className="text-sm font-medium text-stone-500 dark:text-stone-400"
              >
                Site Name
              </label>
              <input
                name="name"
                type="text"
                placeholder="My Awesome Site"
                // autoFocus
                value={data.name}
                onChange={(e) => setData({ ...data, name: e.target.value })}
                maxLength={32}
                required
                className="w-full rounded-md border border-stone-200 bg-stone-50 px-4 py-2 text-sm text-stone-600 placeholder:text-stone-400 focus:border-black focus:outline-none focus:ring-black dark:border-stone-600 dark:bg-black dark:text-white dark:placeholder-stone-700 dark:focus:ring-white"
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label
                htmlFor="subdomain"
                className="text-sm font-medium text-stone-500"
              >
                Subdomain
              </label>
              <div className="flex w-full max-w-md">
                <input
                  name="subdomain"
                  type="text"
                  placeholder="subdomain"
                  value={data.subdomain}
                  onChange={(e) =>
                    setData({ ...data, subdomain: e.target.value })
                  }
                  autoCapitalize="off"
                  pattern="[a-zA-Z0-9\-]+" // only allow lowercase letters, numbers, and dashes
                  maxLength={32}
                  required
                  className="w-full rounded-l-lg border border-stone-200 bg-stone-50 px-4 py-2 text-sm text-stone-600 placeholder:text-stone-400 focus:border-black focus:outline-none focus:ring-black dark:border-stone-600 dark:bg-black dark:text-white dark:placeholder-stone-700 dark:focus:ring-white"
                />
                <div className="flex items-center rounded-r-lg border border-l-0 border-stone-200 bg-stone-100 px-3 text-sm dark:border-stone-600 dark:bg-stone-800 dark:text-stone-400">
                  .{process.env.NEXT_PUBLIC_ROOT_DOMAIN}
                </div>
              </div>
            </div>
          </div>
          <div className="grid rounded-b-lg border-t border-stone-200 bg-stone-50  py-3 dark:border-stone-700 dark:bg-stone-800 px-8">
            <Button variant="outline" type="submit" >
              Save changes
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
