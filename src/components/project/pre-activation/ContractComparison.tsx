import React, { useState } from 'react';
import { ArrowRightIcon, BrainIcon, GitCommitIcon, SearchIcon, AlertTriangleIcon, InfoIcon, XIcon, ThumbsUpIcon, ThumbsDownIcon, SendIcon, GitBranchIcon, DownloadIcon } from 'lucide-react';
import { diffChars } from 'diff';
import { AIAssistant } from '../../ai/AIAssistant';
import { ResizableBox } from 'react-resizable';

// Mock data for contractor drafts
const contractorDrafts = [{
  id: 'siemens',
  name: 'Siemens',
  status: 'processed',
  riskScore: 8.2,
  riskLevel: 'high',
  modifiedClauses: 18,
  deviationPercentage: 80
}, {
  id: 'abb',
  name: 'ABB',
  status: 'processed',
  riskScore: 6.8,
  riskLevel: 'medium',
  modifiedClauses: 12,
  deviationPercentage: 60
}, {
  id: 'orascom',
  name: 'Orascom',
  status: 'processed',
  riskScore: 4.5,
  riskLevel: 'low',
  modifiedClauses: 7,
  deviationPercentage: 35
}];
// Risk categories data
const riskCategories = [{
  name: 'Force Majeure Clauses',
  level: 'high',
  percentage: 85
}, {
  name: 'Payment Terms',
  level: 'medium',
  percentage: 65
}, {
  name: 'Time Extensions',
  level: 'medium',
  percentage: 60
}];

// Sample clauses for comparison
const comparisonClauses = [{
  id: '8.4',
  name: 'Clause 8.4',
  title: 'Extension of Time for Completion',
  risk: 'high'
}, {
  id: '14.7',
  name: 'Clause 14.7',
  title: 'Payment',
  risk: 'medium'
}, {
  id: '15.2',
  name: 'Clause 15.2',
  title: 'Termination by Employer',
  risk: 'low'
}, {
  id: '19.1',
  name: 'Clause 19.1',
  title: 'Force Majeure',
  risk: 'high'
}, {
  id: '20.1',
  name: 'Clause 20.1',
  title: 'Contractor Claims',
  risk: 'medium'
}];

