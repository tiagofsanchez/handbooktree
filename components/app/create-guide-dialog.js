import { DialogTitle } from "@radix-ui/react-dialog";
import { Dialog, DialogContent, DialogHeader } from "../ui/dialog";


// TODO 
// UI for the form to create the title of guide
// UI needs to be similar to the UI of the other Dialog 
// Create the title and refresh on the page that was just created so that the user can do the proper write up for the guide.

const CreateGuideDialog = ({ open, setOpen }) => {
  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className=" border-stone-700 -pt-6 -px-6">
          <DialogHeader className="">
            <DialogTitle className="text-2xl">This is the guide dialogue</DialogTitle>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CreateGuideDialog;
