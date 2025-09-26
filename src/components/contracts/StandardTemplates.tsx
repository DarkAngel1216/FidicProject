import React, { useState } from 'react';
import { LayoutSettings } from './LayoutSettings';

export function StandardTemplates() {
  const [logo, setLogo] = useState<string | null>(null);
  const [title, setTitle] = useState('Standard FIDIC Contract');
  const [font, setFont] = useState('Arial');

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Standard FIDIC Templates</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Upload Standard Template</label>
        <input type="file" className="mt-1 block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer focus:outline-none" />
      </div>
      <LayoutSettings 
        logo={logo} 
        setLogo={setLogo} 
        title={title} 
        setTitle={setTitle} 
        font={font} 
        setFont={setFont} 
      />
    </div>
  );
}