import React, { useState, Fragment, useEffect } from 'react';
import { CheckIcon } from 'lucide-react';
import { ContractDrafting } from './pre-activation/ContractDrafting';
import { DraftingApproval } from './pre-activation/DraftingApproval';
import { UploadContractorDrafts } from './pre-activation/UploadContractorDrafts';
import { ContractComparison } from './pre-activation/ContractComparison';

export function ProjectPreActivation({
  language = 'english',
  onActivate,
  subPhase,
  setCurrentPhase
}) {
  const activeTab = subPhase || 'contract-drafting';
  const isRTL = language === 'arabic';
  const [draftName, setDraftName] = useState('');

  const handleTabClick = (tabId: string) => {
    if (setCurrentPhase) {
      setCurrentPhase(`pre-activation/${tabId}`);
    }
  };

  const [completedTabs, setCompletedTabs] = useState<string[]>(['contract-drafting', 'drafting-approval']);

  // Enhanced tab navigation with progress tracking
  const handleContinue = (draftNameFromChild?: string) => {
    if (draftNameFromChild) {
      setDraftName(draftNameFromChild);
    }

    const tabOrder = ['contract-drafting', 'drafting-approval', 'upload-contracts', 'contract-comparison'];
    const currentIndex = tabOrder.indexOf(activeTab);
    if (currentIndex < tabOrder.length - 1) {
      // Mark current tab as completed
      setCompletedTabs(prev => [...prev, activeTab]);
      // Move to next tab
      const nextTab = tabOrder[currentIndex + 1];
      handleTabClick(nextTab);
    } else {
      // We're at the last tab, mark it completed and proceed to activation
      setCompletedTabs(prev => [...prev, activeTab]);
      if (typeof onActivate === 'function') {
        onActivate();
      }
    }
  };
  // Function to determine tab status indicator
  const getTabStatusIndicator = tabId => {
    if (completedTabs.includes(tabId)) {
      return <CheckIcon size={16} className="text-green-600" />;
    } else if (activeTab === tabId) {
      return <div className="h-4 w-4 rounded-full bg-blue-600"></div>
    } else {
      return <div className="h-4 w-4 rounded-full border-2 border-gray-300"></div>
    }
  };
  return (
    <div className="p-6">

      {/* Tab Navigation */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden mb-6">
        <div className="flex border-b border-gray-200 dark:border-gray-700 overflow-x-auto">
          <button className={`px-4 py-3 text-sm font-medium whitespace-nowrap flex items-center ${activeTab === 'contract-drafting' ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'}`} onClick={() => handleTabClick('contract-drafting')}>
            {getTabStatusIndicator('contract-drafting')}
            <span className="ml-2">{isRTL ? 'صياغة العقد' : 'Contract Drafting'}</span>
          </button>
          <button className={`px-4 py-3 text-sm font-medium whitespace-nowrap flex items-center ${activeTab === 'drafting-approval' ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'}`} onClick={() => handleTabClick('drafting-approval')}>
            {getTabStatusIndicator('drafting-approval')}
            <span className="ml-2">{isRTL ? 'موافقة الصياغة' : 'Drafting Approval'}</span>
          </button>
          <button className={`px-4 py-3 text-sm font-medium whitespace-nowrap flex items-center ${activeTab === 'upload-contracts' ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'}`} onClick={() => handleTabClick('upload-contracts')}>
            {getTabStatusIndicator('upload-contracts')}
            <span className="ml-2">{isRTL ? 'تحميل العقود' : 'Upload Contracts'}</span>
          </button>
          <button className={`px-4 py-3 text-sm font-medium whitespace-nowrap flex items-center ${activeTab === 'contract-comparison' ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'}`} onClick={() => handleTabClick('contract-comparison')}>
            {getTabStatusIndicator('contract-comparison')}
            <span className="ml-2">{isRTL ? 'مقارنة العقود' : 'Contract Comparison'}</span>
          </button>
        </div>
      </div>
      {/* Tab Content */}
      {activeTab === 'contract-drafting' && <ContractDrafting onContinue={handleContinue} language={language} setDraftName={setDraftName} />}
      {activeTab === 'drafting-approval' && <DraftingApproval onContinue={handleContinue} language={language} draftName={draftName} />}
      {activeTab === 'upload-contracts' && <UploadContractorDrafts onContinue={handleContinue} language={language} />}
      {activeTab === 'contract-comparison' && <ContractComparison onContinue={handleContinue} language={language} />}
    </div>
  );
}