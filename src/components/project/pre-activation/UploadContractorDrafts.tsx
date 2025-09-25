import React, { useState } from 'react';
import { ArrowRightIcon, BrainIcon, UploadIcon, FileIcon, EyeIcon, GitCommitIcon, XIcon, ThumbsUpIcon, ThumbsDownIcon, SendIcon, CheckCircle } from 'lucide-react';
import { AIAssistant } from '../../ai/AIAssistant';

export function UploadContractorDrafts({
  onContinue,
  language = 'english'
}) {
  const isRTL = language === 'arabic';
  const [showAiAssistant, setShowAiAssistant] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([
    { id: 1, name: 'Siemens_Metro_Line_3_Draft_v1.pdf', size: '2.8 MB', status: 'processed', contractor: 'Siemens' },
    { id: 2, name: 'Siemens_Technical_Addendum.pdf', size: '1.2 MB', status: 'processed', contractor: 'Siemens' },
    { id: 3, name: 'ABB_Metro_Line_3_Draft_v1.pdf', size: '2.9 MB', status: 'processed', contractor: 'ABB' },
    { id: 4, name: 'Orascom_Metro_Line_3_Draft_v1.pdf', size: '3.1 MB', status: 'processing', contractor: 'Orascom' },
  ]);
  const handleAiAssistantToggle = () => {
    setShowAiAssistant(!showAiAssistant);
  };

  const handleFileUpload = () => {
    // Mock file upload
    const newFile = {
      id: uploadedFiles.length + 1,
      name: 'New_Contract_Draft.pdf',
      size: '3.2 MB',
      status: 'uploading',
      contractor: 'Siemens'
    };
    setUploadedFiles([...uploadedFiles, newFile]);
    // Simulate processing
    setTimeout(() => {
      setUploadedFiles(files => files.map(file => file.id === newFile.id ? {
        ...file,
        status: 'processing'
      } : file));
      setTimeout(() => {
        setUploadedFiles(files => files.map(file => file.id === newFile.id ? {
          ...file,
          status: 'processed'
        } : file));
      }, 3000);
    }, 2000);
  };

  const handleStatusChange = (id, newStatus) => {
    setUploadedFiles(files =>
      files.map(file =>
        file.id === id ? { ...file, status: newStatus } : file
      )
    );
  };

  const handleRemoveFile = (id) => {
    setUploadedFiles(files => files.filter(file => file.id !== id));
  };

  const handleViewFile = (id) => {
      console.log('Viewing file with id:', id);
  };

  const handleCompareFile = (id) => {
      console.log('Comparing file with id:', id);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'processed':
        return 'bg-green-100 text-green-800';
      case 'processing':
        return 'bg-amber-100 text-amber-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  return (
    <div className={`flex ${showAiAssistant ? 'space-x-6' : ''}`}>
      <div className={`${showAiAssistant ? 'w-2/3' : 'w-full'} space-y-6`}>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="text-sm font-medium text-blue-800 mb-2">
            {isRTL ? 'تحميل مسودات المقاولين' : 'Upload Contractor Drafts'}
          </h3>
          <p className="text-xs text-blue-700">
            {isRTL ? 'قم بتحميل مسودات العقود المقدمة من المقاولين. سيقوم النظام بمقارنتها مع قالب FIDIC الخاص بك واستخراج البنود الرئيسية.' : 'Upload contract drafts submitted by contractors. The system will compare them with your FIDIC template and extract key clauses.'}
          </p>
        </div>
        <div className="flex justify-between items-center">
          <h3 className="text-base font-medium text-gray-800">
            {isRTL ? 'تحميل المستندات' : 'Document Upload'}
          </h3>
          <button className="px-3 py-1.5 text-sm font-medium text-blue-700 bg-blue-50 rounded-lg hover:bg-blue-100 flex items-center transition-colors duration-200" onClick={handleAiAssistantToggle}>
            <BrainIcon size={16} className="mr-2" />
            {isRTL ? 'المساعد الذكي' : 'AI Assistant'}
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <div className="bg-white border border-gray-200 rounded-lg p-4 h-full flex flex-col">
              <h4 className="text-sm font-medium text-gray-800 mb-3">
                {isRTL ? 'تحميل ملف جديد' : 'Upload New File'}
              </h4>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center flex-grow">
                <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mb-3">
                  <UploadIcon size={24} className="text-blue-600" />
                </div>
                <p className="text-sm font-medium text-gray-700 text-center mb-2">
                  {isRTL ? 'اسحب وأفلت الملفات هنا' : 'Drag and drop files here'}
                </p>
                <p className="text-xs text-gray-500 text-center mb-4">
                  {isRTL ? 'أو' : 'or'}
                </p>
                <button className="px-4 py-2 text-sm font-medium text-blue-700 bg-blue-50 rounded-lg hover:bg-blue-100" onClick={handleFileUpload}>
                  {isRTL ? 'تصفح الملفات' : 'Browse Files'}
                </button>
              </div>
              <div className="mt-4">
                <p className="text-xs text-gray-500 mb-2">
                  {isRTL ? 'الملفات المدعومة:' : 'Supported files:'}
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded">
                    PDF
                  </span>
                  <span className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded">
                    DOCX
                  </span>
                  <span className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded">
                    DOC
                  </span>
                  <span className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded">
                    TXT
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="md:col-span-2">
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h4 className="text-sm font-medium text-gray-800 mb-3 flex justify-between items-center">
                <span>{isRTL ? 'الملفات المحملة' : 'Uploaded Files'}</span>
                <span className="text-xs text-gray-500">
                  {uploadedFiles.length} {isRTL ? 'ملفات' : 'files'}
                </span>
              </h4>
              <div className="space-y-3">
                {uploadedFiles.map(file => <div key={file.id} className="border border-gray-200 rounded-lg p-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                          <FileIcon size={20} className="text-blue-600" />
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium text-gray-800">
                            {file.name}
                          </p>
                          <div className="flex items-center text-xs text-gray-500">
                            <span>{file.size}</span>
                            <span className="mx-2">•</span>
                            <span>{file.contractor}</span>
                          </div>
                        </div>
                      </div>
                      <div>
                        {file.status === 'uploading' && <div className="flex items-center">
                            <div className="w-16 h-1.5 bg-gray-200 rounded-full overflow-hidden mr-2">
                              <div className="h-full bg-blue-500 rounded-full w-1/2 animate-pulse"></div>
                            </div>
                            <span className="text-xs text-gray-500">50%</span>
                          </div>}
                          {file.status !== 'uploading' &&
                          <select
                            value={file.status}
                            onChange={(e) => handleStatusChange(file.id, e.target.value)}
                            className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(file.status)}`}
                          >
                            <option value="processing">Processing</option>
                            <option value="processed">Processed</option>
                            <option value="rejected">Rejected</option>
                          </select>
                        }
                      </div>
                    </div>
                    {file.status === 'processed' && <div className="mt-3 flex justify-end space-x-2">
                        <button onClick={() => handleViewFile(file.id)} className="px-2 py-1 text-xs text-gray-600 hover:text-gray-800">
                          <EyeIcon size={14} className="inline mr-1" />
                          {isRTL ? 'عرض' : 'View'}
                        </button>
                        <button onClick={() => handleCompareFile(file.id)} className="px-2 py-1 text-xs text-blue-600 hover:text-blue-800">
                          <GitCommitIcon size={14} className="inline mr-1" />
                          {isRTL ? 'مقارنة' : 'Compare'}
                        </button>
                        <button onClick={() => handleRemoveFile(file.id)} className="px-2 py-1 text-xs text-red-600 hover:text-red-800">
                          <XIcon size={14} className="inline mr-1" />
                          {isRTL ? 'حذف' : 'Remove'}
                        </button>
                      </div>}
                  </div>)}
              </div>
              {uploadedFiles.length > 0 && <div className="mt-4 pt-3 border-t border-gray-200">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-gray-700">
                        {isRTL ? 'تمت معالجة 1 من 2 ملفات' : '1 of 2 files processed'}
                      </p>
                      <p className="text-xs text-gray-500">
                        {isRTL ? 'جاهز للمقارنة' : 'Ready for comparison'}
                      </p>
                    </div>
                    <button className="px-3 py-1.5 text-sm font-medium text-blue-700 bg-blue-50 rounded-lg hover:bg-blue-100 flex items-center" onClick={onContinue}>
                      {isRTL ? 'المتابعة إلى المقارنة' : 'Continue to Comparison'}
                      <ArrowRightIcon size={16} className="ml-2" />
                    </button>
                  </div>
                </div>}
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
  )
}
