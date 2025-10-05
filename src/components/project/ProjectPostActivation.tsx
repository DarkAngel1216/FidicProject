import { useState } from 'react';
import { CalendarIcon, CheckIcon, ClockIcon, AlertTriangleIcon, FileTextIcon, MessageSquareTextIcon, CheckSquareIcon, BarChart2Icon, UploadIcon, FileIcon, EyeIcon, EditIcon, DownloadIcon, TrashIcon, PlusIcon, XIcon } from 'lucide-react';
import { AIAssistant } from '../ai/AIAssistant';

// Type definitions
interface DocumentAnalysis {
  summary: string;
  keyPoints: string[];
  suggestedResponse: string;
}

interface Document {
  id: string;
  name: string;
  type: string;
  uploadDate: string;
  status: 'analyzing' | 'analyzed';
  aiAnalysis: DocumentAnalysis | null;
}

interface Dispute {
  id: string;
  title: string;
  reference: string;
  contract: string;
  type: string;
  status: string;
  dateRaised: string;
  clauseRef: string;
  description: string;
  documents: Document[];
  timeline: Array<{
    step: string;
    date: string;
    status: string;
  }>;
}

interface ProjectPostActivationProps {
  projectId: string;
  subPhase?: string;
  setCurrentPhase?: (phase: string) => void;
  language?: string;
}

