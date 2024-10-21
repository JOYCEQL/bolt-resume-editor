import { FC } from 'react';
import { useResumeStore } from '@/store/resumeStore';
import { Card } from 'antd';

const Preview: FC = () => {
  const { personalInfo, sections, projects } = useResumeStore();

  return (
    <Card id="resume-preview" className="bg-background shadow-md">
      <div className="prose dark:prose-invert max-w-none">
        <h1 className="text-3xl font-bold mb-2">{personalInfo.name}</h1>
        <p className="text-sm mb-4">{personalInfo.email} | {personalInfo.phone} | {personalInfo.location}</p>
        
        {sections.map((section) => (
          <div key={section.id} className="mb-6">
            <h2 className="text-2xl font-semibold border-b-2 border-primary mb-2">{section.title}</h2>
            <div dangerouslySetInnerHTML={{ __html: section.content }} />
          </div>
        ))}
        
        <div className="mb-6">
          <h2 className="text-2xl font-semibold border-b-2 border-primary mb-2">Projects</h2>
          {projects.map((project) => (
            <div key={project.id} className="mb-4">
              <h3 className="text-xl font-medium">{project.title}</h3>
              <div dangerouslySetInnerHTML={{ __html: project.content }} />
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default Preview;