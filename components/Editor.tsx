"use client";

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useResumeStore } from '@/store/resumeStore';
import { Input, Button, Card } from 'antd';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import EditorMenuBar from './EditorMenuBar';
import { PlusCircleIcon, GripVerticalIcon } from 'lucide-react';

const Editor = () => {
  const { personalInfo, sections, projects, updatePersonalInfo, updateSection, addProject, updateProject, removeProject, reorderProjects } = useResumeStore();

  const createEditor = (initialContent: string, onUpdate: (content: string) => void) => {
    return useEditor({
      extensions: [StarterKit],
      content: initialContent,
      onUpdate: ({ editor }) => {
        onUpdate(editor.getHTML());
      },
    });
  };

  const sectionEditors = sections.map((section) => ({
    ...section,
    editor: createEditor(section.content, (content) => updateSection(section.id, content)),
  }));

  const projectEditors = projects.map((project) => ({
    ...project,
    editor: createEditor(project.content, (content) => updateProject(project.id, 'content', content)),
  }));

  const onDragEnd = (result: any) => {
    if (!result.destination) {
      return;
    }
    reorderProjects(result.source.index, result.destination.index);
  };

  return (
    <div className="space-y-6">
      <Card title="Personal Information" className="shadow-md">
        <div className="space-y-2">
          {Object.entries(personalInfo).map(([key, value]) => (
            <Input
              key={key}
              placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
              value={value}
              onChange={(e) => updatePersonalInfo(key, e.target.value)}
              className="w-full"
            />
          ))}
        </div>
      </Card>
      {sectionEditors.map(({ id, title, editor }) => (
        <Card key={id} title={title} className="shadow-md">
          <EditorMenuBar editor={editor} />
          <EditorContent editor={editor} className="prose dark:prose-invert max-w-none" />
        </Card>
      ))}
      <Card title="Projects" className="shadow-md">
        <Button 
          onClick={addProject} 
          className="mb-4 flex items-center"
          icon={<PlusCircleIcon size={16} />}
        >
          Add Project
        </Button>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="projects">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {projectEditors.map((project, index) => (
                  <Draggable key={project.id} draggableId={project.id} index={index}>
                    {(provided) => (
                      <Card
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        className="mb-4 bg-secondary"
                      >
                        <div className="flex items-center mb-2">
                          <div {...provided.dragHandleProps} className="mr-2">
                            <GripVerticalIcon size={16} />
                          </div>
                          <Input
                            value={project.title}
                            onChange={(e) => updateProject(project.id, 'title', e.target.value)}
                            className="flex-grow"
                          />
                        </div>
                        <EditorMenuBar editor={project.editor} />
                        <EditorContent editor={project.editor} className="prose dark:prose-invert max-w-none" />
                        <Button onClick={() => removeProject(project.id)} danger className="mt-2">Remove Project</Button>
                      </Card>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </Card>
    </div>
  );
};

export default Editor;