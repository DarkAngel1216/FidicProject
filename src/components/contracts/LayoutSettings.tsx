import React, { useState } from 'react';
import { ContractEditor } from './ContractEditor';

interface LayoutSettingsProps {
  logo: string | null;
  setLogo: (logo: string | null) => void;
  title: string;
  setTitle: (title: string) => void;
  font: string;
  setFont: (font: string) => void;
}

export function LayoutSettings({ logo, setLogo, title, setTitle, font, setFont }: LayoutSettingsProps) {
  const [isEditorOpen, setIsEditorOpen] = useState(false);

  return (
    <div>
      <button 
        onClick={() => setIsEditorOpen(true)} 
        className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
      >
        Open Contract Editor
      </button>

      {isEditorOpen && (
        <ContractEditor
          logo={logo}
          setLogo={setLogo}
          title={title}
          setTitle={setTitle}
          font={font}
          setFont={setFont}
          onClose={() => setIsEditorOpen(false)}
        />
      )}
    </div>
  );
}
