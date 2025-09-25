import React, { useState, useRef } from 'react';
import { ArrowRightIcon, ZapIcon, BrainIcon, HistoryIcon, CheckIcon, FileTextIcon, CodeIcon, UserIcon, XIcon, ThumbsUpIcon, ThumbsDownIcon, SendIcon, GitCommitIcon, EditIcon, GitBranchIcon, DownloadIcon, UploadIcon } from 'lucide-react';
import jsPDF from 'jspdf';
import { AIAssistant } from '../../ai/AIAssistant';

const redBookContent = `
Clause 8.4 - Extension of Time for Completion
The Contractor shall be entitled subject to Sub-Clause 20.1 [Contractor's Claims] to an extension of the Time for Completion if and to the extent that completion for the purposes of Sub-Clause 10.1 [Taking Over of the Works and Sections] is or will be delayed by any of the following causes:
a) a Variation (unless an adjustment to the Time for Completion has been agreed under Sub-Clause 13.3 [Variation Procedure])
b) a cause of delay giving an entitlement to extension of time under a Sub-Clause of these Conditions
c) exceptionally adverse climatic conditions
d) Unforeseeable shortages in the availability of personnel or Goods caused by epidemic or governmental actions

Clause 14.7 - Payment
Payment shall be made by the Employer to the Contractor in accordance with the provisions of this Clause.

Clause 15.2 - Termination by Employer
The Employer shall be entitled to terminate the Contract if the Contractor:
a) fails to comply with a notice to correct
b) abandons the Works or otherwise plainly demonstrates the intention not to continue performance of his obligations under the Contract

Clause 19.1 - Force Majeure
"Force Majeure" means an exceptional event or circumstance:
a) which is beyond a Party's control;
b) which such Party could not reasonably have provided against before entering into the Contract;
c) which, having arisen, such Party could not reasonably have avoided or overcome; and
d) which is not substantially attributable to the other Party.

Clause 20.1 - Contractor's Claims
If the Contractor considers himself to be entitled to any extension of the Time for Completion and/or any additional payment, under any Clause of these Conditions or otherwise in connection with the Contract, the Contractor shall give notice to the Engineer, describing the event or circumstance giving rise to the claim. The notice shall be given as soon as practicable, and not later than 28 days after the Contractor became aware, or should have become aware, of the event or circumstance.
`;

const yellowBookContent = `This is the content for FIDIC Yellow Book 2017.

Clause 1: General Provisions
...
`;
const silverBookContent = `This is the content for FIDIC Silver Book 2017.

Clause 1: General Provisions
...
`;

const initialTemplates = [{
  id: 'fidic-red-book',
  name: 'FIDIC Red Book 2017',
  description: 'Conditions of Contract for Construction',
  content: redBookContent
}, {
  id: 'fidic-yellow-book',
  name: 'FIDIC Yellow Book 2017',
  description: 'Plant and Design-Build',
  content: yellowBookContent
}, {
  id: 'fidic-silver-book',
  name: 'FIDIC Silver Book 2017',
  description: 'EPC/Turnkey Projects',
  content: silverBookContent
}];

// Simple diff function
const generateDiff = (original, modified) => {
  const originalLines = original.split('\n');
  const modifiedLines = modified.split('\n');
  const diff = [];
  let i = 0, j = 0;
  while (i < originalLines.length || j < modifiedLines.length) {
    if (i < originalLines.length && i === j && originalLines[i] === modifiedLines[j]) {
      diff.push({ type: 'unchanged', content: originalLines[i] });
      i++;
      j++;
    } else {
      const originalLine = i < originalLines.length ? originalLines[i] : null;
      const modifiedLine = j < modifiedLines.length ? modifiedLines[j] : null;

      if (originalLine !== null && modifiedLines.indexOf(originalLine) === -1) {
         diff.push({ type: 'removed', content: originalLine });
         i++;
      } else if (modifiedLine !== null && originalLines.indexOf(modifiedLine) === -1) {
        diff.push({ type: 'added', content: modifiedLine });
        j++;
      } else {
        if(originalLine) diff.push({ type: 'unchanged', content: originalLine });
        i++;
        j++;
      }
    }
  }
  return diff;
};

