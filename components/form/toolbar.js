import { Bold, Italic, List, Heading1 } from "lucide-react";
import { Toggle } from "../ui/toggle";

const Toolbar = ({ editor }) => {
  if (!editor) {
    return null;
  }
  return (
    <div className=" p-1 border border-b-0 border-stone-200 bg-white dark:border-stone-700 dark:bg-black rounded rounded-b-none flex gap-1">
      <Toggle
        size="sm"
        pressed={editor.isActive("heading")}
        onPressedChange={() =>
          editor.chain().focus().toggleHeading({ level: 1 }).run()
        }
      >
        <Heading1 size={18} />
      </Toggle>

      <Toggle
        size="sm"
        pressed={editor.isActive("bold")}
        onPressedChange={() => editor.chain().focus().toggleBold().run()}
      >
        <Bold size={16} />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive("italic")}
        onPressedChange={() => editor.chain().focus().toggleItalic().run()}
      >
        <Italic size={16} />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive("bulletList")}
        onPressedChange={() => editor.chain().focus().toggleBulletList().run()}
      >
        <List size={16} />
      </Toggle>
    </div>
  );
};

export default Toolbar;
