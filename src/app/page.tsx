"use client";
import React, { useState } from 'react';
import dynamic from 'next/dynamic';

const MdEditor = dynamic(() => import('react-markdown-editor-lite'), { ssr: false });
const ReactMarkdown = dynamic(() => import('react-markdown'), { ssr: false });

const Home = () => {
  const [markdown, setMarkdown] = useState('');

  const handleEditorChange = ({ text }) => {
    setMarkdown(text);
  };

  const saveMarkdown = () => {
    const blob = new Blob([markdown], { type: 'text/markdown' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'document.md';
    a.click();
  };

  const printToPDF = () => {
    window.electron.printToPDF(markdown).then((filePath) => {
      console.log('PDF saved to:', filePath);
    }).catch((error) => {
      console.error('Failed to save PDF:', error);
    });
  };

  return (
    <div>
      <MdEditor
        value={markdown}
        style={{ height: "500px" }}
        onChange={handleEditorChange}
      />
      <button onClick={saveMarkdown}>Save Markdown</button>
      <button onClick={printToPDF}>Export to PDF</button>
      <ReactMarkdown>{markdown}</ReactMarkdown>
    </div>
  );
};

export default Home;