export function ContractDrafting({
  onContinue,
  language = 'english'
}) {
  const isRTL = language === 'arabic';
  const [templates, setTemplates] = useState(initialTemplates);
  const [selectedTemplate, setSelectedTemplate] = useState('fidic-red-book');
  const [showAiAssistant, setShowAiAssistant] = useState(false);
  const [contractContent, setContractContent] = useState(templates.find(t => t.id === selectedTemplate)?.content || '');
  const [originalContractContent, setOriginalContractContent] = useState(templates.find(t => t.id === selectedTemplate)?.content || '');
  const [viewMode, setViewMode] = useState('edit'); // 'edit' or 'diff'
  const [showNamePopup, setShowNamePopup] = useState(false);
  const [draftName, setDraftName] = useState('');
  
  const editorContainerRef = useRef(null);
  const textareaRef = useRef(null);
  const fileInputRef = useRef(null);

  const handleAiAssistantToggle = () => {
    setShowAiAssistant(!showAiAssistant);
  };

  const handleTemplateSelect = (templateId) => {
    const template = templates.find(t => t.id === templateId);
    if (template) {
      setSelectedTemplate(templateId);
      setContractContent(template.content);
      setOriginalContractContent(template.content);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target.result;
        const newTemplate = {
          id: `custom-${Date.now()}`,
          name: file.name,
          description: 'Custom uploaded template',
          content: content,
        };
        setTemplates(prevTemplates => [...prevTemplates, newTemplate]);
        handleTemplateSelect(newTemplate.id);
      };
      reader.readAsText(file);
    }
  };

  const handleResetToOriginal = () => {
    setContractContent(originalContractContent);
  };

  const handleSaveChanges = () => {
    // In a real app, this would save the entire contract to the backend.
    // For this demo, we can update the original content state.
    setOriginalContractContent(contractContent);
    alert('Contract changes saved!');
  };

  const handleDownload = () => {
    handleSaveChanges();
    const doc = new jsPDF();
    doc.text(contractContent, 10, 10);
    doc.save('contract-draft.pdf');
  };

  const handleSaveAndContinue = () => {
    if (draftName.trim() === '') {
        alert('Please enter a name for the draft.');
        return;
    }
    onContinue(draftName);
    setShowNamePopup(false);
  };

  const diffResult = generateDiff(originalContractContent, contractContent);

  return <div className="space-y-6"> 
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="text-sm font-medium text-blue-800 mb-2">
          {isRTL ? 'صياغة العقد' : 'Contract Drafting'}
        </h3>
        <p className="text-xs text-blue-700">
          {isRTL ? 'اختر قالب FIDIC كأساس، ثم قم بتعديل العقد بالكامل حسب احتياجات مشروعك. سيصبح هذا قالب العقد الذي سيتم إرساله إلى المقاولين لاحقًا.' : 'Choose a FIDIC template as your baseline, then edit the full contract to suit your project needs. This will become your contract template to be sent to contractors later.'}
        </p>
      </div>
      <div className={`flex ${showAiAssistant ? 'space-x-6' : ''}`}> 
        <div className={`${showAiAssistant ? 'w-2/3' : 'w-full'} space-y-4`}> 
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1 space-y-4">
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-sm font-medium text-gray-800">
                    {isRTL ? 'اختر قالب FIDIC' : 'Select FIDIC Template'}
                  </h3>
                  <button onClick={handleUploadClick} className="text-xs text-blue-600 hover:text-blue-800 flex items-center">
                      <UploadIcon size={14} className="mr-1" />
                      {isRTL ? 'تحميل قالب' : 'Upload Template'}
                  </button>
                  <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      className="hidden"
                      accept=".txt,.md,.html"
                  />
                </div>
                <div className="space-y-2">
                  {templates.map(template => <div key={template.id} className={`border rounded-lg p-3 cursor-pointer transition-all duration-200 ${selectedTemplate === template.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:bg-gray-50'}`} onClick={() => handleTemplateSelect(template.id)}>
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mt-0.5">
                          <input type="radio" className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500" checked={selectedTemplate === template.id} readOnly />
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium text-gray-900">
                            {template.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {template.description}
                          </p>
                        </div>
                      </div>
                    </div>)}
                </div>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <h3 className="text-sm font-medium text-gray-800 mb-3 flex items-center">
                  <ZapIcon size={16} className="mr-2 text-blue-600" />
                  {isRTL ? 'المساعد الذكي' : 'AI Assistant'}
                </h3>
                <p className="text-xs text-gray-600 mb-3">
                  {isRTL ? 'احصل على مساعدة في صياغة العقد من المساعد الذكي المتخصص في عقود FIDIC.' : 'Get help with contract drafting from our AI assistant specialized in FIDIC contracts.'}
                </p>
                <button className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 flex items-center justify-center transition-colors duration-200" onClick={handleAiAssistantToggle}>
                  <BrainIcon size={24} className={isRTL ? 'ml-2' : 'mr-2'} />
                  {isRTL ? showAiAssistant ? 'إخفاء المساعد الذكي' : 'إظهار المساعد الذكي' : showAiAssistant ? 'Hide AI Assistant' : 'Show AI Assistant'}
                </button>
              </div>
            </div>
            <div className="md:col-span-2">
              <div ref={editorContainerRef} className="bg-white border border-gray-200 rounded-lg p-4 relative">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center">
                    <h3 className="text-sm font-medium text-gray-800">
                      {isRTL ? 'تحرير العقد' : 'Edit Contract'}
                    </h3>
                     <div className="ml-3 flex space-x-2">
                      <button className={`px-3 py-1.5 text-xs font-medium rounded-lg flex items-center transition-colors duration-200 ${viewMode === 'edit' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`} onClick={() => setViewMode('edit')}> 
                      <EditIcon size={14} className="mr-1" />
                      {isRTL ? 'تحرير' : 'Edit'}
                    </button>
                      <button className={`px-3 py-1.5 text-xs font-medium rounded-lg flex items-center transition-colors duration-200 ${viewMode === 'diff' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`} onClick={() => setViewMode('diff')}> 
                      <GitCommitIcon size={14} className="mr-1" />
                      {isRTL ? 'عرض التغييرات' : 'View Changes'}
                    </button>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button className="px-3 py-1.5 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center transition-colors duration-200" onClick={handleResetToOriginal}>
                      <HistoryIcon size={14} className="mr-1" />
                      {isRTL ? 'إعادة تعيين إلى الأصل' : 'Reset to Original'}
                    </button>
                    <button className="px-3 py-1.5 text-xs font-medium text-blue-700 bg-blue-50 rounded-lg hover:bg-blue-100 flex items-center transition-colors duration-200" onClick={handleSaveChanges}>
                      <CheckIcon size={14} className="mr-1" />
                      {isRTL ? 'حفظ التغييرات' : 'Save Changes'}
                    </button>
                    <button className="px-3 py-1.5 text-xs font-medium text-blue-700 bg-blue-50 rounded-lg hover:bg-blue-100 flex items-center transition-colors duration-200" onClick={handleDownload}>
                      <DownloadIcon size={14} className="mr-1" />
                      {isRTL ? 'تحميل' : 'Download'}
                    </button>
                  </div>
                </div>
                <div className="mb-3">
                  <p className="text-xs text-gray-500 mb-2 flex items-center">
                    <FileTextIcon size={14} className="mr-1" />
                    {templates.find(t => t.id === selectedTemplate)?.name} Template
                  </p>
                </div>
                <div className="border border-gray-300 rounded-lg bg-white overflow-hidden">
                 {viewMode === 'edit' ? (
                    <div className="p-3 relative">
                        <textarea ref={textareaRef} className="w-full h-[600px] text-sm text-gray-800 focus:outline-none resize-y" value={contractContent} onChange={e => setContractContent(e.target.value)}></textarea>
                        {/* Floating action buttons */}
                        <div className="absolute bottom-3 right-3 flex space-x-2">
                          <button className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-600 transition-colors duration-200" title="Format text">
                            <CodeIcon size={14} />
                          </button>
                          <button className="p-2 bg-blue-100 hover:bg-blue-200 rounded-full text-blue-600 transition-colors duration-200" title="AI suggestions" onClick={() => setShowAiAssistant(true)}>
                            <ZapIcon size={14} />
                          </button>
                        </div>
                      </div>
                  ) : (
                    <div className="w-full h-[600px] text-sm text-gray-800 overflow-y-auto font-mono">
                      <div className="flex text-xs text-gray-500 bg-gray-50 p-2 border-b border-gray-200">
                        <div className="w-1/2 border-r border-gray-200 px-2">
                          <div className="flex items-center">
                            <GitBranchIcon size={12} className="mr-1" />
                            {isRTL ? 'النسخة السابقة' : 'Previous Version'}
                          </div>
                        </div>
                        <div className="w-1/2 px-2">
                          <div className="flex items-center">
                            <GitBranchIcon size={12} className="mr-1" />
                            {isRTL ? 'النسخة الحالية' : 'Current Version'}
                          </div>
                        </div>
                      </div>
                      {diffResult.map((line, index) => {
                    if (line.type === 'unchanged') {
                      return <div key={index} className="flex hover:bg-gray-50">
                              <div className="w-1/2 border-r border-gray-200 px-3 py-1 whitespace-pre-wrap">
                                {line.content}
                              </div>
                              <div className="w-1/2 px-3 py-1 whitespace-pre-wrap">
                                {line.content}
                              </div>
                            </div>;
                    } else if (line.type === 'removed') {
                      return <div key={index} className="flex hover:bg-red-50">
                              <div className="w-1/2 border-r border-gray-200 px-3 py-1 bg-red-50 text-red-800 whitespace-pre-wrap">
                                <span className="mr-1 text-red-600 font-bold">
                                  -
                                </span>
                                <span className="bg-red-100 px-1 py-0.5 rounded">
                                  {line.content}
                                </span>
                              </div>
                              <div className="w-1/2 px-3 py-1 whitespace-pre-wrap"></div>
                            </div>;
                    } else if (line.type === 'added') {
                      return <div key={index} className="flex hover:bg-green-50">
                              <div className="w-1/2 border-r border-gray-200 px-3 py-1 whitespace-pre-wrap"></div>
                              <div className="w-1/2 px-3 py-1 bg-green-50 text-green-800 whitespace-pre-wrap">
                                <span className="mr-1 text-green-600 font-bold">
                                  +
                                </span>
                                <span className="bg-green-100 px-1 py-0.5 rounded">
                                  {line.content}
                                </span>
                              </div>
                            </div>;
                    }
                    return null;
                  })}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        {showAiAssistant && (
          <div className="w-1/3">
            <AIAssistant onClose={() => setShowAiAssistant(false)} isRTL={isRTL} />
          </div>
        )}
      </div>
      <div className="flex justify-between items-center pt-4 border-t border-gray-200">
        <div>
          <p className="text-sm text-gray-700">
            {isRTL ? 'العقد جاهز للموافقة' : 'Contract ready for approval'}
          </p>
        </div>
        <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 flex items-center transition-colors duration-200" onClick={() => setShowNamePopup(true)}>
          {isRTL ? 'المتابعة إلى موافقة الصياغة' : 'Continue to Drafting Approval'}
          <ArrowRightIcon size={16} className="ml-2" />
        </button>
      </div>
      
      {showNamePopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-xl w-1/3">
                <h3 className="text-lg font-medium mb-4">Name Your Draft</h3>
                <input
                    type="text"
                    value={draftName}
                    onChange={(e) => setDraftName(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md mb-4"
                    placeholder="e.g., Metro Line 3 - Final Draft"
                />
                <div className="flex justify-end space-x-2">
                    <button onClick={() => setShowNamePopup(false)} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
                        Cancel
                    </button>
                    <button onClick={handleSaveAndContinue} className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700">
                        Save and Continue
                    </button>
                </div>
            </div>
        </div>
      )}
    </div>
}