export function ProjectPostActivation({
  projectId,
  subPhase,
  setCurrentPhase,
  language = 'english'
}: ProjectPostActivationProps) {
  const activeTab = subPhase || 'obligation-tracker';
  const isRTL = language === 'arabic';
  const [showAiAssistant, setShowAiAssistant] = useState(false);

  const handleTabClick = (tabId: string) => {
    if (setCurrentPhase) {
      setCurrentPhase(`post-activation/${tabId}`);
    }
  };

  return <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Post-Activation</h1>
        <div className="flex space-x-2">
          <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
            Generate Report
          </button>
          <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700">
            Add Item
          </button>
          <button className="px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700" onClick={() => setShowAiAssistant(prev => !prev)}>
            {showAiAssistant ? (isRTL ? 'إخفاء المساعد' : 'Hide Assistant') : (isRTL ? 'المساعد الذكي' : 'AI Assistant')}
          </button>
        </div>
      </div>
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        <div className="flex border-b border-gray-200">
          <button className={`px-4 py-3 text-sm font-medium ${activeTab === 'obligation-tracker' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`} onClick={() => handleTabClick('obligation-tracker')}>
            Obligation Tracker
          </button>
          <button className={`px-4 py-3 text-sm font-medium ${activeTab === 'disputes' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`} onClick={() => handleTabClick('disputes')}>
            Dispute Manager
          </button>
          <button className={`px-4 py-3 text-sm font-medium ${activeTab === 'compliance' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`} onClick={() => handleTabClick('compliance')}>
            Document Handling
          </button>
          <button className={`px-4 py-3 text-sm font-medium ${activeTab === 'risk-monitoring' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`} onClick={() => handleTabClick('risk-monitoring')}>
            Risk Monitoring
          </button>
        </div>
        <div className="p-4">
          <div className={`flex ${showAiAssistant ? 'space-x-4' : ''}`}>
            <div className={`${showAiAssistant ? 'w-2/3' : 'w-full'}`}>
              {activeTab === 'obligation-tracker' && <ObligationTracker />}
              {activeTab === 'disputes' && <DisputeManager />}
              {activeTab === 'compliance' && <DocumentHandling />}
              {activeTab === 'risk-monitoring' && <RiskMonitoring />}
            </div>
            {showAiAssistant && (
              <div className="w-1/3">
                <AIAssistant onClose={() => setShowAiAssistant(false)} isRTL={isRTL} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
}
function ObligationTracker() {
  return <div className="space-y-6">
      <div className="flex space-x-4 mb-6">
        <div className="w-1/4">
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Contract
          </label>
          <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm">
            <option>All Contracts</option>
            <option>ABB Electrical Equipment</option>
            <option>Siemens Electrical Systems</option>
          </select>
        </div>
        <div className="w-1/4">
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Type
          </label>
          <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm">
            <option>All Types</option>
            <option>Payment</option>
            <option>Delivery</option>
            <option>Testing</option>
            <option>Legal</option>
          </select>
        </div>
        <div className="w-1/4">
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Status
          </label>
          <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm">
            <option>All Statuses</option>
            <option>Upcoming</option>
            <option>Overdue</option>
            <option>Completed</option>
          </select>
        </div>
        <div className="w-1/4">
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Time Period
          </label>
          <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm">
            <option>Next 30 Days</option>
            <option>Next 90 Days</option>
            <option>All Time</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-700">
              Total Obligations
            </h3>
            <FileTextIcon size={18} className="text-blue-600" />
          </div>
          <p className="text-2xl font-bold text-gray-900">24</p>
          <p className="text-xs text-gray-500 mt-1">
            Across 2 active contracts
          </p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-700">Completed</h3>
            <CheckIcon size={18} className="text-green-600" />
          </div>
          <p className="text-2xl font-bold text-gray-900">18</p>
          <p className="text-xs text-gray-500 mt-1">75% completion rate</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-700">Upcoming</h3>
            <ClockIcon size={18} className="text-blue-600" />
          </div>
          <p className="text-2xl font-bold text-gray-900">4</p>
          <p className="text-xs text-gray-500 mt-1">Due within 30 days</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-700">Overdue</h3>
            <AlertTriangleIcon size={18} className="text-red-600" />
          </div>
          <p className="text-2xl font-bold text-gray-900">2</p>
          <p className="text-xs text-gray-500 mt-1">8.3% overdue rate</p>
        </div>
      </div>
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-gray-800">
          Upcoming & Overdue Obligations
        </h3>
        <div className="border border-red-200 rounded-lg p-4 bg-red-50">
          <div className="flex justify-between items-start">
            <div className="flex items-start">
              <div className="mt-0.5 h-5 w-5 flex-shrink-0 flex items-center justify-center rounded-full bg-red-100">
                <AlertTriangleIcon size={14} className="text-red-600" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-gray-900">
                  Delivery of Equipment
                </h3>
                <p className="text-xs text-gray-500">
                  ABB Contract • Cairo Metro Line 3
                </p>
                <p className="mt-1 text-xs text-gray-600">
                  Delivery of transformers and switchgear to site.
                </p>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <span className="px-2 py-1 text-xs font-medium rounded-full bg-purple-100 text-purple-800">
                Delivery
              </span>
              <div className="mt-2 flex items-center text-xs text-red-600 font-medium">
                <CalendarIcon size={14} className="mr-1" />
                <span>Dec 10, 2023 (5 days overdue)</span>
              </div>
              <div className="mt-1 text-xs text-gray-500">Clause: 3.1.2</div>
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-red-200 flex justify-between items-center">
            <div className="flex space-x-2">
              <button className="px-3 py-1 text-xs font-medium rounded-md text-green-700 bg-green-100 hover:bg-green-200">
                Mark Complete
              </button>
              <button className="px-3 py-1 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
                Request Extension
              </button>
            </div>
            <button className="text-xs text-blue-600 font-medium">
              View Details
            </button>
          </div>
        </div>
        <div className="border border-gray-200 rounded-lg p-4 bg-white">
          <div className="flex justify-between items-start">
            <div className="flex items-start">
              <div className="mt-0.5 h-5 w-5 flex-shrink-0 flex items-center justify-center rounded-full bg-blue-100">
                <ClockIcon size={14} className="text-blue-600" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-gray-900">
                  Payment Milestone 3
                </h3>
                <p className="text-xs text-gray-500">
                  Siemens Contract • Cairo Metro Line 3
                </p>
                <p className="mt-1 text-xs text-gray-600">
                  Payment of 25% of contract value upon completion of electrical
                  system installation.
                </p>
                <p className="mt-1 text-xs font-medium text-gray-800">
                  Amount: $2,500,000
                </p>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                Payment
              </span>
              <div className="mt-2 flex items-center text-xs text-gray-500">
                <CalendarIcon size={14} className="mr-1" />
                <span>Dec 15, 2023 (Due in 5 days)</span>
              </div>
              <div className="mt-1 text-xs text-gray-500">Clause: 4.2.3</div>
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-gray-100 flex justify-between items-center">
            <div className="flex space-x-2">
              <button className="px-3 py-1 text-xs font-medium rounded-md text-green-700 bg-green-100 hover:bg-green-200">
                Mark Complete
              </button>
              <button className="px-3 py-1 text-xs font-medium text-blue-700 bg-blue-100 rounded-md hover:bg-blue-200">
                Add Note
              </button>
            </div>
            <button className="text-xs text-blue-600 font-medium">
              View Details
            </button>
          </div>
        </div>
        <div className="border border-gray-200 rounded-lg p-4 bg-white">
          <div className="flex justify-between items-start">
            <div className="flex items-start">
              <div className="mt-0.5 h-5 w-5 flex-shrink-0 flex items-center justify-center rounded-full bg-blue-100">
                <ClockIcon size={14} className="text-blue-600" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-gray-900">
                  Quality Inspection
                </h3>
                <p className="text-xs text-gray-500">
                  ABB Contract • Cairo Metro Line 3
                </p>
                <p className="mt-1 text-xs text-gray-600">
                  Final inspection of electrical equipment installation by
                  third-party inspector.
                </p>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                Compliance
              </span>
              <div className="mt-2 flex items-center text-xs text-gray-500">
                <CalendarIcon size={14} className="mr-1" />
                <span>Dec 18, 2023 (Due in 8 days)</span>
              </div>
              <div className="mt-1 text-xs text-gray-500">Clause: 7.3</div>
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-gray-100 flex justify-between items-center">
            <div className="flex space-x-2">
              <button className="px-3 py-1 text-xs font-medium rounded-md text-green-700 bg-green-100 hover:bg-green-200">
                Mark Complete
              </button>
              <button className="px-3 py-1 text-xs font-medium text-blue-700 bg-blue-100 rounded-md hover:bg-blue-200">
                Add Note
              </button>
            </div>
            <button className="text-xs text-blue-600 font-medium">
              View Details
            </button>
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center pt-4 border-t border-gray-200">
        <button className="text-sm text-blue-600 font-medium">
          View Calendar View
        </button>
        <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
          Export Obligations
        </button>
      </div>
    </div>
}
function DisputeManager() {
  // State for dispute management
  const [disputes, setDisputes] = useState<Dispute[]>([
    {
      id: '1',
      title: 'Delivery Delay Claim',
      reference: 'DSP-2023-001',
      contract: 'Siemens Electrical Systems',
      type: 'Time Extension',
      status: 'In Progress',
      dateRaised: '2023-12-05',
      clauseRef: '8.4, 20.1',
      description: 'Contractor has submitted a claim for a 30-day extension of time due to delays in material shipment caused by port congestion.',
      documents: [
        {
          id: 'doc1',
          name: 'Extension_Request_Letter.pdf',
          type: 'Dispute Letter',
          uploadDate: '2023-12-05',
          status: 'analyzed' as const,
          aiAnalysis: {
            summary: 'Request for 30-day time extension due to port congestion delays',
            keyPoints: [
              'Cites Clause 8.4(d) for unforeseeable shortages',
              'References port congestion as cause',
              'Requests 30-day extension',
              'Provides supporting documentation'
            ],
            suggestedResponse: 'partial_approval'
          }
        }
      ],
      timeline: [
        { step: 'Claim Received', date: '2023-12-05', status: 'completed' },
        { step: 'Response Drafted', date: '2023-12-07', status: 'completed' },
        { step: 'Response Sent', date: '', status: 'pending' },
        { step: 'Resolution', date: '', status: 'pending' }
      ]
    }
  ]);

  const [showNewDisputeModal, setShowNewDisputeModal] = useState(false);
  const [showDisputeDetails, setShowDisputeDetails] = useState(false);
  const [selectedDispute, setSelectedDispute] = useState<Dispute | null>(null);
  const [showDocumentAnalysis, setShowDocumentAnalysis] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  const [dragActive, setDragActive] = useState(false);

  // New dispute form state
  const [newDispute, setNewDispute] = useState<{
    title: string;
    contract: string;
    type: string;
    description: string;
    documents: Document[];
  }>({
    title: '',
    contract: '',
    type: '',
    description: '',
    documents: []
  });

  // Handle file upload for dispute documents
  const handleDisputeFileUpload = (files: FileList) => {
    const newDocuments = Array.from(files).map((file, index) => ({
      id: `doc-${Date.now()}-${index}`,
      name: file.name,
      type: 'Dispute Letter',
      uploadDate: new Date().toISOString().split('T')[0],
      status: 'analyzing' as const,
      aiAnalysis: null
    }));

    setNewDispute(prev => ({
      ...prev,
      documents: [...prev.documents, ...newDocuments]
    }));

    // Simulate AI analysis
    setTimeout(() => {
      setNewDispute(prev => ({
        ...prev,
        documents: prev.documents.map(doc => 
          doc.status === 'analyzing' 
            ? {
                ...doc,
                status: 'analyzed' as const,
                aiAnalysis: {
                  summary: 'AI analysis completed - dispute letter content processed and key information extracted',
                  keyPoints: [
                    'Dispute type identified',
                    'Key contract clauses referenced',
                    'Supporting evidence highlighted',
                    'Response recommendations generated'
                  ],
                  suggestedResponse: 'review_required'
                }
              }
            : doc
        )
      }));
    }, 2000);
  };

  // Handle drag and drop for dispute documents
  const handleDisputeDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDisputeDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleDisputeFileUpload(e.dataTransfer.files);
    }
  };

  // Create new dispute
  const handleCreateDispute = () => {
    const dispute = {
      id: `dispute-${Date.now()}`,
      title: newDispute.title,
      reference: `DSP-2023-${String(disputes.length + 1).padStart(3, '0')}`,
      contract: newDispute.contract,
      type: newDispute.type,
      status: 'New',
      dateRaised: new Date().toISOString().split('T')[0],
      clauseRef: 'TBD',
      description: newDispute.description,
      documents: newDispute.documents,
      timeline: [
        { step: 'Dispute Created', date: new Date().toISOString().split('T')[0], status: 'completed' },
        { step: 'Documents Analyzed', date: '', status: 'completed' },
        { step: 'Response Required', date: '', status: 'pending' },
        { step: 'Resolution', date: '', status: 'pending' }
      ]
    };

    setDisputes(prev => [dispute, ...prev]);
    setShowNewDisputeModal(false);
    setNewDispute({ title: '', contract: '', type: '', description: '', documents: [] });
  };

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="text-sm font-medium text-blue-800 mb-2">
          Dispute Management & AI Analysis
        </h3>
        <p className="text-xs text-blue-700">
          Upload dispute letters, analyze content with AI, track disputes, and generate response drafts.
        </p>
      </div>
      
      <div className="flex justify-between items-center">
        <h3 className="text-base font-medium text-gray-800">Active Disputes</h3>
        <button 
          onClick={() => setShowNewDisputeModal(true)}
          className="px-3 py-1.5 text-xs font-medium text-blue-700 bg-blue-50 rounded-lg hover:bg-blue-100 flex items-center"
        >
          <PlusIcon size={14} className="mr-1" />
          Add New Dispute
        </button>
      </div>
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Dispute
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contract
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date Raised
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Clause Ref
                </th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {disputes.map((dispute) => (
                <tr key={dispute.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex items-center">
                      <MessageSquareTextIcon size={16} className="text-purple-600 mr-2" />
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {dispute.title}
                        </div>
                        <div className="text-xs text-gray-500">{dispute.reference}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                    {dispute.contract}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-purple-100 text-purple-800">
                      {dispute.type}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      dispute.status === 'In Progress' ? 'bg-amber-100 text-amber-800' :
                      dispute.status === 'New' ? 'bg-blue-100 text-blue-800' :
                      dispute.status === 'Resolved' ? 'bg-green-100 text-green-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {dispute.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                    {dispute.dateRaised}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                    {dispute.clauseRef}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-center">
                    <button 
                      onClick={() => {
                        setSelectedDispute(dispute);
                        setShowDisputeDetails(true);
                      }}
                      className="text-xs text-blue-600 font-medium hover:text-blue-800"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Dispute Details Modal */}
      {showDisputeDetails && selectedDispute && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-6xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-medium text-gray-900">Dispute Details: {selectedDispute.title}</h2>
                <button 
                  onClick={() => {
                    setShowDisputeDetails(false);
                    setSelectedDispute(null);
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XIcon size={24} />
                </button>
              </div>

              <div className="grid grid-cols-3 gap-6">
                {/* Main Content */}
                <div className="col-span-2 space-y-4">
                  {/* Dispute Information */}
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h3 className="text-sm font-medium text-gray-800 mb-3">Dispute Information</h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Reference:</span>
                        <span className="ml-2 font-medium">{selectedDispute.reference}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Contract:</span>
                        <span className="ml-2 font-medium">{selectedDispute.contract}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Type:</span>
                        <span className="ml-2 font-medium">{selectedDispute.type}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Status:</span>
                        <span className={`ml-2 px-2 py-1 text-xs font-medium rounded-full ${
                          selectedDispute.status === 'In Progress' ? 'bg-amber-100 text-amber-800' :
                          selectedDispute.status === 'New' ? 'bg-blue-100 text-blue-800' :
                          selectedDispute.status === 'Resolved' ? 'bg-green-100 text-green-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {selectedDispute.status}
                        </span>
                      </div>
                    </div>
                    <div className="mt-3">
                      <span className="text-gray-600 text-sm">Description:</span>
                      <p className="text-sm text-gray-700 mt-1">{selectedDispute.description}</p>
                    </div>
                  </div>

                  {/* Dispute Documents */}
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="text-sm font-medium text-gray-800">Dispute Documents</h3>
                      <button className="px-3 py-1 text-xs font-medium text-blue-700 bg-blue-50 rounded hover:bg-blue-100">
                        <PlusIcon size={12} className="mr-1" />
                        Add Document
                      </button>
                    </div>
                    <div className="space-y-3">
                      {selectedDispute.documents.map((doc) => (
                        <div key={doc.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <FileIcon size={16} className="text-blue-600" />
                            <div>
                              <h4 className="text-sm font-medium text-gray-900">{doc.name}</h4>
                              <div className="flex items-center space-x-4 text-xs text-gray-500">
                                <span>{doc.type}</span>
                                <span>Uploaded: {doc.uploadDate}</span>
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                  doc.status === 'analyzed' 
                                    ? 'bg-green-100 text-green-800' 
                                    : 'bg-yellow-100 text-yellow-800'
                                }`}>
                                  {doc.status === 'analyzed' ? 'Analyzed' : 'Analyzing...'}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <button 
                              onClick={() => {
                                setSelectedDocument(doc);
                                setShowDocumentAnalysis(true);
                              }}
                              className="p-2 text-gray-400 hover:text-blue-600"
                              title="View Analysis"
                            >
                              <EyeIcon size={16} />
                            </button>
                            <button className="p-2 text-gray-400 hover:text-gray-600" title="Download">
                              <DownloadIcon size={16} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* AI-Generated Response Draft */}
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h3 className="text-sm font-medium text-gray-800 mb-3">AI-Generated Response Draft</h3>
                    <p className="text-xs text-gray-600 mb-3">
                      Based on the contract terms and the evidence provided, the following response is recommended:
                    </p>
                    <div className="bg-gray-50 p-3 rounded-lg text-xs text-gray-700 space-y-2">
                      <p>Dear [Contractor Representative],</p>
                      <br />
                      <p>
                        We acknowledge receipt of your {selectedDispute.type} claim dated {selectedDispute.dateRaised} regarding {selectedDispute.title.toLowerCase()}.
                      </p>
                      <br />
                      <p>
                        After careful review of the documentation provided and in accordance with the relevant contract clauses, we can confirm that:
                      </p>
                      <br />
                      <p>1. [AI-generated response based on document analysis]</p>
                      <p>2. [Specific action items or clarifications needed]</p>
                      <p>3. [Timeline and next steps]</p>
                      <br />
                      <p>We look forward to your prompt response and continued collaboration.</p>
                      <br />
                      <p>Sincerely,</p>
                      <p>[Employer Representative]</p>
                    </div>
                    <div className="flex justify-end mt-3 space-x-2">
                      <button className="px-3 py-1 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-50">
                        Edit Draft
                      </button>
                      <button className="px-3 py-1 text-xs font-medium text-white bg-blue-600 rounded hover:bg-blue-700">
                        Send Response
                      </button>
                    </div>
                  </div>
                </div>

                {/* Sidebar */}
                <div className="col-span-1 space-y-4">
                  {/* Timeline */}
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h3 className="text-sm font-medium text-gray-800 mb-3">Dispute Timeline</h3>
                    <div className="space-y-3">
                      {selectedDispute.timeline.map((item, index) => (
                        <div key={index} className="flex items-start">
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center">
                              <div className={`h-6 w-6 rounded-full flex items-center justify-center ${
                                item.status === 'completed' ? 'bg-green-100 text-green-600' :
                                item.status === 'in-progress' ? 'bg-blue-100 text-blue-600' :
                                'bg-gray-100 text-gray-400'
                              }`}>
                                {item.status === 'completed' ? <CheckIcon size={12} /> :
                                 item.status === 'in-progress' ? <ClockIcon size={12} /> :
                                 <MessageSquareTextIcon size={12} />}
                              </div>
                              <p className="ml-2 text-xs font-medium text-gray-900">
                                {item.step}
                              </p>
                            </div>
                            <p className="mt-0.5 ml-8 text-xs text-gray-500">
                              {item.date || 'Pending'}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Contract Clauses */}
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h3 className="text-sm font-medium text-gray-800 mb-3">Contract Clauses</h3>
                    <div className="space-y-2">
                      <div className="bg-gray-50 p-2 rounded">
                        <p className="text-xs font-medium text-gray-800">Clause 8.4(d)</p>
                        <p className="text-xs text-gray-600">
                          Unforeseeable shortages in the availability of personnel or Goods caused by epidemic or governmental actions
                        </p>
                      </div>
                      <div className="bg-gray-50 p-2 rounded">
                        <p className="text-xs font-medium text-gray-800">Clause 20.1</p>
                        <p className="text-xs text-gray-600">
                          Contractor's Claims procedure and notice requirements
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h3 className="text-sm font-medium text-gray-800 mb-3">Actions</h3>
                    <div className="space-y-2">
                      <button className="w-full px-3 py-1.5 text-xs font-medium text-blue-700 bg-blue-50 rounded hover:bg-blue-100">
                        Send Response
                      </button>
                      <button className="w-full px-3 py-1.5 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-50">
                        Request More Information
                      </button>
                      <button className="w-full px-3 py-1.5 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-50">
                        Schedule Meeting
                      </button>
                      <button className="w-full px-3 py-1.5 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-50">
                        Generate Response Draft
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* New Dispute Modal */}
      {showNewDisputeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-medium text-gray-900">Create New Dispute</h2>
                <button 
                  onClick={() => {
                    setShowNewDisputeModal(false);
                    setNewDispute({ title: '', contract: '', type: '', description: '', documents: [] });
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XIcon size={24} />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-6">
                {/* Form */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Dispute Title</label>
                    <input
                      type="text"
                      value={newDispute.title}
                      onChange={(e) => setNewDispute(prev => ({ ...prev, title: e.target.value }))}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                      placeholder="Enter dispute title"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Contract</label>
                    <select
                      value={newDispute.contract}
                      onChange={(e) => setNewDispute(prev => ({ ...prev, contract: e.target.value }))}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                    >
                      <option value="">Select Contract</option>
                      <option value="Siemens Electrical Systems">Siemens Electrical Systems</option>
                      <option value="ABB Electrical Equipment">ABB Electrical Equipment</option>
                      <option value="Orascom Civil Works">Orascom Civil Works</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Dispute Type</label>
                    <select
                      value={newDispute.type}
                      onChange={(e) => setNewDispute(prev => ({ ...prev, type: e.target.value }))}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                    >
                      <option value="">Select Type</option>
                      <option value="Time Extension">Time Extension</option>
                      <option value="Cost Claim">Cost Claim</option>
                      <option value="Quality Issue">Quality Issue</option>
                      <option value="Payment Dispute">Payment Dispute</option>
                      <option value="Force Majeure">Force Majeure</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                      value={newDispute.description}
                      onChange={(e) => setNewDispute(prev => ({ ...prev, description: e.target.value }))}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm resize-none"
                      rows={4}
                      placeholder="Describe the dispute..."
                    />
                  </div>
                </div>

                {/* Document Upload */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Upload Dispute Documents</label>
                    <div
                      className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                        dragActive 
                          ? 'border-blue-400 bg-blue-50' 
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                      onDragEnter={handleDisputeDrag}
                      onDragLeave={handleDisputeDrag}
                      onDragOver={handleDisputeDrag}
                      onDrop={handleDisputeDrop}
                    >
                      <UploadIcon size={32} className="mx-auto text-gray-400 mb-2" />
                      <p className="text-sm text-gray-600 mb-1">Drop dispute letters here or click to browse</p>
                      <p className="text-xs text-gray-500">PDF, DOC, DOCX up to 10MB</p>
                      <input
                        type="file"
                        multiple
                        accept=".pdf,.doc,.docx"
                        onChange={(e) => e.target.files && handleDisputeFileUpload(e.target.files)}
                        className="hidden"
                        id="dispute-file-upload"
                      />
                      <label
                        htmlFor="dispute-file-upload"
                        className="mt-3 inline-block px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 cursor-pointer"
                      >
                        Choose Files
                      </label>
                    </div>
                  </div>

                  {/* Uploaded Documents */}
                  {newDispute.documents.length > 0 && (
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Uploaded Documents</h4>
                      <div className="space-y-2">
                        {newDispute.documents.map((doc) => (
                          <div key={doc.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                            <div className="flex items-center space-x-2">
                              <FileIcon size={14} className="text-blue-600" />
                              <span className="text-sm text-gray-700">{doc.name}</span>
                              <span className={`px-2 py-1 text-xs rounded-full ${
                                doc.status === 'analyzed' 
                                  ? 'bg-green-100 text-green-800' 
                                  : 'bg-yellow-100 text-yellow-800'
                              }`}>
                                {doc.status === 'analyzed' ? 'Analyzed' : 'Analyzing...'}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6 pt-4 border-t border-gray-200">
                <button
                  onClick={() => {
                    setShowNewDisputeModal(false);
                    setNewDispute({ title: '', contract: '', type: '', description: '', documents: [] });
                  }}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateDispute}
                  disabled={!newDispute.title || !newDispute.contract || !newDispute.type}
                  className={`px-4 py-2 text-sm font-medium rounded-lg ${
                    !newDispute.title || !newDispute.contract || !newDispute.type
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  Create Dispute
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Document Analysis Modal */}
      {showDocumentAnalysis && selectedDocument && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-medium text-gray-900">Document Analysis: {selectedDocument.name}</h2>
                <button 
                  onClick={() => {
                    setShowDocumentAnalysis(false);
                    setSelectedDocument(null);
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XIcon size={24} />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-6">
                {/* Document Info */}
                <div className="space-y-4">
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h3 className="text-sm font-medium text-gray-800 mb-3">Document Information</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Name:</span>
                        <span className="font-medium">{selectedDocument.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Type:</span>
                        <span className="font-medium">{selectedDocument.type}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Upload Date:</span>
                        <span className="font-medium">{selectedDocument.uploadDate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Status:</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          selectedDocument.status === 'analyzed' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {selectedDocument.status === 'analyzed' ? 'Analyzed' : 'Analyzing...'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* AI Analysis */}
                  {selectedDocument.aiAnalysis && (
                    <div className="border border-gray-200 rounded-lg p-4">
                      <h3 className="text-sm font-medium text-gray-800 mb-3">AI Analysis</h3>
                      <div className="space-y-3">
                        <div>
                          <h4 className="text-xs font-medium text-gray-700 mb-1">Summary:</h4>
                          <p className="text-xs text-gray-600">{selectedDocument.aiAnalysis.summary}</p>
                        </div>
                        <div>
                          <h4 className="text-xs font-medium text-gray-700 mb-2">Key Points:</h4>
                          <ul className="space-y-1">
                            {selectedDocument.aiAnalysis.keyPoints.map((point, index) => (
                              <li key={index} className="text-xs text-gray-600 flex items-start">
                                <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                                {point}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Response Actions */}
                <div className="space-y-4">
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h3 className="text-sm font-medium text-gray-800 mb-3">Suggested Actions</h3>
                    <div className="space-y-3">
                      <button className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 flex items-center justify-center">
                        <EditIcon size={16} className="mr-2" />
                        Generate Response Draft
                      </button>
                      <button className="w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center justify-center">
                        <MessageSquareTextIcon size={16} className="mr-2" />
                        Request Clarification
                      </button>
                      <button className="w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center justify-center">
                        <CalendarIcon size={16} className="mr-2" />
                        Schedule Meeting
                      </button>
                    </div>
                  </div>

                  {/* Sample Response Draft */}
                  {selectedDocument.aiAnalysis?.suggestedResponse === 'partial_approval' && (
                    <div className="border border-gray-200 rounded-lg p-4">
                      <h3 className="text-sm font-medium text-gray-800 mb-3">AI-Generated Response Draft</h3>
                      <div className="bg-gray-50 p-3 rounded-lg text-xs text-gray-700 space-y-2">
                        <p><strong>Subject:</strong> Re: {selectedDocument.name}</p>
                        <p><strong>Date:</strong> {new Date().toLocaleDateString()}</p>
                        <br />
                        <p>Dear [Contractor Representative],</p>
                        <br />
                        <p>We acknowledge receipt of your dispute letter dated {selectedDocument.uploadDate} regarding {selectedDocument.name}.</p>
                        <br />
                        <p>After careful review of the documentation provided, we would like to address the following points:</p>
                        <br />
                        <p>1. [AI-generated response based on document analysis]</p>
                        <p>2. [Specific action items or clarifications needed]</p>
                        <p>3. [Timeline and next steps]</p>
                        <br />
                        <p>We look forward to your prompt response and continued collaboration.</p>
                        <br />
                        <p>Sincerely,</p>
                        <p>[Your Name]</p>
                        <p>[Your Title]</p>
                      </div>
                      <div className="flex justify-end mt-3 space-x-2">
                        <button className="px-3 py-1 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-50">
                          Edit Draft
                        </button>
                        <button className="px-3 py-1 text-xs font-medium text-white bg-blue-600 rounded hover:bg-blue-700">
                          Send Response
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
function DocumentHandling() {
  // State for document handling functionality
  const [uploadedDocuments, setUploadedDocuments] = useState<Document[]>([
    {
      id: '1',
      name: 'Contractor_Letter_001.pdf',
      type: 'Letter',
      uploadDate: '2023-12-10',
      status: 'analyzed' as const,
      aiAnalysis: {
        summary: 'Request for time extension due to material delivery delays',
        keyPoints: [
          'Contractor requesting 15-day extension',
          'Cites force majeure clause 8.4(d)',
          'References port congestion as cause',
          'Provides supporting documentation'
        ],
        suggestedResponse: 'draft_available'
      }
    },
    {
      id: '2',
      name: 'Quality_Report_December.pdf',
      type: 'Report',
      uploadDate: '2023-12-08',
      status: 'analyzed' as const,
      aiAnalysis: {
        summary: 'Monthly quality inspection report showing compliance issues',
        keyPoints: [
          '3 minor non-conformities identified',
          'All major systems compliant',
          'Recommendations for improvement provided',
          'Next inspection scheduled for January 15'
        ],
        suggestedResponse: 'review_required'
      }
    },
    {
      id: '3',
      name: 'Payment_Request_Invoice_123.pdf',
      type: 'Invoice',
      uploadDate: '2023-12-05',
      status: 'analyzing' as const,
      aiAnalysis: null
    }
  ]);

  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [showResponseGenerator, setShowResponseGenerator] = useState(false);
  const [responseType, setResponseType] = useState('acknowledgment');
  const [responseTone, setResponseTone] = useState('professional');
  const [customInstructions, setCustomInstructions] = useState('');
  const [generatedResponse, setGeneratedResponse] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  // Handle file upload
  const handleFileUpload = (files: FileList) => {
    const newDocuments: Document[] = Array.from(files).map((file, index) => ({
      id: `${Date.now()}-${index}`,
      name: file.name,
      type: file.type.includes('pdf') ? 'PDF' : 'Document',
      uploadDate: new Date().toISOString().split('T')[0],
      status: 'analyzing' as const,
      aiAnalysis: null
    }));
    
    setUploadedDocuments(prev => [...newDocuments, ...prev]);
    setShowUploadModal(false);
    
    // Simulate AI analysis after 3 seconds
    setTimeout(() => {
      setUploadedDocuments(prev => prev.map(doc => 
        doc.status === 'analyzing' 
          ? {
              ...doc,
              status: 'analyzed' as const,
              aiAnalysis: {
                summary: 'AI analysis completed - document content processed and key information extracted',
                keyPoints: [
                  'Document type: ' + doc.type,
                  'Key terms and clauses identified',
                  'Action items highlighted',
                  'Response recommendations generated'
                ],
                suggestedResponse: 'draft_available'
              }
            }
          : doc
      ));
    }, 3000);
  };

  // Handle drag and drop
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files);
    }
  };

  // Handle response generation
  const handleGenerateResponse = async () => {
    if (!selectedDocument) return;
    
    setIsGenerating(true);
    
    // Simulate AI response generation
    setTimeout(() => {
      const responseTemplates = {
        acknowledgment: {
          professional: `Dear [Contractor Representative],

We acknowledge receipt of your correspondence dated ${selectedDocument.uploadDate} regarding the matter outlined in ${selectedDocument.name}.

After careful review of the documentation provided, we would like to address the following points:

1. We understand your request for a time extension due to the circumstances described.
2. We are currently reviewing the supporting documentation to assess the validity of the claim.
3. We will provide a formal response within 5 business days.

We appreciate your continued cooperation and look forward to resolving this matter promptly.

Sincerely,
[Your Name]
[Your Title]`,
          formal: `Dear Sir/Madam,

This letter serves to acknowledge receipt of your communication dated ${selectedDocument?.uploadDate}, reference ${selectedDocument?.name}.

We have received and are currently reviewing the documentation submitted in support of your request. Our team is conducting a thorough analysis of the circumstances and will respond in accordance with the contract terms.

We will provide our formal response within the stipulated timeframe as per the contract provisions.

Yours faithfully,
[Your Name]
[Your Title]`,
          friendly: `Hi [Contractor Representative],

Thanks for reaching out with your letter dated ${selectedDocument?.uploadDate}. We've received ${selectedDocument?.name} and are taking a look at everything you've sent over.

We understand the situation you're facing and want to work with you to find a solution. Our team is reviewing the details and we'll get back to you soon with our response.

Thanks for your patience and continued partnership!

Best regards,
[Your Name]
[Your Title]`
        },
        clarification: {
          professional: `Dear [Contractor Representative],

Thank you for your correspondence dated ${selectedDocument?.uploadDate} regarding ${selectedDocument?.name}.

To ensure we can provide you with the most accurate response, we would appreciate clarification on the following points:

1. Could you provide additional details regarding the specific circumstances mentioned?
2. Are there any supporting documents that could help us better understand the situation?
3. What is your preferred timeline for resolution?

We look forward to your response and continued collaboration.

Sincerely,
[Your Name]
[Your Title]`,
          formal: `Dear Sir/Madam,

Reference is made to your communication dated ${selectedDocument.uploadDate}, file reference ${selectedDocument.name}.

To proceed with our review, we require the following additional information:

1. Detailed explanation of the circumstances
2. Supporting documentation
3. Proposed resolution timeline

Please provide the requested information at your earliest convenience.

Yours faithfully,
[Your Name]
[Your Title]`,
          friendly: `Hi [Contractor Representative],

Thanks for sending over ${selectedDocument?.name} on ${selectedDocument?.uploadDate}. We're looking into this and want to make sure we have all the details we need.

Could you help us out with a few more specifics? We'd love to get this sorted out quickly for you.

Looking forward to hearing from you!

Best,
[Your Name]
[Your Title]`
        },
        rejection: {
          professional: `Dear [Contractor Representative],

We acknowledge receipt of your correspondence dated ${selectedDocument?.uploadDate} regarding ${selectedDocument?.name}.

After careful review of your request and the supporting documentation, we regret to inform you that we cannot approve the request as submitted for the following reasons:

1. The circumstances described do not meet the criteria outlined in the contract.
2. Additional supporting documentation is required to substantiate the claim.
3. The timeline proposed is not feasible given current project constraints.

We encourage you to resubmit your request with the necessary documentation and revised timeline.

Sincerely,
[Your Name]
[Your Title]`,
          formal: `Dear Sir/Madam,

Reference is made to your communication dated ${selectedDocument.uploadDate}, file reference ${selectedDocument.name}.

After thorough review, we must decline your request based on the following:

1. Contractual requirements not met
2. Insufficient supporting documentation
3. Timeline constraints

Please resubmit with complete documentation.

Yours faithfully,
[Your Name]
[Your Title]`,
          friendly: `Hi [Contractor Representative],

Thanks for reaching out about ${selectedDocument?.name}. We've looked into your request, but unfortunately we can't approve it as it stands right now.

The main issues are that we need a bit more documentation and the timeline might be tight. If you could resubmit with the additional info, we'd be happy to take another look!

Thanks for understanding!

Best,
[Your Name]
[Your Title]`
        }
      };

      let response = responseTemplates[responseType as keyof typeof responseTemplates]?.[responseTone as keyof typeof responseTemplates.acknowledgment] || responseTemplates.acknowledgment.professional;
      
      // Add custom instructions if provided
      if (customInstructions.trim()) {
        response += `\n\nAdditional Notes: ${customInstructions}`;
      }

      setGeneratedResponse(response);
      setIsGenerating(false);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="text-sm font-medium text-blue-800 mb-2">
          Document Handling & AI Analysis
        </h3>
        <p className="text-xs text-blue-700">
          Upload contractor letters and documents. AI will analyze content, explain key points, and suggest appropriate responses.
        </p>
      </div>

      {/* Upload Section */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-base font-medium text-gray-800">Upload Documents</h3>
          <button 
            onClick={() => setShowUploadModal(true)}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 flex items-center"
          >
            <PlusIcon size={16} className="mr-2" />
            Upload Document
          </button>
        </div>

        {/* Drag and Drop Area */}
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            dragActive 
              ? 'border-blue-400 bg-blue-50' 
              : 'border-gray-300 hover:border-gray-400'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <UploadIcon size={48} className="mx-auto text-gray-400 mb-4" />
          <p className="text-sm text-gray-600 mb-2">
            Drag and drop documents here, or click to browse
          </p>
          <p className="text-xs text-gray-500">
            Supports PDF, DOC, DOCX files up to 10MB
          </p>
          <input
            type="file"
            multiple
            accept=".pdf,.doc,.docx"
            onChange={(e) => e.target.files && handleFileUpload(e.target.files)}
            className="hidden"
            id="file-upload"
          />
          <label
            htmlFor="file-upload"
            className="mt-4 inline-block px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 cursor-pointer"
          >
            Choose Files
          </label>
        </div>
        </div>

      {/* Documents List */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-200 bg-gray-50">
          <h3 className="text-sm font-medium text-gray-800">Uploaded Documents</h3>
      </div>
        <div className="divide-y divide-gray-200">
          {uploadedDocuments.map((doc) => (
            <div key={doc.id} className="p-4 hover:bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <FileIcon size={20} className="text-blue-600" />
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">{doc.name}</h4>
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <span>{doc.type}</span>
                      <span>Uploaded: {doc.uploadDate}</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        doc.status === 'analyzed' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {doc.status === 'analyzed' ? 'Analyzed' : 'Analyzing...'}
            </span>
          </div>
        </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button 
                    onClick={() => setSelectedDocument(doc)}
                    className="p-2 text-gray-400 hover:text-blue-600"
                    title="View Analysis"
                  >
                    <EyeIcon size={16} />
                    </button>
                  <button className="p-2 text-gray-400 hover:text-gray-600" title="Download">
                    <DownloadIcon size={16} />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-red-600" title="Delete">
                    <TrashIcon size={16} />
                  </button>
                </div>
              </div>

              {/* AI Analysis Preview */}
              {doc.status === 'analyzed' && doc.aiAnalysis && (
                <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                  <h5 className="text-xs font-medium text-gray-700 mb-2">AI Analysis Summary:</h5>
                  <p className="text-xs text-gray-600 mb-2">{doc.aiAnalysis.summary}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex space-x-2">
                      {doc.aiAnalysis.keyPoints.slice(0, 2).map((point, index) => (
                        <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                          {point}
                    </span>
                      ))}
                    </div>
                    <button 
                      onClick={() => setSelectedDocument(doc)}
                      className="text-xs text-blue-600 font-medium hover:text-blue-800"
                    >
                      View Full Analysis →
                    </button>
          </div>
        </div>
              )}
      </div>
          ))}
        </div>
      </div>

      {/* Document Analysis Modal */}
      {selectedDocument && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-medium text-gray-900">Document Analysis</h2>
                <button 
                  onClick={() => setSelectedDocument(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XIcon size={24} />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-6">
                {/* Document Info */}
                <div className="space-y-4">
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h3 className="text-sm font-medium text-gray-800 mb-3">Document Information</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Name:</span>
                        <span className="font-medium">{selectedDocument.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Type:</span>
                        <span className="font-medium">{selectedDocument.type}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Upload Date:</span>
                        <span className="font-medium">{selectedDocument.uploadDate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Status:</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          selectedDocument.status === 'analyzed' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {selectedDocument.status === 'analyzed' ? 'Analyzed' : 'Analyzing...'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* AI Analysis */}
                  {selectedDocument.aiAnalysis && (
                    <div className="border border-gray-200 rounded-lg p-4">
                      <h3 className="text-sm font-medium text-gray-800 mb-3">AI Analysis</h3>
                      <div className="space-y-3">
        <div>
                          <h4 className="text-xs font-medium text-gray-700 mb-1">Summary:</h4>
                          <p className="text-xs text-gray-600">{selectedDocument.aiAnalysis.summary}</p>
        </div>
                        <div>
                          <h4 className="text-xs font-medium text-gray-700 mb-2">Key Points:</h4>
                          <ul className="space-y-1">
                            {selectedDocument.aiAnalysis.keyPoints.map((point, index) => (
                              <li key={index} className="text-xs text-gray-600 flex items-start">
                                <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                                {point}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Response Actions */}
                <div className="space-y-4">
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h3 className="text-sm font-medium text-gray-800 mb-3">Suggested Actions</h3>
                    <div className="space-y-3">
                      <button 
                        onClick={() => setShowResponseGenerator(true)}
                        className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 flex items-center justify-center"
                      >
                        <EditIcon size={16} className="mr-2" />
                        Generate Response Draft
                      </button>
                      <button className="w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center justify-center">
                        <MessageSquareTextIcon size={16} className="mr-2" />
                        Request Clarification
                      </button>
                      <button className="w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center justify-center">
                        <CalendarIcon size={16} className="mr-2" />
                        Schedule Meeting
          </button>
        </div>
      </div>

                  {/* Sample Response Draft */}
                  {selectedDocument.aiAnalysis?.suggestedResponse === 'draft_available' && (
                    <div className="border border-gray-200 rounded-lg p-4">
                      <h3 className="text-sm font-medium text-gray-800 mb-3">AI-Generated Response Draft</h3>
                      <div className="bg-gray-50 p-3 rounded-lg text-xs text-gray-700 space-y-2">
                        <p><strong>Subject:</strong> Re: {selectedDocument.name}</p>
                        <p><strong>Date:</strong> {new Date().toLocaleDateString()}</p>
                        <br />
                        <p>Dear [Contractor Representative],</p>
                        <br />
                        <p>We acknowledge receipt of your correspondence dated {selectedDocument.uploadDate} regarding the matter outlined in {selectedDocument.name}.</p>
                        <br />
                        <p>After careful review of the documentation provided, we would like to address the following points:</p>
                        <br />
                        <p>1. [AI-generated response based on document analysis]</p>
                        <p>2. [Specific action items or clarifications needed]</p>
                        <p>3. [Timeline and next steps]</p>
                        <br />
                        <p>We look forward to your prompt response and continued collaboration.</p>
                        <br />
                        <p>Sincerely,</p>
                        <p>[Your Name]</p>
                        <p>[Your Title]</p>
                      </div>
                      <div className="flex justify-end mt-3 space-x-2">
                        <button className="px-3 py-1 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-50">
                          Edit Draft
                        </button>
                        <button className="px-3 py-1 text-xs font-medium text-white bg-blue-600 rounded hover:bg-blue-700">
                          Send Response
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-medium text-gray-900">Upload Document</h2>
                <button 
                  onClick={() => setShowUploadModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XIcon size={24} />
                </button>
              </div>
              
              <div className="space-y-4">
                <div
                  className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                    dragActive 
                      ? 'border-blue-400 bg-blue-50' 
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <UploadIcon size={32} className="mx-auto text-gray-400 mb-2" />
                  <p className="text-sm text-gray-600 mb-1">Drop files here or click to browse</p>
                  <p className="text-xs text-gray-500">PDF, DOC, DOCX up to 10MB</p>
                </div>
                
                <input
                  type="file"
                  multiple
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => e.target.files && handleFileUpload(e.target.files)}
                  className="hidden"
                  id="modal-file-upload"
                />
                <label
                  htmlFor="modal-file-upload"
                  className="block w-full px-4 py-2 text-sm font-medium text-center text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 cursor-pointer"
                >
                  Choose Files
          </label>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Response Generator Modal */}
      {showResponseGenerator && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-medium text-gray-900">Generate Response Draft</h2>
                <button 
                  onClick={() => {
                    setShowResponseGenerator(false);
                    setGeneratedResponse('');
                    setCustomInstructions('');
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XIcon size={24} />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-6">
                {/* Configuration Panel */}
                <div className="space-y-4">
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h3 className="text-sm font-medium text-gray-800 mb-3">Response Configuration</h3>
                    
                    {/* Response Type */}
                    <div className="mb-4">
                      <label className="block text-xs font-medium text-gray-700 mb-2">Response Type</label>
                      <select 
                        value={responseType} 
                        onChange={(e) => setResponseType(e.target.value)}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                      >
                        <option value="acknowledgment">Acknowledgment</option>
                        <option value="clarification">Request Clarification</option>
                        <option value="rejection">Rejection</option>
          </select>
        </div>

                    {/* Response Tone */}
                    <div className="mb-4">
                      <label className="block text-xs font-medium text-gray-700 mb-2">Tone</label>
                      <select 
                        value={responseTone} 
                        onChange={(e) => setResponseTone(e.target.value)}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                      >
                        <option value="professional">Professional</option>
                        <option value="formal">Formal</option>
                        <option value="friendly">Friendly</option>
          </select>
        </div>

                    {/* Custom Instructions */}
                    <div className="mb-4">
                      <label className="block text-xs font-medium text-gray-700 mb-2">Custom Instructions (Optional)</label>
                      <textarea
                        value={customInstructions}
                        onChange={(e) => setCustomInstructions(e.target.value)}
                        placeholder="Add any specific instructions or requirements for the response..."
                        className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm resize-none"
                        rows={3}
                      />
      </div>

                    {/* Generate Button */}
                    <button
                      onClick={handleGenerateResponse}
                      disabled={isGenerating}
                      className={`w-full px-4 py-2 text-sm font-medium rounded-lg flex items-center justify-center ${
                        isGenerating 
                          ? 'bg-gray-400 text-white cursor-not-allowed' 
                          : 'bg-blue-600 text-white hover:bg-blue-700'
                      }`}
                    >
                      {isGenerating ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Generating...
                        </>
                      ) : (
                        <>
                          <EditIcon size={16} className="mr-2" />
                          Generate Response
                        </>
                      )}
                    </button>
            </div>

                  {/* Document Context */}
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h3 className="text-sm font-medium text-gray-800 mb-3">Document Context</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Document:</span>
                        <span className="font-medium">{selectedDocument?.name}</span>
          </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Type:</span>
                        <span className="font-medium">{selectedDocument?.type}</span>
        </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Date:</span>
                        <span className="font-medium">{selectedDocument?.uploadDate}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Generated Response Panel */}
                <div className="space-y-4">
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="text-sm font-medium text-gray-800">Generated Response</h3>
                      {generatedResponse && (
                        <div className="flex space-x-2">
                          <button 
                            onClick={() => navigator.clipboard.writeText(generatedResponse)}
                            className="px-3 py-1 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-50"
                          >
                            Copy
                    </button>
                          <button 
                            onClick={() => setGeneratedResponse('')}
                            className="px-3 py-1 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-50"
                          >
                            Clear
                    </button>
          </div>
                      )}
        </div>
                    
                    {generatedResponse ? (
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <pre className="text-xs text-gray-700 whitespace-pre-wrap font-sans">
                          {generatedResponse}
                        </pre>
      </div>
                    ) : (
                      <div className="bg-gray-50 p-8 rounded-lg text-center">
                        <EditIcon size={32} className="mx-auto text-gray-400 mb-2" />
                        <p className="text-sm text-gray-500">
                          Configure your response settings and click "Generate Response" to create a draft.
          </p>
        </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  {generatedResponse && (
                    <div className="border border-gray-200 rounded-lg p-4">
                      <h3 className="text-sm font-medium text-gray-800 mb-3">Actions</h3>
                      <div className="space-y-2">
                        <button className="w-full px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 flex items-center justify-center">
                          <MessageSquareTextIcon size={16} className="mr-2" />
                          Send Response
          </button>
                        <button className="w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center justify-center">
                          <DownloadIcon size={16} className="mr-2" />
                          Save as Draft
                        </button>
                        <button className="w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center justify-center">
                          <EditIcon size={16} className="mr-2" />
                          Edit Response
          </button>
        </div>
      </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
function RiskMonitoring() {
  return <div className="space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="text-sm font-medium text-blue-800 mb-2">
          Risk Monitoring
        </h3>
        <p className="text-xs text-blue-700">
          Monitor ongoing contract risks, track mitigation actions, and receive
          alerts for emerging issues.
        </p>
      </div>
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-700">
              Overall Risk Level
            </h3>
            <BarChart2Icon size={18} className="text-amber-600" />
          </div>
          <p className="text-2xl font-bold text-amber-600">Medium (5.4)</p>
          <p className="text-xs text-gray-500 mt-1">
            Decreased from 6.2 last month
          </p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-700">
              Active Risk Items
            </h3>
            <AlertTriangleIcon size={18} className="text-blue-600" />
          </div>
          <p className="text-2xl font-bold text-gray-900">15</p>
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>3 High</span>
            <span>7 Medium</span>
            <span>5 Low</span>
          </div>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-700">
              Mitigation Progress
            </h3>
            <CheckSquareIcon size={18} className="text-green-600" />
          </div>
          <div className="flex items-center">
            <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
              <div className="h-full bg-green-600 h-2.5 rounded-full" style={{ width: '65%' }}></div>
            </div>
            <span className="text-xs font-medium text-gray-700">65%</span>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            10 of 15 risks have active mitigation
          </p>
        </div>
      </div>
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
          <h3 className="text-sm font-medium text-gray-700">
            Active Risk Register
          </h3>
          <div className="flex space-x-2">
            <button className="px-3 py-1 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-50">
              Filter
            </button>
            <button className="px-3 py-1 text-xs font-medium text-blue-700 bg-blue-50 rounded hover:bg-blue-100">
              Add Risk
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Risk Item
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contract
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Level
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Impact
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Owner
                </th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr className="bg-red-50">
                <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                  Payment Milestone Delay
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                  Siemens Electrical Systems
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                  Financial
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span className="px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800">
                    High
                  </span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                  <div className="flex items-center">
                    <div className="w-16 h-1.5 bg-gray-200 rounded-full mr-2">
                      <div className="h-full bg-amber-500 rounded-full" style={{ width: '50%' }}></div>
                    </div>
                    <span className="text-xs">50%</span>
                  </div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                  Finance Dept
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-center">
                  <button className="text-xs text-blue-600 font-medium">
                    View
                  </button>
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                  Material Quality Issues
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                  ABB Electrical Equipment
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                  Technical
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span className="px-2 py-1 text-xs font-medium rounded-full bg-amber-100 text-amber-800">
                    Medium
                  </span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                  <div className="flex items-center">
                    <div className="w-16 h-1.5 bg-gray-200 rounded-full mr-2">
                      <div className="h-full bg-green-500 rounded-full" style={{ width: '75%' }}></div>
                    </div>
                    <span className="text-xs">75%</span>
                  </div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                  QA Team
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-center">
                  <button className="text-xs text-blue-600 font-medium">
                    View
                  </button>
                </td>
              </tr>
              <tr className="bg-gray-50">
                <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                  Regulatory Approval Delay
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                  Siemens Electrical Systems
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                  Legal
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span className="px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800">
                    High
                  </span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                  <div className="flex items-center">
                    <div className="w-16 h-1.5 bg-gray-200 rounded-full mr-2">
                      <div className="h-full bg-green-500 rounded-full" style={{ width: '80%' }}></div>
                    </div>
                    <span className="text-xs">80%</span>
                  </div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                  Legal Dept
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-center">
                  <button className="text-xs text-blue-600 font-medium">
                    View
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <h3 className="text-sm font-medium text-gray-800 mb-3">
            Risk Trends
          </h3>
          <div className="h-40 bg-gray-50 rounded-lg border border-gray-200 flex items-center justify-center">
            <p className="text-sm text-gray-500">
              Risk trend chart would appear here
            </p>
          </div>
          <div className="mt-3 grid grid-cols-3 gap-2 text-center text-xs">
            <div className="p-2 bg-gray-50 rounded">
              <p className="text-gray-500">Last Month</p>
              <p className="font-medium text-red-600">High (6.2)</p>
            </div>
            <div className="p-2 bg-gray-50 rounded">
              <p className="text-gray-500">Current</p>
              <p className="font-medium text-amber-600">Medium (5.4)</p>
            </div>
            <div className="p-2 bg-gray-50 rounded">
              <p className="text-gray-500">Forecast</p>
              <p className="font-medium text-amber-600">Medium (5.0)</p>
            </div>
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <h3 className="text-sm font-medium text-gray-800 mb-3">
            Risk Mitigation Actions
          </h3>
          <div className="space-y-3">
            <div className="flex items-start p-2 bg-gray-50 rounded-lg">
              <CheckSquareIcon size={16} className="text-green-600 mt-0.5 mr-2 flex-shrink-0" />
              <div>
                <p className="text-xs font-medium text-gray-800">
                  Weekly quality inspections implemented
                </p>
                <p className="text-xs text-gray-500">
                  For: Material Quality Issues
                </p>
                <div className="mt-1 flex justify-between text-xs">
                  <span className="text-gray-500">
                    Completed on: Dec 5, 2023
                  </span>
                  <span className="text-green-600">Effective</span>
                </div>
              </div>
            </div>
            <div className="flex items-start p-2 bg-gray-50 rounded-lg">
              <ClockIcon size={16} className="text-amber-600 mt-0.5 mr-2 flex-shrink-0" />
              <div>
                <p className="text-xs font-medium text-gray-800">
                  Expedite regulatory approval process
                </p>
                <p className="text-xs text-gray-500">
                  For: Regulatory Approval Delay
                </p>
                <div className="mt-1 flex justify-between text-xs">
                  <span className="text-gray-500">
                    In progress: 80% complete
                  </span>
                  <span className="text-amber-600">Monitoring</span>
                </div>
              </div>
            </div>
            <div className="flex items-start p-2 bg-gray-50 rounded-lg">
              <AlertTriangleIcon size={16} className="text-red-600 mt-0.5 mr-2 flex-shrink-0" />
              <div>
                <p className="text-xs font-medium text-gray-800">
                  Renegotiate payment schedule
                </p>
                <p className="text-xs text-gray-500">
                  For: Payment Milestone Delay
                </p>
                <div className="mt-1 flex justify-between text-xs">
                  <span className="text-gray-500">
                    In progress: 50% complete
                  </span>
                  <span className="text-red-600">Urgent</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
}
