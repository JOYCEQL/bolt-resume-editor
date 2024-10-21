"use client";

import { useState } from 'react';
import { Layout, Button } from 'antd';
import Editor from '@/components/Editor';
import Preview from '@/components/Preview';
import ThemeToggle from '@/components/ThemeToggle';
import { FileTextIcon, PrinterIcon } from 'lucide-react';

const { Header, Content } = Layout;

export default function Home() {
  const [isPrinting, setIsPrinting] = useState(false);

  const handlePrint = async () => {
    setIsPrinting(true);
    const html2pdf = (await import('html2pdf.js')).default;
    const element = document.getElementById('resume-preview');
    const opt = {
      margin: 10,
      filename: 'resume.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };
    
    try {
      await html2pdf().set(opt).from(element).save();
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      setIsPrinting(false);
    }
  };

  return (
    <Layout className="min-h-screen">
      <Header className="flex justify-between items-center bg-background text-foreground shadow-md">
        <div className="flex items-center">
          <FileTextIcon className="mr-2" size={24} />
          <h1 className="text-2xl font-bold">Resume Editor</h1>
        </div>
        <div className="flex items-center space-x-4">
          <Button
            onClick={handlePrint}
            className="flex items-center"
            icon={<PrinterIcon size={16} className="mr-1" />}
            disabled={isPrinting}
          >
            {isPrinting ? 'Generating PDF...' : 'Export to PDF'}
          </Button>
          <ThemeToggle />
        </div>
      </Header>
      <Content className="flex flex-1 p-4 space-x-4">
        <div className="flex-1 overflow-y-auto">
          <Editor />
        </div>
        <div className="flex-1 overflow-y-auto">
          <Preview />
        </div>
      </Content>
    </Layout>
  );
}