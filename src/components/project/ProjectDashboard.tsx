import React from 'react';
import { FileTextIcon, CalendarClockIcon, AlertTriangleIcon, MessageSquareTextIcon, PlusIcon, BarChart2Icon } from 'lucide-react';
import { mockData } from '../../data/mockData'; // Assuming mockData contains summarized project data

interface ProjectDashboardProps {
  projectId: string;
  language?: string;
}

export function ProjectDashboard({ projectId, language = 'english' }: ProjectDashboardProps) {
  const isRTL = language === 'arabic';

  const project = mockData
    .flatMap(region => region.countries)
    .flatMap(country => country.projects)
    .find(p => p.id === projectId);

  if (!project) {
    return <div>Project not found</div>;
  }

  const projectSummary = {
    activeContracts: project.activeContracts,
    totalObligations: project.obligations.length,
    pendingObligations: project.obligations.filter(o => o.status === 'Open').length,
    overdueObligations: project.obligations.filter(o => o.status === 'Overdue').length,
    totalRisks: project.risks.length,
    highRisks: project.risks.filter(r => r.severity === 'High').length,
    totalDisputes: project.disputes.length,
    inProgressDisputes: project.disputes.filter(d => d.status === 'Open').length,
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">
        {isRTL ? 'لوحة تحكم المشروع' : 'Project Dashboard'}
      </h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-sm font-medium text-gray-700">
              {isRTL ? 'العقود النشطة' : 'Active Contracts'}
            </h3>
            <FileTextIcon size={18} className="text-blue-600" />
          </div>
          <p className="text-2xl font-bold text-gray-900">{projectSummary.activeContracts}</p>
          <p className="text-xs text-gray-500 mt-1">
            {isRTL ? 'عقود قيد التنفيذ' : 'contracts in progress'}
          </p>
        </div>

        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-sm font-medium text-gray-700">
              {isRTL ? 'إجمالي الالتزامات' : 'Total Obligations'}
            </h3>
            <CalendarClockIcon size={18} className="text-green-600" />
          </div>
          <p className="text-2xl font-bold text-gray-900">{projectSummary.totalObligations}</p>
          <p className="text-xs text-gray-500 mt-1">
            {isRTL ? `${projectSummary.pendingObligations} معلقة، ${projectSummary.overdueObligations} متأخرة` : `${projectSummary.pendingObligations} pending, ${projectSummary.overdueObligations} overdue`}
          </p>
        </div>

        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-sm font-medium text-gray-700">
              {isRTL ? 'إجمالي المخاطر' : 'Total Risks'}
            </h3>
            <AlertTriangleIcon size={18} className="text-red-600" />
          </div>
          <p className="text-2xl font-bold text-gray-900">{projectSummary.totalRisks}</p>
          <p className="text-xs text-gray-500 mt-1">
            {isRTL ? `${projectSummary.highRisks} مخاطر عالية` : `${projectSummary.highRisks} high risks`}
          </p>
        </div>

        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-sm font-medium text-gray-700">
              {isRTL ? 'النزاعات' : 'Disputes'}
            </h3>
            <MessageSquareTextIcon size={18} className="text-purple-600" />
          </div>
          <p className="text-2xl font-bold text-gray-900">{projectSummary.totalDisputes}</p>
          <p className="text-xs text-gray-500 mt-1">
            {isRTL ? `${projectSummary.inProgressDisputes} قيد التقدم` : `${projectSummary.inProgressDisputes} in progress`}
          </p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
        <h2 className="text-lg font-medium text-gray-800 mb-4">
          {isRTL ? 'إجراءات سريعة' : 'Quick Actions'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 flex items-center justify-center">
            <PlusIcon size={16} className="mr-2" />
            {isRTL ? 'إضافة عقد جديد' : 'Add New Contract'}
          </button>
          <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center justify-center">
            <BarChart2Icon size={16} className="mr-2" />
            {isRTL ? 'إنشاء تقرير' : 'Generate Report'}
          </button>
          <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center justify-center">
            <AlertTriangleIcon size={16} className="mr-2" />
            {isRTL ? 'الإبلاغ عن مشكلة' : 'Report Issue'}
          </button>
        </div>
      </div>

      {/* Placeholder for more detailed sections */}
      <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
        <h2 className="text-lg font-medium text-gray-800 mb-4">
          {isRTL ? 'نظرة عامة مفصلة' : 'Detailed Overview'}
        </h2>
        <p className="text-gray-500">
          {isRTL ? 'هنا ستظهر الرسوم البيانية والجداول التفصيلية للعقود والالتزامات والمخاطر والنزاعات.' : 'Detailed charts and tables for contracts, obligations, risks, and disputes will appear here.'}
        </p>
      </div>
    </div>
  );
}
