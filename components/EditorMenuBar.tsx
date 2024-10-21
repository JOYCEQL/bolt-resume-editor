import { Editor } from '@tiptap/react';
import { Button, Tooltip } from 'antd';
import { BoldIcon, ItalicIcon, ListIcon, ListOrderedIcon, Heading2Icon } from 'lucide-react';

interface EditorMenuBarProps {
  editor: Editor | null;
}

const EditorMenuBar: React.FC<EditorMenuBarProps> = ({ editor }) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="flex space-x-2 mb-2 p-1 bg-secondary rounded-md">
      <Tooltip title="Bold">
        <Button
          icon={<BoldIcon size={16} />}
          onClick={() => editor.chain().focus().toggleBold().run()}
          type={editor.isActive('bold') ? 'primary' : 'default'}
          className="editor-button"
        />
      </Tooltip>
      <Tooltip title="Italic">
        <Button
          icon={<ItalicIcon size={16} />}
          onClick={() => editor.chain().focus().toggleItalic().run()}
          type={editor.isActive('italic') ? 'primary' : 'default'}
          className="editor-button"
        />
      </Tooltip>
      <Tooltip title="Bullet List">
        <Button
          icon={<ListIcon size={16} />}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          type={editor.isActive('bulletList') ? 'primary' : 'default'}
          className="editor-button"
        />
      </Tooltip>
      <Tooltip title="Numbered List">
        <Button
          icon={<ListOrderedIcon size={16} />}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          type={editor.isActive('orderedList') ? 'primary' : 'default'}
          className="editor-button"
        />
      </Tooltip>
      <Tooltip title="Heading">
        <Button
          icon={<Heading2Icon size={16} />}
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          type={editor.isActive('heading', { level: 2 }) ? 'primary' : 'default'}
          className="editor-button"
        />
      </Tooltip>
    </div>
  );
};

export default EditorMenuBar;