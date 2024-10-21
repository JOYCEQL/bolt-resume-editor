import { create } from 'zustand';

interface Project {
  id: string;
  title: string;
  content: string;
}

interface ResumeSection {
  id: string;
  title: string;
  content: string;
}

interface ResumeState {
  personalInfo: {
    name: string;
    email: string;
    phone: string;
    location: string;
  };
  sections: ResumeSection[];
  projects: Project[];
  updatePersonalInfo: (field: string, value: string) => void;
  updateSection: (id: string, content: string) => void;
  addProject: () => void;
  updateProject: (id: string, field: 'title' | 'content', value: string) => void;
  removeProject: (id: string) => void;
  reorderProjects: (startIndex: number, endIndex: number) => void;
}

export const useResumeStore = create<ResumeState>((set) => ({
  personalInfo: {
    name: '',
    email: '',
    phone: '',
    location: '',
  },
  sections: [
    { id: 'summary', title: 'Professional Summary', content: '<p>Your professional summary here...</p>' },
    { id: 'experience', title: 'Work Experience', content: '<p>Your work experience here...</p>' },
    { id: 'education', title: 'Education', content: '<p>Your education details here...</p>' },
    { id: 'skills', title: 'Skills', content: '<p>Your skills here...</p>' },
  ],
  projects: [
    { id: '1', title: 'Project 1', content: '<p>Project 1 details...</p>' },
  ],
  updatePersonalInfo: (field, value) =>
    set((state) => ({
      personalInfo: { ...state.personalInfo, [field]: value },
    })),
  updateSection: (id, content) =>
    set((state) => ({
      sections: state.sections.map((section) =>
        section.id === id ? { ...section, content } : section
      ),
    })),
  addProject: () =>
    set((state) => ({
      projects: [...state.projects, { id: Date.now().toString(), title: 'New Project', content: '<p>Project details...</p>' }],
    })),
  updateProject: (id, field, value) =>
    set((state) => ({
      projects: state.projects.map((project) =>
        project.id === id ? { ...project, [field]: value } : project
      ),
    })),
  removeProject: (id) =>
    set((state) => ({
      projects: state.projects.filter((project) => project.id !== id),
    })),
  reorderProjects: (startIndex, endIndex) =>
    set((state) => {
      const newProjects = Array.from(state.projects);
      const [reorderedItem] = newProjects.splice(startIndex, 1);
      newProjects.splice(endIndex, 0, reorderedItem);
      return { projects: newProjects };
    }),
}));