import React, { useState } from 'react';
import { useTemplates } from '../../context/TemplateContext';
import { LayoutSettings } from './LayoutSettings';

export function StandardTemplates() {
  const { templates, addTemplate, updateTemplate } = useTemplates();
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        addTemplate({
          name: file.name,
          description: 'Custom uploaded template',
          content: content,
        });
      };
      reader.readAsText(file);
    }
  };

  const selectedTemplate = templates.find(t => t.id === selectedTemplateId);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Standard FIDIC Templates</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Upload Standard Template</label>
        <input type="file" onChange={handleFileChange} className="mt-1 block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer focus:outline-none" />
      </div>
      <div className="space-y-2">
        {templates.map(template => (
          <div key={template.id} className="border rounded-lg p-3 flex justify-between items-center">
            <div>
              <p className="text-sm font-medium text-gray-900">{template.name}</p>
              <p className="text-xs text-gray-500">{template.description}</p>
            </div>
            <button onClick={() => setSelectedTemplateId(template.id)} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">
              Edit Layout
            </button>
          </div>
        ))}
      </div>
      {selectedTemplate && (
        <LayoutSettings 
          isOpen={!!selectedTemplate}
          onClose={() => setSelectedTemplateId(null)}
          logo={selectedTemplate.logo}
          setLogo={(logo) => updateTemplate(selectedTemplate.id, { logo })}
          title={selectedTemplate.title}
          setTitle={(title) => updateTemplate(selectedTemplate.id, { title })}
          font={selectedTemplate.font}
          setFont={(font) => updateTemplate(selectedTemplate.id, { font })}
          pageColor={selectedTemplate.pageColor || '#FFFFFF'}
          setPageColor={(pageColor) => updateTemplate(selectedTemplate.id, { pageColor })}
          borderColor={selectedTemplate.borderColor || '#000000'}
          setBorderColor={(borderColor) => updateTemplate(selectedTemplate.id, { borderColor })}
          borderWidth={selectedTemplate.borderWidth || 1}
          setBorderWidth={(borderWidth) => updateTemplate(selectedTemplate.id, { borderWidth })}
          logoPosition={selectedTemplate.logoPosition || 'top-left'}
          setLogoPosition={(logoPosition) => updateTemplate(selectedTemplate.id, { logoPosition })}
        />
      )}
    </div>
  );
}