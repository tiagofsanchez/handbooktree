import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Toolbar from "./toolbar";
import Placeholder from "@tiptap/extension-placeholder";

const TipTap = ({ description, placeholder, onChange }) => {
  const handleChange = (newContent) => onChange(newContent);
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
            class: `list-disc p-4`,
          },
        },
      }),
      Placeholder.configure({
        emptyEditorClass: "is-editor-empty",
        placeholder: placeholder,
        emptyEditorClass:
          "cursor-text before:content-[attr(data-placeholder)] before:absolute before:top-4 before:left-4 before:text-mauve-11 before:opacity-50 before-pointer-events-none",
      }),
    ],
    content: description,
    placeholder: "Start writing your content here",
    editorProps: {
      attributes: {
        class:
          "2 p-4 flex-1 rounded rounded-t-none border border-stone-300 text-sm text-stone-900 placeholder-stone-300 focus:border-stone-500 focus:outline-none focus:ring-stone-500 dark:border-stone-600 dark:bg-black dark:text-white dark:placeholder-stone-700",
      },
    },
    onUpdate: ({ editor }) => {
      handleChange(editor.getHTML());
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
