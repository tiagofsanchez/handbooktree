import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import { Toaster, toast } from "sonner";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

// TODO:
// Connect to supabase
// - DONE create supabase listings table
// - DONE define the RLS for that specific table
// - DONE create the asycn function that will connect to the supabase table
// - DONE connect to the toaster
// - DONE When the user updates that we should be able to get the dialogue out of the way (was able to control the Dialogue)
// - DONE with the update / refresh with the

export function CreateListingDialog({ userId, open, setOpen, refreshData }) {
  const supabase = useSupabaseClient();
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

  async function addListing({ name, subdomain, userId }) {
    try {
      const updates = {
        name,
        subdomain,
        profile_id: userId,
        created_at: new Date().toISOString(),
      };
      let { error } = await supabase.from("listings").insert(updates);
      if (error) throw error;
      toast.success("You have added a new listing");
      setTimeout(setOpen(false), 2000);
      setTimeout(refreshData(), 2500);
    } catch (error) {
      toast.error(error.message);
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    const values = { name: data.name, subdomain: data.subdomain, userId };
    addListing({ ...values });
  }

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
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
              <Button variant="outline" type="submit">
                Save changes
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
      <Toaster />
    </>
  );
}
