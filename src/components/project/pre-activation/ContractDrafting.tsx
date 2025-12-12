import React, { useState, useRef } from 'react';
import { ArrowRightIcon, ZapIcon, BrainIcon, HistoryIcon, CheckIcon, FileTextIcon, CodeIcon, UserIcon, XIcon, ThumbsUpIcon, ThumbsDownIcon, SendIcon, GitCommitIcon, EditIcon, GitBranchIcon, DownloadIcon, UploadIcon } from 'lucide-react';
import jsPDF from 'jspdf';
import { AIAssistant } from '../../ai/AIAssistant';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import { useTemplates } from '../../../context/TemplateContext';
import * as Diff from 'diff';

const generateDiff = (original, modified) => {
  const changes = Diff.diffLines(original, modified);
  const result = [];
  let originalLine = 1;
  let modifiedLine = 1;

  if (!changes) return result;

  changes.forEach(part => {
    // Split into lines but keep empty lines that might differ
    const lines = part.value.split('\n');
    // diffLines usually includes a trailing newline for the block, which split creates an empty string for.
    // We strictly want to render content lines.
    if (lines.length > 0 && lines[lines.length - 1] === '') {
      lines.pop();
    }

    lines.forEach(line => {
      if (part.added) {
        result.push({ type: 'added', content: line, oLine: null, mLine: modifiedLine++ });
      } else if (part.removed) {
        result.push({ type: 'removed', content: line, oLine: originalLine++, mLine: null });
      } else {
        result.push({ type: 'unchanged', content: line, oLine: originalLine++, mLine: modifiedLine++ });
      }
    });
  });

  return result;
};

