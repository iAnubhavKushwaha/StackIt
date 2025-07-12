import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import { useState, useEffect } from 'react';

const MenuBar = ({ editor }) => {
  if (!editor) return null;

  const addImage = () => {
    const url = window.prompt('Enter the image URL');
    if (url) editor.chain().focus().setImage({ src: url }).run();
  };

  const setLink = () => {
    const url = window.prompt('Enter the URL');
    if (url) editor.chain().focus().setLink({ href: url }).run();
  };

  const menuButton = (label, command, isActive = false) => (
    <button
      onClick={command}
      className={`px-3 py-1 rounded-md text-sm border ${
        isActive ? 'bg-zinc-200 border-zinc-400' : 'bg-white border-zinc-300'
      } hover:bg-zinc-100 transition`}
    >
      {label}
    </button>
  );

  return (
    <div className="flex flex-wrap gap-2 p-2 border-b border-zinc-300 bg-zinc-50 rounded-t-md">
      {menuButton('Bold', () => editor.chain().focus().toggleBold().run(), editor.isActive('bold'))}
      {menuButton('Italic', () => editor.chain().focus().toggleItalic().run(), editor.isActive('italic'))}
      {menuButton('H2', () => editor.chain().focus().toggleHeading({ level: 2 }).run(), editor.isActive('heading', { level: 2 }))}
      {menuButton('Bullet List', () => editor.chain().focus().toggleBulletList().run(), editor.isActive('bulletList'))}
      {menuButton('Ordered List', () => editor.chain().focus().toggleOrderedList().run(), editor.isActive('orderedList'))}
      {menuButton('Link', setLink, editor.isActive('link'))}
      {menuButton('Image', addImage)}
    </div>
  );
};

const RichTextEditor = ({ value, onChange, placeholder = 'Write something...' }) => {
  const [editorContent, setEditorContent] = useState(value || '');

  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      Link.configure({ openOnClick: false }),
    ],
    content: editorContent,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      setEditorContent(html);
      if (onChange) onChange(html);
    },
    editorProps: {
      attributes: {
        class: 'p-4 min-h-[150px] focus:outline-none text-sm text-zinc-800',
      },
    },
  });

  useEffect(() => {
    if (editor && value !== undefined && value !== editor.getHTML()) {
      editor.commands.setContent(value);
    }
  }, [value, editor]);

  return (
    <div className="border border-zinc-300 rounded-md bg-white shadow-sm">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};

export default RichTextEditor;