import { DialogTitle } from "@radix-ui/react-dialog";
import { Dialog, DialogContent, DialogHeader } from "../ui/dialog";
import { useState } from "react";
import { Button } from "../ui/button";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { Toaster, toast } from "sonner";
import { useRouter } from "next/router";

import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

// TODO
// UI for the form to create the title of guide
// UI needs to be similar to the UI of the other Dialog
// Create the title and refresh on the page that was just created so that the user can do the proper write up for the guide.

const type = [
  {
    value: "house guide",
    label: "House Guide",
  },
  {
    value: "local tips",
    label: "Local Tips",
  },
];

const CreateGuideDialog = ({ open, setOpen, listingId }) => {
  const supabase = useSupabaseClient();
  const router = useRouter();
  const [data, setTitle] = useState({ title: "", type: "" });
  const [cobOpen, setCobOpen] = useState(false);
  const [value, setValue] = useState("")

  async function addGuide({ title, listingId }) {
    try {
      const updates = {
        title,
        listing_id: listingId,
        created_at: new Date().toISOString(),
      };
      let { error, data } = await supabase
        .from("guides")
        .insert(updates)
        .select();
      if (error) throw error;
      toast.success("You have added a new guide");
      setTimeout(setOpen(false), 2000);
      router.push(`/guide/${data[0].id}`);
    } catch (error) {
      toast.error(error.message);
      setTimeout(setOpen(false), 2000);
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    const values = { title: data.title, listingId };
    addGuide({ ...values });
  }

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[450px] border-stone-700 -p-6 ">
          <DialogHeader className="pt-8 px-8">
            <DialogTitle className="text-2xl">Add a new guide</DialogTitle>
          </DialogHeader>
          <form action="" onSubmit={handleSubmit}>
            <div className="p-8 space-y-4">
              <div className="flex flex-col space-y-2">
                <label
                  htmlFor="name"
                  className="text-sm font-medium text-stone-500 dark:text-stone-400"
                >
                  Guide Name
                </label>
                <input
                  name="title"
                  type="text"
                  placeholder="My new guide ... "
                  value={data.title}
                  onChange={(e) => setTitle({ title: e.target.value })}
                  maxLength={32}
                  required
                  className="w-full rounded-md border border-stone-200 bg-stone-50 px-4 py-2 text-sm text-stone-600 placeholder:text-stone-400 focus:border-black focus:outline-none focus:ring-black dark:border-stone-600 dark:bg-black dark:text-white dark:placeholder-stone-700 dark:focus:ring-white"
                />
              </div>
            </div>
            <Popover open={cobOpen} onOpenChange={setCobOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={cobOpen}
                  className="w-[200px] justify-between"
                >
                  {value
                    ? type.find((type) => type.value === value)
                        ?.label
                    : "Select type..."}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[200px] p-0">
                <Command>
                  <CommandInput placeholder="Search type..." />
                  <CommandList>
                    <CommandEmpty>No type found.</CommandEmpty>
                    <CommandGroup>
                      {type.map((type) => (
                        <CommandItem
                          key={type.value}
                          value={type.value}
                          onSelect={(currentValue) => {
                            setValue(
                              currentValue === value ? "" : currentValue
                            );
                            setCobOpen(false);
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              value === type.value
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                          {type.label}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
            <div className="grid rounded-b-lg border-t border-stone-200 bg-stone-50  py-3 dark:border-stone-700 dark:bg-stone-800 px-8">
              <Button type="submit">Save changes</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
      <Toaster />
    </>
  );
};

export default CreateGuideDialog;