export function ContractDrafting({
  onContinue,
  language = 'english'
}) {
  const isRTL = language === 'arabic';
  const { templates, addTemplate } = useTemplates();
  const [selectedTemplate, setSelectedTemplate] = useState('fidic-red-book');
  const [showAiAssistant, setShowAiAssistant] = useState(false);
  const [contractContent, setContractContent] = useState(templates.find(t => t.id === selectedTemplate)?.content || '');
  const [originalContractContent, setOriginalContractContent] = useState(templates.find(t => t.id === selectedTemplate)?.content || '');
  const [viewMode, setViewMode] = useState('edit'); // 'edit' or 'diff'
  const [showNamePopup, setShowNamePopup] = useState(false);
  const [draftName, setDraftName] = useState('');
  const [isSaved, setIsSaved] = useState(false);

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
      setIsSaved(false);
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
        addTemplate({
          name: file.name,
          description: 'Custom uploaded template',
          content: content,
        });
      };
      reader.readAsText(file);
    }
  };

  const handleResetToOriginal = () => {
    setContractContent(originalContractContent);
    setIsSaved(false);
  };

  const handleSaveChanges = () => {
    setOriginalContractContent(contractContent);
    setIsSaved(true);
    alert('Contract changes saved!');
  };

  const handleDownload = () => {
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

  const selectedTemplateData = templates.find(t => t.id === selectedTemplate);

  const diffResult = generateDiff(originalContractContent, contractContent);

  return (
    <div className="space-y-6">
      <style>{`
        .dark .ql-toolbar.ql-snow {
          background-color: #1f2937; /* gray-800 */
          border-color: #374151; /* gray-700 */
        }
        .dark .ql-container.ql-snow {
          background-color: #111827; /* gray-900 */
          border-color: #374151; /* gray-700 */
          color: #d1d5db; /* gray-300 */
        }
        .dark .ql-snow .ql-stroke {
          stroke: #9ca3af; /* gray-400 */
        }
        .dark .ql-snow .ql-fill {
          fill: #9ca3af; /* gray-400 */
        }
        .dark .ql-snow .ql-picker {
          color: #d1d5db; /* gray-300 */
        }
        .dark .ql-snow .ql-picker-options {
          background-color: #1f2937; /* gray-800 */
          border-color: #374151; /* gray-700 */
        }
      `}</style>
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <h3 className="text-sm font-medium text-blue-800 dark:text-blue-200 mb-2">
          {isRTL ? 'صياغة العقد' : 'Contract Drafting'}
        </h3>
        <p className="text-xs text-blue-700 dark:text-blue-300">
          {isRTL ? 'اختر قالب FIDIC كأساس، ثم قم بتعديل العقد بالكامل حسب احتياجات مشروعك. سيصبح هذا قالب العقد الذي سيتم إرساله إلى المقاولين لاحقًا.' : 'Choose a FIDIC template as your baseline, then edit the full contract to suit your project needs. This will become your contract template to be sent to contractors later.'}
        </p>
      </div>
      <div className={`flex ${showAiAssistant ? 'space-x-6' : ''}`}>
        <div className={`${showAiAssistant ? 'w-2/3' : 'w-full'} space-y-4`}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1 space-y-4">
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-sm font-medium text-gray-800 dark:text-white">
                    {isRTL ? 'اختر قالب FIDIC' : 'Select FIDIC Template'}
                  </h3>
                  <button onClick={handleUploadClick} className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 flex items-center">
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
                  {templates.map(template => <div key={template.id} className={`border rounded-lg p-3 cursor-pointer transition-all duration-200 ${selectedTemplate === template.id ? 'border-blue-500 dark:border-blue-400 bg-blue-50 dark:bg-blue-900/30' : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'}`} onClick={() => handleTemplateSelect(template.id)}>
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mt-0.5">
                        <input type="radio" className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500" checked={selectedTemplate === template.id} readOnly />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {template.name}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {template.description}
                        </p>
                      </div>
                    </div>
                  </div>)}
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <h3 className="text-sm font-medium text-gray-800 dark:text-white mb-3 flex items-center">
                  <ZapIcon size={16} className="mr-2 text-blue-600" />
                  {isRTL ? 'المساعد الذكي' : 'AI Assistant'}
                </h3>
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">
                  {isRTL ? 'احصل على مساعدة في صياغة العقد من المساعد الذكي المتخصص في عقود FIDIC.' : 'Get help with contract drafting from our AI assistant specialized in FIDIC contracts.'}
                </p>
                <button className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 flex items-center justify-center transition-colors duration-200" onClick={handleAiAssistantToggle}>
                  <BrainIcon size={24} className={isRTL ? 'ml-2' : 'mr-2'} />
                  {isRTL ? showAiAssistant ? 'إخفاء المساعد الذكي' : 'إظهار المساعد الذكي' : showAiAssistant ? 'Hide AI Assistant' : 'Show AI Assistant'}
                </button>
              </div>
            </div>
            <div className="md:col-span-2">
              <div
                ref={editorContainerRef}
                className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 relative"
                style={{
                  fontFamily: selectedTemplateData?.font || 'Arial',
                  // backgroundColor moved to inner content div to separate UI from Paper
                }}
              >
                {selectedTemplateData?.logo && (
                  <div style={{ position: 'relative', textAlign: selectedTemplateData.logoPosition === 'center' ? 'center' : 'left' }}>
                    <img src={selectedTemplateData.logo} alt="logo" style={{ width: '150px', height: 'auto' }} />
                  </div>
                )}
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center">
                    <h3 className="text-sm font-medium text-gray-800 dark:text-gray-200">
                      {isRTL ? 'تحرير العقد' : 'Edit Contract'}
                    </h3>
                    <div className="ml-3 flex space-x-2">
                      <button className={`px-3 py-1.5 text-xs font-medium rounded-lg flex items-center transition-colors duration-200 ${viewMode === 'edit' ? 'bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'}`} onClick={() => setViewMode('edit')}>
                        <EditIcon size={14} className="mr-1" />
                        {isRTL ? 'تحرير' : 'Edit'}
                      </button>
                      <button className={`px-3 py-1.5 text-xs font-medium rounded-lg flex items-center transition-colors duration-200 ${viewMode === 'diff' ? 'bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'}`} onClick={() => setViewMode('diff')}>
                        <GitCommitIcon size={14} className="mr-1" />
                        {isRTL ? 'عرض التغييرات' : 'View Changes'}
                      </button>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button className="px-3 py-1.5 text-xs font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 flex items-center transition-colors duration-200" onClick={handleResetToOriginal}>
                      <HistoryIcon size={14} className="mr-1" />
                      {isRTL ? 'إعادة تعيين إلى الأصل' : 'Reset to Original'}
                    </button>
                    <button className="px-3 py-1.5 text-xs font-medium text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-900/30 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/50 flex items-center transition-colors duration-200" onClick={handleSaveChanges}>
                      <CheckIcon size={14} className="mr-1" />
                      {isRTL ? 'حفظ التغييرات' : 'Save Changes'}
                    </button>
                    <button
                      onClick={handleDownload}
                      disabled={!isSaved}
                      className="px-3 py-1.5 text-xs font-medium text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-900/30 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/50 flex items-center transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
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
                <div
                  className="border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 overflow-hidden shadow-sm"
                  style={{
                    border: `${selectedTemplateData?.borderWidth || 1}px solid ${selectedTemplateData?.borderColor || '#e5e7eb'}`
                  }}
                >
                  {viewMode === 'edit' ? (
                    <ReactQuill
                      theme="snow"
                      value={contractContent}
                      onChange={setContractContent}
                      className="h-[600px] mb-12"
                      modules={{
                        toolbar: [
                          [{ 'header': [1, 2, 3, false] }],
                          ['bold', 'italic', 'underline', 'strike'],
                          [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                          ['clean']
                        ],
                      }}
                    />
                  ) : (
                    <div className="w-full h-[600px] text-sm text-gray-800 dark:text-gray-300 overflow-y-auto font-mono bg-white dark:bg-gray-900">
                      <div className="flex text-xs text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 p-2 border-b border-gray-200 dark:border-gray-700">
                        <div className="w-1/2 border-r border-gray-200 dark:border-gray-700 px-2">
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
                        return (
                          <div key={index} className={`flex text-xs ${line.type === 'added' ? 'bg-green-50 dark:bg-green-900/10 hover:bg-green-100 dark:hover:bg-green-900/20' :
                              line.type === 'removed' ? 'bg-red-50 dark:bg-red-900/10 hover:bg-red-100 dark:hover:bg-red-900/20' :
                                'hover:bg-gray-50 dark:hover:bg-gray-800'
                            }`}>
                            {/* Original Line Number */}
                            <div className="w-10 flex-shrink-0 text-center text-gray-400 dark:text-gray-500 border-r border-gray-200 dark:border-gray-700 py-1 select-none">
                              {line.oLine || ''}
                            </div>
                            {/* Original Content */}
                            <div className={`w-[calc(50%-2.5rem)] border-r border-gray-200 dark:border-gray-700 px-2 py-1 whitespace-pre-wrap break-words ${line.type === 'removed' ? 'bg-red-100/50 dark:bg-red-900/20' : ''
                              }`}>
                              {line.type === 'removed' || line.type === 'unchanged' ? line.content : ''}
                            </div>

                            {/* Modified Line Number */}
                            <div className="w-10 flex-shrink-0 text-center text-gray-400 dark:text-gray-500 border-r border-gray-200 dark:border-gray-700 py-1 select-none">
                              {line.mLine || ''}
                            </div>
                            {/* Modified Content */}
                            <div className={`w-[calc(50%-2.5rem)] px-2 py-1 whitespace-pre-wrap break-words ${line.type === 'added' ? 'bg-green-100/50 dark:bg-green-900/20' : ''
                              }`}>
                              {line.type === 'added' || line.type === 'unchanged' ? line.content : ''}
                            </div>
                          </div>
                        );
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
      <div className="flex justify-between items-center pt-4 border-t border-gray-200 dark:border-gray-700">
        <div>
          <p className="text-sm text-gray-700 dark:text-gray-300">
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
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl w-1/3">
            <h3 className="text-lg font-medium mb-4 text-gray-900 dark:text-white">Name Your Draft</h3>
            <input
              type="text"
              value={draftName}
              onChange={(e) => setDraftName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md mb-4 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g., Metro Line 3 - Final Draft"
            />
            <div className="flex justify-end space-x-2">
              <button onClick={() => setShowNamePopup(false)} className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600">
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
  );
}