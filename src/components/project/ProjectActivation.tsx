import React, { useState, useEffect } from 'react';
import { FileTextIcon, CheckCircleIcon, AlertTriangleIcon, UserIcon, CalendarClockIcon, ArrowRightIcon, CheckIcon, XIcon } from 'lucide-react';
import { mockData } from '../../data/mockData';

interface ProjectActivationProps {
  projectId: string;
  language?: string;
  onActivate: () => void;
  subPhase?: string;
  setCurrentPhase?: (phase: string) => void;
}

export function ProjectActivation({
  projectId,
  language = 'english',
  onActivate,
  subPhase,
  setCurrentPhase
}: ProjectActivationProps) {
  const activeTab = subPhase || 'final-draft';
  const isRTL = language === 'arabic';

  const handleTabClick = (tabId: string) => {
    if (setCurrentPhase) {
      setCurrentPhase(`activation/${tabId}`);
    }
  };

  const handleContinueToApproval = () => {
    handleTabClick('approval');
  };

  const handleContinueToObligationSetup = () => {
    handleTabClick('obligation-setup');
  };

  const handleActivateContract = () => {
    if (typeof onActivate === 'function') {
      onActivate();
    }
  };

  return <div className="space-y-6">
    <div className="flex justify-between items-center">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
        {isRTL ? 'تفعيل العقد' : 'Contract Activation'}
      </h1>
      <div className="flex space-x-2">
        <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700">
          {isRTL ? 'تقديم للموافقة' : 'Submit for Approval'}
        </button>
      </div>
    </div>
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
      <div className="flex border-b border-gray-200 dark:border-gray-700">
        <button className={`px-4 py-3 text-sm font-medium ${activeTab === 'final-draft' ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'}`} onClick={() => handleTabClick('final-draft')}>
          {isRTL ? 'اختيار المسودة النهائية' : 'Final Draft Selection'}
        </button>
        <button className={`px-4 py-3 text-sm font-medium ${activeTab === 'approval' ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'}`} onClick={() => handleTabClick('approval')}>
          {isRTL ? 'سير عمل الموافقة' : 'Approval Workflow'}
        </button>
        <button className={`px-4 py-3 text-sm font-medium ${activeTab === 'obligation-setup' ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'}`} onClick={() => handleTabClick('obligation-setup')}>
          {isRTL ? 'إعداد الالتزامات' : 'Obligation Setup'}
        </button>
      </div>
      <div className="p-4">
        {activeTab === 'final-draft' && <FinalDraftSelection onContinue={handleContinueToApproval} language={language} />}
        {activeTab === 'approval' && <ApprovalWorkflow onContinue={handleContinueToObligationSetup} language={language} />}
        {activeTab === 'obligation-setup' && <ObligationSetup onActivate={handleActivateContract} language={language} />}
      </div>
    </div>
  </div>
}
function FinalDraftSelection({
  onContinue,
  language = 'english',
  projectId = 'project-1'
}) {
  const isRTL = language === 'arabic';
  const project = mockData.flatMap(r => r.countries).flatMap(c => c.projects).find(p => p.id === projectId);
  const contracts = project?.subProjects.flatMap(sp => sp.contracts);

  return <div className="space-y-6">
    <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
      <h3 className="text-sm font-medium text-blue-800 dark:text-blue-300 mb-2">
        {isRTL ? 'تفعيل العقد' : 'Contract Activation'}
      </h3>
      <p className="text-xs text-blue-700 dark:text-blue-400">
        {isRTL ? 'حدد نسخة العقد النهائية للتفعيل. بمجرد التفعيل، سيستخرج النظام الالتزامات وينقل العقد إلى مرحلة ما بعد التفعيل للإدارة المستمرة.' : 'Select the final contract version to activate. Once activated, the system will extract obligations and move the contract to the post-activation phase for ongoing management.'}
      </p>
    </div>
    <div className="space-y-4">
      <h3 className="text-base font-medium text-gray-800 dark:text-white">
        {isRTL ? 'اختر العقد للتفعيل' : 'Select Contract to Activate'}
      </h3>
      {contracts?.map(contract => (
        <div key={contract.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-green-50 dark:bg-green-900/10 border-green-200 dark:border-green-800">
          <div className="flex items-start">
            <div className="flex-shrink-0 mt-0.5">
              <input id={`contract-${contract.id}`} name="contract-selection" type="radio" className="h-4 w-4 text-blue-600 border-gray-300 dark:border-gray-600 focus:ring-blue-500 dark:focus:ring-blue-400 dark:bg-gray-700" defaultChecked={contract.id === 'contract-1-1-1'} />
            </div>
            <label htmlFor={`contract-${contract.id}`} className="ml-3 flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {contract.name}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {isRTL ? `الإصدار ${contract.drafts?.[0]?.version} • ${contract.lastUpdated}` : `Version ${contract.drafts?.[0]?.version} • ${contract.lastUpdated}`}
                  </p>
                </div>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${contract.riskScore === 'Low' ? 'bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-300' : contract.riskScore === 'Medium' ? 'bg-yellow-100 dark:bg-yellow-900/50 text-yellow-800 dark:text-yellow-300' : 'bg-red-100 dark:bg-red-900/50 text-red-800 dark:text-red-300'}`}>
                  {isRTL ? 'موصى به' : 'Recommended'}
                </span>
              </div>
              <div className="mt-2 flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-400">
                <span className="flex items-center">
                  <FileTextIcon size={12} className="mr-1" />
                  {isRTL ? '12 صفحة' : '12 pages'}
                </span>
                <span className="flex items-center">
                  <CheckCircleIcon size={12} className="mr-1 text-green-500" />
                  {isRTL ? 'تم التفاوض' : 'Negotiated'}
                </span>
                <span className="flex items-center">
                  <AlertTriangleIcon size={12} className={`mr-1 ${contract.riskScore === 'Low' ? 'text-green-500' : contract.riskScore === 'Medium' ? 'text-yellow-500' : 'text-red-500'}`} />
                  {isRTL ? `مخاطر ${contract.riskScore}` : `${contract.riskScore} Risk`}
                </span>
              </div>
              <div className="mt-3 grid grid-cols-3 gap-4">
                <div className="bg-white dark:bg-gray-800 rounded p-2 border border-gray-200 dark:border-gray-700">
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {isRTL ? 'القيمة' : 'Value'}
                  </p>
                  <p className="text-sm font-medium text-gray-800 dark:text-gray-200">${contract.value}M</p>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded p-2 border border-gray-200 dark:border-gray-700">
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {isRTL ? 'الإطار الزمني' : 'Timeline'}
                  </p>
                  <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
                    {isRTL ? '18 شهر' : '18 months'}
                  </p>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded p-2 border border-gray-200 dark:border-gray-700">
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {isRTL ? 'الالتزامات' : 'Obligations'}
                  </p>
                  <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
                    {project?.obligations.length}
                  </p>
                </div>
              </div>
            </label>
          </div>
        </div>
      ))}
    </div>
    <div className="flex justify-between items-center pt-4 border-t border-gray-200 dark:border-gray-700">
      <div>
        <p className="text-sm text-gray-700 dark:text-gray-300">
          {contracts?.[0]?.name}
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          {isRTL ? 'جاهز لسير عمل الموافقة' : 'Ready for approval workflow'}
        </p>
      </div>
      <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 flex items-center" onClick={onContinue}>
        {isRTL ? 'المتابعة إلى الموافقة' : 'Continue to Approval'}
        <ArrowRightIcon size={16} className={isRTL ? 'mr-2' : 'ml-2'} />
      </button>
    </div>
  </div>
}
function ApprovalWorkflow({
  onContinue,
  language = 'english',
  projectId = 'project-1'
}) {
  const isRTL = language === 'arabic';
  const project = mockData.flatMap(r => r.countries).flatMap(c => c.projects).find(p => p.id === projectId);
  const contract = project?.subProjects[0]?.contracts[0];
  const draft = contract?.drafts[0];
  const approvers = draft?.approvers || [];

  return <div className="space-y-6">
    <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
      <h3 className="text-sm font-medium text-blue-800 dark:text-blue-300 mb-2">
        {isRTL ? 'سير عمل الموافقة' : 'Approval Workflow'}
      </h3>
      <p className="text-xs text-blue-700 dark:text-blue-400">
        {isRTL ? 'يتطلب هذا العقد موافقة من أصحاب المصلحة المعينين قبل أن يتم تفعيله. تتبع حالة الموافقة أدناه.' : 'This contract requires approval from the designated stakeholders before it can be activated. Track the approval status below.'}
      </p>
    </div>
    <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-white dark:bg-gray-800">
      <h3 className="text-base font-medium text-gray-800 dark:text-white mb-4">
        {contract?.name} - {draft?.version}
      </h3>
      <div className="space-y-6">
        {approvers.map(approver => (
          <div key={approver.id} className="flex items-start">
            <div className="min-w-0 flex-1">
              <div className="flex items-center">
                <div className={`h-8 w-8 rounded-full ${approver.status === 'approved' ? 'bg-green-500' : approver.status === 'pending' ? 'bg-amber-100 dark:bg-amber-900/50' : 'bg-gray-100 dark:bg-gray-700'} flex items-center justify-center`}>
                  {approver.status === 'approved' && <CheckIcon size={16} className="text-white" />}
                  {approver.status === 'pending' && <CalendarClockIcon size={16} className="text-amber-600 dark:text-amber-400" />}
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    {approver.name}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {approver.role}
                  </p>
                </div>
              </div>
              <div className="mt-2 ml-11">
                <p className="text-xs text-gray-600 dark:text-gray-300">
                  {approver.comment}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {approver.status === 'approved' ? 'Approved on Dec 5, 2023' : 'Requested on Dec 4, 2023'}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    <div className="flex justify-between items-center pt-4 border-t border-gray-200 dark:border-gray-700">
      <div>
        <p className="text-sm text-gray-700 dark:text-gray-300">
          {approvers.filter(a => a.status === 'approved').length} of {approvers.length} approvals received
        </p>
      </div>
      <div className="flex space-x-2">
        <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 flex items-center" onClick={onContinue}>
          {isRTL ? 'المتابعة إلى إعداد الالتزامات' : 'Continue to Obligation Setup'}
          <ArrowRightIcon size={16} className={isRTL ? 'mr-2' : 'ml-2'} />
        </button>
      </div>
    </div>
  </div>
}
function ObligationSetup({
  onActivate,
  language = 'english'
}) {
  const isRTL = language === 'arabic';
  const handleActivateClick = () => {
    if (window.confirm(isRTL ? 'هل أنت متأكد أنك تريد تفعيل هذا العقد؟' : 'Are you sure you want to activate this contract?')) {
      onActivate();
    }
  };
  return <div className="space-y-6">
    <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
      <h3 className="text-sm font-medium text-blue-800 dark:text-blue-300 mb-2">
        {isRTL ? 'إعداد الالتزامات' : 'Obligation Setup'}
      </h3>
      <p className="text-xs text-blue-700 dark:text-blue-400">
        {isRTL ? 'راجع وأكد الالتزامات المستخرجة تلقائيًا من العقد. سيتم تتبع هذه في مرحلة ما بعد التفعيل.' : 'Review and confirm the obligations automatically extracted from the contract. These will be tracked in the post-activation phase.'}
      </p>
    </div>
    <div className="flex justify-between items-center">
      <h3 className="text-base font-medium text-gray-800 dark:text-white">
        {isRTL ? 'عقد ABB - الالتزامات المستخرجة' : 'ABB Contract - Extracted Obligations'}
      </h3>
      <div className="flex items-center space-x-2">
        <button className="px-3 py-1.5 text-xs font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600" onClick={() => alert(isRTL ? 'جاري تنزيل الملف' : 'Downloading file')}>
          {isRTL ? 'تنزيل كملف Excel' : 'Download as Excel'}
        </button>
        <button className="px-3 py-1.5 text-xs font-medium text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/50" onClick={() => alert(isRTL ? 'إضافة التزام جديد' : 'Adding new obligation')}>
          {isRTL ? 'إضافة التزام يدوي' : 'Add Manual Obligation'}
        </button>
      </div>
    </div>
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-900/50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider w-10">
                <input type="checkbox" className="h-4 w-4 text-blue-600 border-gray-300 dark:border-gray-600 rounded focus:ring-blue-500 dark:focus:ring-blue-400 dark:bg-gray-700" />
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                {isRTL ? 'الالتزام' : 'Obligation'}
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                {isRTL ? 'النوع' : 'Type'}
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                {isRTL ? 'تاريخ الاستحقاق' : 'Due Date'}
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                {isRTL ? 'مرجع البند' : 'Clause Reference'}
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                {isRTL ? 'مُسند إلى' : 'Assigned To'}
              </th>
              <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                {isRTL ? 'الإجراءات' : 'Actions'}
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            <tr>
              <td className="px-4 py-3 whitespace-nowrap">
                <input type="checkbox" className="h-4 w-4 text-blue-600 border-gray-300 dark:border-gray-600 rounded focus:ring-blue-500 dark:focus:ring-blue-400 dark:bg-gray-700" defaultChecked />
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                {isRTL ? 'الدفعة المقدمة' : 'Advance Payment'}
              </td>
              <td className="px-4 py-3 whitespace-nowrap">
                <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-300">
                  {isRTL ? 'دفع' : 'Payment'}
                </span>
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                {isRTL ? '15 يناير 2024' : 'Jan 15, 2024'}
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                {isRTL ? 'البند 14.2' : 'Clause 14.2'}
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                {isRTL ? 'قسم المالية' : 'Finance Dept'}
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-center">
                <button className="text-xs text-blue-600 dark:text-blue-400 font-medium" onClick={() => alert(isRTL ? 'تعديل الالتزام' : 'Edit obligation')}>
                  {isRTL ? 'تعديل' : 'Edit'}
                </button>
              </td>
            </tr>
            <tr className="bg-gray-50 dark:bg-gray-900/50">
              <td className="px-4 py-3 whitespace-nowrap">
                <input type="checkbox" className="h-4 w-4 text-blue-600 border-gray-300 dark:border-gray-600 rounded focus:ring-blue-500 dark:focus:ring-blue-400 dark:bg-gray-700" defaultChecked />
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                {isRTL ? 'تسليم المعدات' : 'Delivery of Equipment'}
              </td>
              <td className="px-4 py-3 whitespace-nowrap">
                <span className="px-2 py-1 text-xs font-medium rounded-full bg-purple-100 dark:bg-purple-900/50 text-purple-800 dark:text-purple-300">
                  {isRTL ? 'تسليم' : 'Delivery'}
                </span>
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                {isRTL ? '10 مارس 2024' : 'Mar 10, 2024'}
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                {isRTL ? 'البند 8.2' : 'Clause 8.2'}
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                {isRTL ? 'المقاول' : 'Contractor'}
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-center">
                <button className="text-xs text-blue-600 dark:text-blue-400 font-medium" onClick={() => alert(isRTL ? 'تعديل الالتزام' : 'Edit obligation')}>
                  {isRTL ? 'تعديل' : 'Edit'}
                </button>
              </td>
            </tr>
            <tr>
              <td className="px-4 py-3 whitespace-nowrap">
                <input type="checkbox" className="h-4 w-4 text-blue-600 border-gray-300 dark:border-gray-600 rounded focus:ring-blue-500 dark:focus:ring-blue-400 dark:bg-gray-700" defaultChecked />
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                {isRTL ? 'الدفعة المرحلية 1' : 'Interim Payment 1'}
              </td>
              <td className="px-4 py-3 whitespace-nowrap">
                <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-300">
                  {isRTL ? 'دفع' : 'Payment'}
                </span>
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                {isRTL ? '15 أبريل 2024' : 'Apr 15, 2024'}
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                {isRTL ? 'البند 14.6' : 'Clause 14.6'}
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                {isRTL ? 'قسم المالية' : 'Finance Dept'}
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-center">
                <button className="text-xs text-blue-600 dark:text-blue-400 font-medium" onClick={() => alert(isRTL ? 'تعديل الالتزام' : 'Edit obligation')}>
                  {isRTL ? 'تعديل' : 'Edit'}
                </button>
              </td>
            </tr>
            <tr className="bg-gray-50 dark:bg-gray-900/50">
              <td className="px-4 py-3 whitespace-nowrap">
                <input type="checkbox" className="h-4 w-4 text-blue-600 border-gray-300 dark:border-gray-600 rounded focus:ring-blue-500 dark:focus:ring-blue-400 dark:bg-gray-700" defaultChecked />
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                {isRTL ? 'اختبار الأداء' : 'Performance Testing'}
              </td>
              <td className="px-4 py-3 whitespace-nowrap">
                <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-300">
                  {isRTL ? 'اختبار' : 'Testing'}
                </span>
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                {isRTL ? '20 مايو 2024' : 'May 20, 2024'}
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                {isRTL ? 'البند 9.1' : 'Clause 9.1'}
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                {isRTL ? 'الفريق الفني' : 'Technical Team'}
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-center">
                <button className="text-xs text-blue-600 dark:text-blue-400 font-medium" onClick={() => alert(isRTL ? 'تعديل الالتزام' : 'Edit obligation')}>
                  {isRTL ? 'تعديل' : 'Edit'}
                </button>
              </td>
            </tr>
            <tr>
              <td className="px-4 py-3 whitespace-nowrap">
                <input type="checkbox" className="h-4 w-4 text-blue-600 border-gray-300 dark:border-gray-600 rounded focus:ring-blue-500 dark:focus:ring-blue-400 dark:bg-gray-700" defaultChecked />
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                {isRTL ? 'تجديد التأمين' : 'Insurance Renewal'}
              </td>
              <td className="px-4 py-3 whitespace-nowrap">
                <span className="px-2 py-1 text-xs font-medium rounded-full bg-amber-100 dark:bg-amber-900/50 text-amber-800 dark:text-amber-300">
                  {isRTL ? 'قانوني' : 'Legal'}
                </span>
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                {isRTL ? '1 يناير 2025' : 'Jan 01, 2025'}
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                {isRTL ? 'البند 18.1' : 'Clause 18.1'}
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                {isRTL ? 'القسم القانوني' : 'Legal Dept'}
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-center">
                <button className="text-xs text-blue-600 dark:text-blue-400 font-medium" onClick={() => alert(isRTL ? 'تعديل الالتزام' : 'Edit obligation')}>
                  {isRTL ? 'تعديل' : 'Edit'}
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div className="grid grid-cols-2 gap-4">
      <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
        <h3 className="text-sm font-medium text-gray-800 dark:text-white mb-3">
          {isRTL ? 'ملخص الالتزامات' : 'Obligation Summary'}
        </h3>
        <div className="space-y-2">
          <div className="flex justify-between text-xs">
            <span className="text-gray-600 dark:text-gray-400">
              {isRTL ? 'إجمالي الالتزامات' : 'Total Obligations'}
            </span>
            <span className="font-medium text-gray-800 dark:text-white">24</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-gray-600 dark:text-gray-400">
              {isRTL ? 'التزامات الدفع' : 'Payment Obligations'}
            </span>
            <span className="font-medium text-gray-800 dark:text-white">8</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-gray-600 dark:text-gray-400">
              {isRTL ? 'التزامات التسليم' : 'Delivery Obligations'}
            </span>
            <span className="font-medium text-gray-800 dark:text-white">5</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-gray-600 dark:text-gray-400">
              {isRTL ? 'الاختبار/الامتثال' : 'Testing/Compliance'}
            </span>
            <span className="font-medium text-gray-800 dark:text-white">6</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-gray-600 dark:text-gray-400">
              {isRTL ? 'قانونية/إدارة' : 'Legal/Administrative'}
            </span>
            <span className="font-medium text-gray-800 dark:text-white">5</span>
          </div>
        </div>
      </div>
      <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
        <h3 className="text-sm font-medium text-gray-800 dark:text-white mb-3">
          {isRTL ? 'إعدادات الإشعارات' : 'Notification Settings'}
        </h3>
        <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">
          {isRTL ? 'تكوين كيفية إخطار أصحاب المصلحة بالالتزامات القادمة.' : 'Configure how stakeholders will be notified about upcoming obligations.'}
        </p>
        <div className="space-y-2">
          <div className="flex items-center">
            <input id="notify-email" type="checkbox" className="h-4 w-4 text-blue-600 border-gray-300 dark:border-gray-600 rounded focus:ring-blue-500 dark:focus:ring-blue-400 dark:bg-gray-700" defaultChecked />
            <label htmlFor="notify-email" className="ml-2 block text-xs text-gray-700 dark:text-gray-300">
              {isRTL ? 'إشعارات البريد الإلكتروني (قبل 7 أيام من تاريخ الاستحقاق)' : 'Email notifications (7 days before due date)'}
            </label>
          </div>
          <div className="flex items-center">
            <input id="notify-dashboard" type="checkbox" className="h-4 w-4 text-blue-600 border-gray-300 dark:border-gray-600 rounded focus:ring-blue-500 dark:focus:ring-blue-400 dark:bg-gray-700" defaultChecked />
            <label htmlFor="notify-dashboard" className="ml-2 block text-xs text-gray-700 dark:text-gray-300">
              {isRTL ? 'تنبيهات لوحة المعلومات (قبل 14 يومًا من تاريخ الاستحقاق)' : 'Dashboard alerts (14 days before due date)'}
            </label>
          </div>
          <div className="flex items-center">
            <input id="notify-escalation" type="checkbox" className="h-4 w-4 text-blue-600 border-gray-300 dark:border-gray-600 rounded focus:ring-blue-500 dark:focus:ring-blue-400 dark:bg-gray-700" defaultChecked />
            <label htmlFor="notify-escalation" className="ml-2 block text-xs text-gray-700 dark:text-gray-300">
              {isRTL ? 'تصعيد الإدارة للعناصر المتأخرة' : 'Management escalation for overdue items'}
            </label>
          </div>
        </div>
      </div>
    </div>
    <div className="flex justify-between items-center pt-4 border-t border-gray-200 dark:border-gray-700">
      <div>
        <p className="text-sm text-gray-700 dark:text-gray-300">
          {isRTL ? 'تم تكوين 24 التزامًا' : '24 obligations configured'}
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          {isRTL ? 'جاهز لتفعيل العقد' : 'Ready for contract activation'}
        </p>
      </div>
      <div className="flex space-x-2">
        <button className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600" onClick={() => alert(isRTL ? 'تم حفظ المسودة' : 'Draft saved')}>
          {isRTL ? 'حفظ كمسودة' : 'Save as Draft'}
        </button>
        <button className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 flex items-center" onClick={handleActivateClick}>
          {isRTL ? 'تفعيل العقد' : 'Activate Contract'}
          <CheckCircleIcon size={16} className={isRTL ? 'mr-2' : 'ml-2'} />
        </button>
      </div>
    </div>
  </div>
}