export function ContractComparison({
  onContinue,
  language = 'english'
}) {
  const isRTL = language === 'arabic';
  const [showAiAssistant, setShowAiAssistant] = useState(false);
  const [selectedClause, setSelectedClause] = useState('8.4');
  const [selectedVersion, setSelectedVersion] = useState('diff');
  const [selectedContractors, setSelectedContractors] = useState(['abb']);
  const [controlsHeight, setControlsHeight] = useState(220);

  // Function to get color based on risk level
  const getRiskColor = level => {
    switch (level) {
      case 'high':
        return 'red';
      case 'medium':
        return 'amber';
      case 'low':
        return 'green';
      default:
        return 'blue';
    }
  };
  // Function to get recommendation based on selected contractors
  const getRecommendation = () => {
    if (selectedContractors.length === 0) return null;
    // Find contractor with lowest risk
    const availableContractors = contractorDrafts.filter(c => selectedContractors.includes(c.id));
    if (availableContractors.length === 0) return null;
    const lowestRiskContractor = availableContractors.reduce((prev, current) => prev.riskScore < current.riskScore ? prev : current);
    return {
      contractor: lowestRiskContractor,
      message: `${lowestRiskContractor.name}'s contract has the lowest risk profile with minimal deviations from the FIDIC template. Consider prioritizing negotiations with ${lowestRiskContractor.name}.`
    };
  };

  const handleAiAssistantToggle = () => {
    setShowAiAssistant(!showAiAssistant);
  };

  const toggleContractorSelection = contractorId => {
    if (selectedContractors.includes(contractorId)) {
      // Remove if already selected
      if (selectedContractors.length > 1) {
        // Don't allow removing all contractors
        setSelectedContractors(selectedContractors.filter(id => id !== contractorId));
      }
    } else {
      // Add if not selected
      setSelectedContractors([...selectedContractors, contractorId]);
    }
  };
  // Get clause content based on contractor and clause ID (mock data)
  const getClauseContent = (contractorId, clauseId) => {
    if (contractorId === 'fidic' && clauseId === '8.4') {
      return "The Contractor shall be entitled subject to Sub-Clause 20.1 [Contractor's Claims] to an extension of the Time for Completion if and to the extent that completion for the purposes of Sub-Clause 10.1 [Taking Over of the Works and Sections] is or will be delayed by any of the following causes: a) a Variation (unless an adjustment to the Time for Completion has been agreed under Sub-Clause 13.3 [Variation Procedure]) b) a cause of delay giving an entitlement to extension of time under a Sub-Clause of these Conditions c) exceptionally adverse climatic conditions d) Unforeseeable shortages in the availability of personnel or Goods caused by epidemic or governmental actions e) any delay, impediment or prevention caused by or attributable to the Employer, the Employer's Personnel, or the Employer's other contractors";
    } else if (contractorId === 'abb' && clauseId === '8.4') {
      return "The Contractor shall be entitled subject to Sub-Clause 20.1 [Contractor's Claims] to an extension of the Time for Completion if and to the extent that completion for the purposes of Sub-Clause 10.1 [Taking Over of the Works and Sections] is or will be delayed by any of the following causes: a) a Variation (unless an adjustment to the Time for Completion has been agreed under Sub-Clause 13.3 [Variation Procedure]) b) a cause of delay giving an entitlement to extension of time under a Sub-Clause of these Conditions c) any climatic conditions that, in the Contractor's opinion, may adversely affect the Works d) Unforeseeable shortages in the availability of personnel or Goods caused by epidemic or governmental actions e) any delay, impediment or prevention caused by or attributable to the Employer, the Employer's Personnel, or the Employer's other contractors";
    } else if (contractorId === 'siemens' && clauseId === '8.4') {
      return "The Contractor shall be entitled subject to Sub-Clause 20.1 [Contractor's Claims] to an extension of the Time for Completion if and to the extent that completion for the purposes of Sub-Clause 10.1 [Taking Over of the Works and Sections] is or will be delayed by any of the following causes: a) a Variation (unless an adjustment to the Time for Completion has been agreed under Sub-Clause 13.3 [Variation Procedure]) b) a cause of delay giving an entitlement to extension of time under a Sub-Clause of these Conditions c) any adverse climatic conditions d) Unforeseeable shortages in the availability of personnel or Goods caused by epidemic, pandemic, or governmental actions e) any delay or disruption caused by third parties";
    } else if (contractorId === 'orascom' && clauseId === '8.4') {
      return "The Contractor shall be entitled subject to Sub-Clause 20.1 [Contractor's Claims] to an extension of the Time for Completion if and to the extent that completion for the purposes of Sub-Clause 10.1 [Taking Over of the Works and Sections] is or will be delayed by any of the following causes: a) a Variation (unless an adjustment to the Time for Completion has been agreed under Sub-Clause 13.3 [Variation Procedure]) b) a cause of delay giving an entitlement to extension of time under a Sub-Clause of these Conditions c) exceptionally adverse climatic conditions, as defined in the Contract Data d) Unforeseeable shortages in the availability of personnel or Goods caused by epidemic or governmental actions";
    }
    return 'Clause content not available';
  };
  // Get diff data between FIDIC and contractor draft
  const getDiffData = (contractorId, clauseId) => {
    const fidicText = getClauseContent('fidic', clauseId);
    const contractorText = getClauseContent(contractorId, clauseId);
    const diff = diffChars(fidicText, contractorText);
    return diff.map(part => {
      if (part.added) {
        return { type: 'added', content: part.value };
      }
      if (part.removed) {
        return { type: 'removed', content: part.value };
      }
      return { type: 'unchanged', content: part.value };
    });
  };
  // Filter contractors to only show selected ones
  const selectedContractorData = contractorDrafts.filter(contractor => selectedContractors.includes(contractor.id));
  // Get recommendation
  const recommendation = getRecommendation();
  return (
      <div className={`flex ${showAiAssistant ? 'space-x-6' : ''}`}>
        <div className={`${showAiAssistant ? 'w-2/3' : 'w-full'} space-y-6`}>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="text-sm font-medium text-blue-800 mb-2">
              {isRTL ? 'مقارنة العقود' : 'Contract Comparison'}
            </h3>
            <p className="text-xs text-blue-700">
              {isRTL ? 'قارن بين مسودات المقاولين وقالب FIDIC الخاص بك. حدد البنود المتغيرة وقيم المخاطر المرتبطة بها.' : 'Compare contractor drafts with your FIDIC template. Identify changed clauses and evaluate associated risks.'}
            </p>
          </div>
          {/* Dynamic Risk Summary - Only show when contractors are selected */} 
          {selectedContractors.length > 0 && <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
              <h3 className="text-sm font-medium text-gray-800 mb-3 flex items-center">
                <AlertTriangleIcon size={16} className="mr-2 text-blue-600" />
                {isRTL ? 'ملخص المخاطر عبر العقود' : 'Cross-Contract Risk Summary'}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* FIDIC Baseline */} 
                <div className="bg-gray-50 rounded-lg p-3 text-center">
                  <div className="flex justify-center mb-2">
                    <div className="w-12 h-12 rounded-full border-4 border-blue-500 flex items-center justify-center">
                      <span className="text-sm font-bold text-blue-600">FIDIC</span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-600">Baseline Template</p>
                </div>
                {/* Dynamic Contractor Cards */} 
                {selectedContractorData.map(contractor => <div key={contractor.id} className="bg-gray-50 rounded-lg p-3 text-center">
                    <div className="flex justify-center mb-2">
                      <div className={`w-12 h-12 rounded-full border-4 border-${getRiskColor(contractor.riskLevel)}-500 flex items-center justify-center`}>
                        <span className={`text-sm font-bold text-${getRiskColor(contractor.riskLevel)}-600`}>
                          {contractor.riskScore}
                        </span>
                      </div>
                    </div>
                    <p className="text-xs text-gray-600">
                      {contractor.name} Contract
                    </p>
                    <p className={`text-xs text-${getRiskColor(contractor.riskLevel)}-600 font-medium`}>
                      {contractor.riskLevel === 'high' ? 'High' : contractor.riskLevel === 'medium' ? 'Medium' : 'Low'}{' '}
                      Risk
                    </p>
                  </div>)}
              </div>
              <div className="mt-4 pt-3 border-t border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <h4 className="text-xs font-medium text-gray-700 mb-2">
                      Top Risk Categories
                    </h4>
                    <div className="space-y-2">
                      {riskCategories.slice(0, 2).map((category, index) => <div key={index}>
                          <div className="flex justify-between text-xs mb-1">
                            <span>{category.name}</span>
                            <span className={`font-medium text-${getRiskColor(category.level)}-600`}>
                              {category.level === 'high' ? 'High' : category.level === 'medium' ? 'Medium' : 'Low'}
                            </span>
                          </div>
                          <div className="w-full h-2 bg-gray-200 rounded-full">
                            <div className={`h-full bg-${getRiskColor(category.level)}-500 rounded-full`} style={{
                        width: `${category.percentage}%`
                      }}></div>
                          </div>
                        </div>)}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-xs font-medium text-gray-700 mb-2">
                      FIDIC Deviations
                    </h4>
                    <div className="space-y-2">
                      {selectedContractorData.slice(0, 2).map(contractor => <div key={contractor.id}>
                          <div className="flex justify-between text-xs mb-1">
                            <span>{contractor.name}</span>
                            <span>
                              {contractor.modifiedClauses} clauses modified
                            </span>
                          </div>
                          <div className="w-full h-2 bg-gray-200 rounded-full">
                            <div className={`h-full bg-${getRiskColor(contractor.riskLevel)}-500 rounded-full`} style={{
                        width: `${contractor.deviationPercentage}%`
                      }}></div>
                          </div>
                        </div>)}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-xs font-medium text-gray-700 mb-2">
                      Overall Recommendation
                    </h4>
                    {recommendation && <div className="bg-blue-50 p-2 rounded-lg border border-blue-100">
                        <p className="text-xs text-blue-800">
                          <InfoIcon size={12} className="inline mr-1" />
                          {recommendation.message}
                        </p>
                      </div>}
                  </div>
                </div>
              </div>
            </div>}
          
          <ResizableBox
            height={controlsHeight}
            onResize={(e, { size }) => setControlsHeight(size.height)}
            axis="y"
            minConstraints={[150, Infinity]}
            maxConstraints={[Infinity, 600]}
            resizeHandles={['s']}
            className="relative bg-white border border-gray-200 rounded-lg p-4"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full overflow-hidden">
              <div className="flex flex-col">
                  <h4 className="text-sm font-medium text-gray-800 mb-3">{isRTL ? 'اختر المقاولين للمقارنة' : 'Select Contractors to Compare'}</h4>
                  <div className="space-y-2 overflow-y-auto">
                    {contractorDrafts.map(contractor => (
                      <div key={contractor.id} className="flex items-center">
                        <input
                          id={`contractor-${contractor.id}`}
                          type="checkbox"
                          className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                          checked={selectedContractors.includes(contractor.id)}
                          onChange={() => toggleContractorSelection(contractor.id)}
                        />
                        <label htmlFor={`contractor-${contractor.id}`} className="ml-2 text-sm text-gray-700">{contractor.name}</label>
                      </div>
                    ))}
                  </div>
              </div>
              <div className="flex flex-col">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="text-sm font-medium text-gray-800">
                      {isRTL ? 'قائمة البنود' : 'Clause List'}
                    </h4>
                    <div className="text-xs px-2 py-1 bg-blue-50 text-blue-700 rounded-full">
                      {isRTL ? 'تم تغيير 12 بند' : '12 clauses changed'}
                    </div>
                  </div>
                  <div className="relative mb-3">
                    <input type="text" placeholder={isRTL ? 'بحث في البنود...' : 'Search clauses...'} className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm" />
                    <SearchIcon size={16} className="absolute right-3 top-2.5 text-gray-400" />
                  </div>
                  <div className="space-y-1 overflow-y-auto flex-grow">
                    {comparisonClauses.map(clause => <div key={clause.id} className={`px-3 py-2 rounded-md cursor-pointer text-sm transition-all duration-200 ${selectedClause === clause.id ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'}`} onClick={() => setSelectedClause(clause.id)}>
                        <div className="flex justify-between items-center">
                          <div className="font-medium">{clause.name}</div>
                          {clause.risk === 'high' && <span className="px-1.5 py-0.5 text-xs font-medium rounded-full bg-red-100 text-red-800">
                              {isRTL ? 'عالي' : 'High'}
                            </span>}
                          {clause.risk === 'medium' && <span className="px-1.5 py-0.5 text-xs font-medium rounded-full bg-amber-100 text-amber-800">
                              {isRTL ? 'متوسط' : 'Medium'}
                            </span>}
                          {clause.risk === 'low' && <span className="px-1.5 py-0.5 text-xs font-medium rounded-full bg-green-100 text-green-800">
                              {isRTL ? 'منخفض' : 'Low'}
                            </span>}
                        </div>
                        <div className="text-xs text-gray-500">{clause.title}</div>
                      </div>)}
                  </div>
              </div>
            </div>
          </ResizableBox>

          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h4 className="text-sm font-medium text-gray-800">
                  {isRTL ? 'البند 8.4 - تمديد مدة الإنجاز' : 'Clause 8.4 - Extension of Time for Completion'}
                </h4>
                <p className="text-xs text-gray-500">
                  {isRTL ? 'مقارنة النصوص' : 'Text Comparison'}
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex space-x-2">
                    <button className={`px-3 py-1.5 text-xs font-medium rounded-lg flex items-center transition-colors duration-200 ${selectedVersion === 'fidic' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`} onClick={() => setSelectedVersion('fidic')}>
                      {isRTL ? 'قالب FIDIC' : 'FIDIC Template'}
                    </button>
                    <button className={`px-3 py-1.5 text-xs font-medium rounded-lg flex items-center transition-colors duration-200 ${selectedVersion === 'contractor' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`} onClick={() => setSelectedVersion('contractor')}>
                      {isRTL ? 'مسودة المقاول' : 'Contractor Draft'}
                    </button>
                    <button className={`px-3 py-1.5 text-xs font-medium rounded-lg flex items-center transition-colors duration-200 ${selectedVersion === 'diff' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`} onClick={() => setSelectedVersion('diff')}>
                      <GitCommitIcon size={14} className="mr-1" />
                      {isRTL ? 'عرض الاختلافات' : 'View Diff'}
                    </button>
                </div>
                <button className="px-3 py-1.5 text-sm font-medium text-blue-700 bg-blue-50 rounded-lg hover:bg-blue-100 flex items-center transition-colors duration-200" onClick={handleAiAssistantToggle}>
                    <BrainIcon size={16} className="mr-2" />
                    {isRTL ? 'المساعد الذكي' : 'AI Assistant'}
                </button>
              </div>
            </div>
            {selectedVersion === 'fidic' && <div className="border border-gray-300 rounded-lg bg-white overflow-hidden">
                <div className="p-3 relative">
                  <div className="w-full h-64 text-sm text-gray-800 overflow-y-auto">
                    <p className="whitespace-pre-wrap">
                      {getClauseContent('fidic', selectedClause)}
                    </p>
                  </div>
                </div>
              </div>}
              {selectedVersion === 'contractor' && <div className={`grid grid-cols-1 md:grid-cols-${selectedContractors.length} gap-4`}>
                {selectedContractors.map(contractorId => {
              const contractor = contractorDrafts.find(c => c.id === contractorId);
              return <div key={contractorId} className="border border-gray-300 rounded-lg bg-white overflow-hidden">
                      <div className="bg-gray-50 px-3 py-2 border-b border-gray-300">
                        <h5 className="text-sm font-medium text-gray-700">
                          {contractor.name}
                        </h5>
                      </div>
                      <div className="p-3 relative">
                        <div className="w-full h-48 text-sm text-gray-800 overflow-y-auto">
                          <p className="whitespace-pre-wrap">
                            {getClauseContent(contractorId, selectedClause)}
                          </p>
                        </div>
                      </div>
                    </div>
            })}
              </div>}
            {selectedVersion === 'diff' && <div className={`grid grid-cols-1 md:grid-cols-${selectedContractors.length} gap-4`}>
                {selectedContractors.map(contractorId => {
              const contractor = contractorDrafts.find(c => c.id === contractorId);
              const diffData = getDiffData(contractorId, selectedClause);
              return <div key={contractorId} className="border border-gray-300 rounded-lg bg-white overflow-hidden">
                      <div className="bg-gray-50 px-3 py-2 border-b border-gray-300">
                        <h5 className="text-sm font-medium text-gray-700">
                          {contractor.name}
                        </h5>
                      </div>
                      <div className="w-full text-sm text-gray-800 overflow-y-auto">
                        <div className="flex text-xs text-gray-500 bg-gray-50 p-2 border-b border-gray-200">
                          <div className="w-1/2 border-r border-gray-200 px-2">
                            <div className="flex items-center">
                              <GitBranchIcon size={12} className="mr-1" />
                              {isRTL ? 'قالب FIDIC' : 'FIDIC Template'}
                            </div>
                          </div>
                          <div className="w-1/2 px-2">
                            <div className="flex items-center">
                              <GitBranchIcon size={12} className="mr-1" />
                              {contractor.name}
                            </div>
                          </div>
                        </div>
                        <div className="max-h-48 overflow-y-auto p-3 whitespace-pre-wrap">
                          {diffData.map((part, index) => {
                            const style = {
                              backgroundColor: part.added ? 'rgba(0, 255, 0, 0.2)' : part.removed ? 'rgba(255, 0, 0, 0.2)' : 'transparent',
                            };
                            return <span key={index} style={style}>{part.content}</span>
                          })}
                        </div>
                      </div>
                    </div>
            })}
              </div>}
          </div>

          <div className="flex justify-between items-center pt-4 border-t border-gray-200">
            <div>
              <p className="text-sm text-gray-700">
                {isRTL ? 'تم تحليل 12 بند' : '12 clauses analyzed'}
              </p>
              <p className="text-xs text-gray-500">
                {isRTL ? 'تم إنشاء تقرير المخاطر' : 'Risk report generated'}
              </p>
            </div>
            <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 flex items-center transition-colors duration-200" onClick={onContinue}>
              {isRTL ? 'المتابعة إلى التفعيل' : 'Continue to Activation'}
              <ArrowRightIcon size={16} className="ml-2" />
            </button>
          </div>
        </div>
        {showAiAssistant && (
          <div className="w-1/3">
            <AIAssistant onClose={() => setShowAiAssistant(false)} isRTL={isRTL} />
          </div>
        )}
    </div>
  );
}