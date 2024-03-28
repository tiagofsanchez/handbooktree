import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Toolbar from "./toolbar";
import Heading from "@tiptap/extension-heading";
import BulletList from "@tiptap/extension-bullet-list";

const TipTap = ({ description }) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          HTMLAttributes: {
            class: `text-2xl`,
            levels: [1],
          },
        },
        bulletList: {
          HTMLAttributes: {
            class: `list-disc p-2`,
          },
        },
      }),
    ],
    content: description,
    editorProps: {
      attributes: {
        class:
          "2 p-4 flex-1 rounded rounded-t-none border border-stone-300 text-sm text-stone-900 placeholder-stone-300 focus:border-stone-500 focus:outline-none focus:ring-stone-500 dark:border-stone-600 dark:bg-black dark:text-white dark:placeholder-stone-700",
      },
    },
  });

  return (
    <div>
      <Toolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};

export default TipTap;
