import React, { useState } from 'react';
import {
  ArrowRightIcon, BrainIcon, CheckIcon, DownloadIcon,
  FileTextIcon, SendIcon, UserIcon, XIcon,
  ThumbsUpIcon, ThumbsDownIcon, ClockIcon
} from 'lucide-react';
import { AIAssistant } from '../../ai/AIAssistant';

const Popup = ({ message, onClose, isRTL }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded-lg shadow-lg text-center">
      <p className="text-lg font-semibold text-gray-800">{message}</p>
      <button
        onClick={onClose}
        className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        {isRTL ? 'إغلاق' : 'Close'}
      </button>
    </div>
  </div>
);
import { mockData } from '../../../data/mockData';

export function DraftingApproval({
  onContinue,
  language = 'english',
  projectId = 'project-1',
  draftName
}) {
  const isRTL = language === 'arabic';
  const [showAiAssistant, setShowAiAssistant] = useState(false);

  const handleAiAssistantToggle = () => {
    setShowAiAssistant(!showAiAssistant);
  };

  const project = mockData
    .flatMap(r => r.countries)
    .flatMap(c => c.projects)
    .find(p => p.id === projectId);

  const contract = project?.subProjects[0]?.contracts[0];
  const draft = contract?.drafts[0];

  const [approvers, setApprovers] = useState(draft?.approvers || []);
  const [showErrorPopup, setShowErrorPopup] = useState(false);

  const handleStatusChange = (approverId, newStatus) => {
    setApprovers(approvers.map(approver =>
      approver.id === approverId ? { ...approver, status: newStatus } : approver
    ));
  };

  const approvedCount = approvers.filter(a => a.status === 'approved').length;
  const pendingCount = approvers.filter(a => a.status === 'pending').length;
  const totalApprovers = approvers.length;
  const approvalPercentage = totalApprovers > 0 ? (approvedCount / totalApprovers) * 100 : 0;

  const handleContinueClick = () => {
    if (approvedCount < totalApprovers) {
      setShowErrorPopup(true);
    } else {
      onContinue();
    }
  };

  return (
    <div className={`flex h-full ${showAiAssistant ? (isRTL ? 'space-x-reverse space-x-6' : 'space-x-6') : ''} ${isRTL ? 'flex-row-reverse' : ''}`}>
      <div className={`${showAiAssistant ? 'w-2/3' : 'w-full'} flex-grow p-6 space-y-6`}>

        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800">
            {isRTL ? 'موافقة الصياغة' : 'Drafting Approval'}
            {draftName && <span className="text-lg font-medium text-gray-500 ml-4">({draftName})</span>}
          </h2>
        </div>

        {/* Info Banner */}
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
          <p className="text-xs text-blue-700 dark:text-blue-300">
            {isRTL
              ? 'اطلب الموافقة على مسودة العقد من أصحاب المصلحة الرئيسيين. يمكنك تتبع حالة الموافقة وإرسال تذكيرات إذا لزم الأمر.'
              : 'Request approval for your contract draft from key stakeholders. You can track approval status and send reminders if needed.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="md:col-span-1 space-y-4">
            {/* Approval Status */}
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <div className="flex justify-between items-center mb-3">
                <h4 className="text-sm font-medium text-gray-800 dark:text-white">
                  {isRTL ? 'حالة الموافقة' : 'Approval Status'}
                </h4>
                <div className="text-xs px-2 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full">
                  {isRTL ? 'تم تغيير 12 بند' : '12 clauses changed'}
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                      <ClockIcon size={20} className="text-amber-600 dark:text-amber-500" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-800 dark:text-white">
                        {isRTL ? 'قيد الانتظار' : 'In Progress'}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {isRTL ? `${approvedCount} من ${totalApprovers} موافقات` : `${approvedCount} of ${totalApprovers} approvals`}
                      </p>
                    </div>
                  </div>
                  <div className="text-sm font-medium text-amber-600">{`${Math.round(approvalPercentage)}%`}</div>
                </div>

                <div className="w-full h-2 bg-gray-200 rounded-full">
                  <div
                    className="h-full bg-amber-500 rounded-full"
                    style={{ width: `${approvalPercentage}%` }}
                  ></div>
                </div>

                <div className="grid grid-cols-2 gap-2 mt-2">
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-2 text-center">
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {isRTL ? 'تمت الموافقة' : 'Approved'}
                    </p>
                    <p className="text-sm font-medium text-green-600 dark:text-green-400">{approvedCount}</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-2 text-center">
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {isRTL ? 'في الانتظار' : 'Pending'}
                    </p>
                    <p className="text-sm font-medium text-amber-600 dark:text-amber-500">{pendingCount}</p>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200">
                <button className="w-full px-3 py-2 text-xs font-medium text-blue-700 bg-blue-50 rounded-lg hover:bg-blue-100 flex items-center justify-center">
                  <SendIcon size={14} className="mr-1" />
                  {isRTL
                    ? 'إرسال تذكير للمعلقين'
                    : 'Send Reminder to Pending Approvers'}
                </button>
              </div>
            </div>

            {/* AI Assistant */}
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <h4 className="text-sm font-medium text-gray-800 dark:text-white mb-3 flex items-center">
                <BrainIcon size={16} className="mr-2 text-blue-600" />
                {isRTL ? 'المساعد الذكي' : 'AI Assistant'}
              </h4>
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">
                {isRTL
                  ? 'احصل على مساعدة في عملية الموافقة من المساعد الذكي.'
                  : 'Get help with the approval process from our AI assistant.'}
              </p>
              <button
                className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 flex items-center justify-center transition-colors duration-200"
                onClick={handleAiAssistantToggle}
              >
                <BrainIcon size={16} className={isRTL ? 'ml-2' : 'mr-2'} />
                {isRTL ? 'استشارة المساعد الذكي' : 'Consult AI Assistant'}
              </button>
            </div>
          </div>

          {/* Right Column */}
          <div className="md:col-span-2">
            {/* Approvers */}
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <h4 className="text-sm font-medium text-gray-800 dark:text-white mb-3 flex justify-between items-center">
                <span>{isRTL ? 'المراجعون' : 'Approvers'}</span>
                <button className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200 flex items-center">
                  <UserIcon size={14} className="mr-1" />
                  {isRTL ? 'إضافة مراجع' : 'Add Approver'}
                </button>
              </h4>
              <div className="space-y-4">
                {approvers.map(approver => (
                  <div
                    key={approver.id}
                    className="border border-gray-200 dark:border-gray-700 rounded-lg p-3"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                          <FileTextIcon size={20} className="text-blue-600 dark:text-blue-400" />
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium text-gray-800 dark:text-white">
                            {approver.name}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">{approver.role}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <select
                          value={approver.status}
                          onChange={(e) => handleStatusChange(approver.id, e.target.value)}
                          className="text-xs border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        >
                          <option value="pending">Pending</option>
                          <option value="approved">Approved</option>
                          <option value="rejected">Rejected</option>
                        </select>
                        {approver.status === 'approved' ? (
                          <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300">
                            {isRTL ? 'تمت الموافقة' : 'Approved'}
                          </span>
                        ) : approver.status === 'rejected' ? (
                          <span className="px-2 py-1 text-xs font-medium rounded-full bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300">
                            {isRTL ? 'مرفوض' : 'Rejected'}
                          </span>
                        ) : (
                          <span className="px-2 py-1 text-xs font-medium rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300">
                            {isRTL ? 'في الانتظار' : 'Pending'}
                          </span>
                        )}
                      </div>
                    </div>

                    {approver.comment && (
                      <div className="mt-2 pt-2 border-t border-gray-100 dark:border-gray-700">
                        <p className="text-xs text-gray-600 dark:text-gray-300">
                          <span className="font-medium">
                            {isRTL ? 'التعليق:' : 'Comment:'}
                          </span>{' '}
                          {approver.comment}
                        </p>
                      </div>
                    )}

                    {approver.status === 'pending' && (
                      <div className="mt-2 pt-2 border-t border-gray-100 dark:border-gray-700 flex justify-end">
                        <button className="px-2 py-1 text-xs text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200">
                          <SendIcon size={12} className="inline mr-1" />
                          {isRTL ? 'إرسال تذكير' : 'Send Reminder'}
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Activity Log */}
            <div className="mt-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <h4 className="text-sm font-medium text-gray-800 dark:text-white mb-3">
                {isRTL ? 'سجل الأنشطة' : 'Activity Log'}
              </h4>
              <div className="space-y-3">
                <div className="flex items-start">
                  <div className="h-8 w-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0">
                    <CheckIcon size={16} className="text-green-600 dark:text-green-400" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-gray-800 dark:text-gray-200">
                      {isRTL
                        ? 'وافق أحمد حسن على مسودة العقد'
                        : 'Ahmed Hassan approved the contract draft'}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Today, 10:23 AM</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="h-8 w-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0">
                    <CheckIcon size={16} className="text-green-600 dark:text-green-400" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-gray-800 dark:text-gray-200">
                      {isRTL
                        ? 'وافقت فاطمة الزهراء على مسودة العقد'
                        : 'Fatima Al-Zahra approved the contract draft'}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Today, 9:45 AM</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
                    <SendIcon size={16} className="text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-gray-800 dark:text-gray-200">
                      {isRTL
                        ? 'تم إرسال طلب الموافقة إلى المراجعين'
                        : 'Approval request sent to approvers'}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Today, 9:30 AM</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="h-8 w-8 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center flex-shrink-0">
                    <FileTextIcon size={16} className="text-purple-600 dark:text-purple-400" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-gray-800 dark:text-gray-200">
                      {isRTL
                        ? 'تم إنشاء مسودة العقد'
                        : 'Contract draft created'}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Today, 9:15 AM</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex justify-between items-center pt-4 border-t border-gray-200 dark:border-gray-700">
          <div>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              {isRTL ? `${approvedCount} من ${totalApprovers} موافقات تم استلامها` : `${approvedCount} of ${totalApprovers} approvals received`}
            </p>
            <p className="text-xs text-gray-500">
              {isRTL
                ? 'يجب قبول جميع الموافقات للمتابعة'
                : 'All approvals must be accepted to continue'}
            </p>
          </div>
          <div className="flex space-x-2">
            <button className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 flex items-center">
              <DownloadIcon size={16} className="mr-2" />
              {isRTL ? 'تنزيل تقرير الموافقة' : 'Download Approval Report'}
            </button>
            <button
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 flex items-center transition-colors duration-200"
              onClick={handleContinueClick}
            >
              {isRTL ? 'المتابعة إلى تحميل العقود' : 'Continue to Upload Contracts'}
              <ArrowRightIcon size={16} className="ml-2" />
            </button>
          </div>
        </div>
        {showErrorPopup && (
          <Popup
            message={isRTL ? 'يجب قبول جميع الموافقات للمتابعة.' : 'All approvers must approve the draft before continuing.'}
            onClose={() => setShowErrorPopup(false)}
            isRTL={isRTL}
          />
        )}
      </div>
      {showAiAssistant && (
        <div className="w-1/3 p-6">
          <AIAssistant onClose={() => setShowAiAssistant(false)} isRTL={isRTL} />
        </div>
      )}
    </div>
  );
}