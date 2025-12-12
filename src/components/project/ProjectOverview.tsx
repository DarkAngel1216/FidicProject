import { FileTextIcon, CalendarClockIcon, AlertTriangleIcon, MessageSquareTextIcon, PlusIcon, BarChart2Icon, ClockIcon, CheckCircleIcon, MapPinIcon } from 'lucide-react';
import { ProjectTimeline } from './ProjectTimeline';
import { FinancialSummary } from './FinancialSummary';
import { mockData } from '../../data/mockData';

interface ProjectOverviewProps {
  projectId: string;
  language?: string;
  setCurrentPhase?: (phase: string) => void;
}

export function ProjectOverview({ projectId, language = 'english', setCurrentPhase }: ProjectOverviewProps) {
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

  // Map icon string to component
  const getIcon = (type: string) => {
    switch (type) {
      case 'file': return <FileTextIcon size={16} />;
      case 'check': return <CheckCircleIcon size={16} />;
      case 'clock': return <ClockIcon size={16} />;
      case 'alert': return <AlertTriangleIcon size={16} />;
      default: return <ClockIcon size={16} />;
    }
  };

  const timelineEvents = project.timeline ? project.timeline.map(event => ({
    ...event,
    icon: getIcon(event.icon)
  })) : [];

  const financialData = project.financials || [];

  return (
    <div className="space-y-6">
      {/* DEBUG BANNER - REMOVE AFTER FIXING */}
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
        <strong className="font-bold">Debug Info:</strong>
        <span className="block sm:inline"> Project ID: {projectId} | Found Project: {project ? 'Yes' : 'No'} | Name: {project?.name}</span>
      </div>
      {/* Project Header Card */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{isRTL ? 'نظرة عامة على المشروع' : 'Project Overview'}</h1>
            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
              <MapPinIcon size={16} className="mr-1" />
              <span>{project.region} • {project.country}</span>
              <span className="mx-2">•</span>
              <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${project.status === 'Active' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                }`}>
                {project.status}
              </span>
            </div>
          </div>
          <div className="mt-4 md:mt-0 flex space-x-3">
            <button className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 shadow-sm">
              View Contracts
            </button>
            <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 shadow-sm">
              Edit Project
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-6 border-t border-gray-100 dark:border-gray-700">
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Contract Value</p>
            <div className="flex items-center">
              <CheckCircleIcon size={20} className="text-gray-400 mr-2" />
              <p className="text-xl font-bold text-gray-900 dark:text-white">
                {new Intl.NumberFormat('en-US', { style: 'currency', currency: project.currency, notation: 'compact' }).format(project.contractValue * 1000000)}
              </p>
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Timeline</p>
            <div className="flex items-center">
              <CalendarClockIcon size={20} className="text-gray-400 mr-2" />
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">{project.startDate}</p>
                <p className="text-xs text-gray-500">to {project.completionDate}</p>
              </div>
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Completion</p>
            <div className="flex items-center mb-1">
              <ClockIcon size={20} className="text-gray-400 mr-2" />
              <p className="text-xl font-bold text-gray-900 dark:text-white">{project.completionPercentage}%</p>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
              <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: `${project.completionPercentage}%` }}></div>
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Risk Level</p>
            <div className="flex items-center">
              <AlertTriangleIcon size={20} className={`mr-2 ${project.riskText === 'High' ? 'text-red-500' : project.riskText === 'Medium' ? 'text-amber-500' : 'text-green-500'
                }`} />
              <p className={`text-xl font-bold ${project.riskText === 'High' ? 'text-red-700 dark:text-red-400' : project.riskText === 'Medium' ? 'text-amber-700 dark:text-amber-400' : 'text-green-700 dark:text-green-400'
                }`}>
                {project.riskText} <span className="text-sm font-normal text-gray-500 dark:text-gray-400">({project.riskLevel})</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm transition-shadow hover:shadow-md">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {isRTL ? 'العقود النشطة' : 'Active Contracts'}
            </h3>
            <FileTextIcon size={18} className="text-blue-600 dark:text-blue-400" />
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{projectSummary.activeContracts}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            {isRTL ? 'عقود قيد التنفيذ' : 'contracts in progress'}
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm transition-shadow hover:shadow-md">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {isRTL ? 'إجمالي الالتزامات' : 'Total Obligations'}
            </h3>
            <CalendarClockIcon size={18} className="text-green-600 dark:text-green-400" />
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{projectSummary.totalObligations}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            {isRTL ? `${projectSummary.pendingObligations} معلقة، ${projectSummary.overdueObligations} متأخرة` : `${projectSummary.pendingObligations} pending, ${projectSummary.overdueObligations} overdue`}
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm transition-shadow hover:shadow-md">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {isRTL ? 'إجمالي المخاطر' : 'Total Risks'}
            </h3>
            <AlertTriangleIcon size={18} className="text-red-600 dark:text-red-400" />
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{projectSummary.totalRisks}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            {isRTL ? `${projectSummary.highRisks} مخاطر عالية` : `${projectSummary.highRisks} high risks`}
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm transition-shadow hover:shadow-md">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {isRTL ? 'النزاعات' : 'Disputes'}
            </h3>
            <MessageSquareTextIcon size={18} className="text-purple-600 dark:text-purple-400" />
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{projectSummary.totalDisputes}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            {isRTL ? `${projectSummary.inProgressDisputes} قيد التقدم` : `${projectSummary.inProgressDisputes} in progress`}
          </p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
        <h2 className="text-lg font-medium text-gray-800 dark:text-white mb-4">
          {isRTL ? 'إجراءات سريعة' : 'Quick Actions'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <button
            onClick={() => setCurrentPhase && setCurrentPhase('pre-activation/contract-drafting')}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 flex items-center justify-center transition-colors shadow-sm"
          >
            <PlusIcon size={16} className="mr-2" />
            {isRTL ? 'إضافة عقد جديد' : 'Add New Contract'}
          </button>
          <button
            onClick={() => setCurrentPhase && setCurrentPhase('reports')}
            className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 flex items-center justify-center transition-colors shadow-sm"
          >
            <BarChart2Icon size={16} className="mr-2" />
            {isRTL ? 'إنشاء تقرير' : 'Generate Report'}
          </button>
          <button
            onClick={() => setCurrentPhase && setCurrentPhase('post-activation/risk-monitoring')}
            className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 flex items-center justify-center transition-colors shadow-sm"
          >
            <AlertTriangleIcon size={16} className="mr-2" />
            {isRTL ? 'الإبلاغ عن مشكلة' : 'Report Issue'}
          </button>
        </div>
      </div>

      {/* Detailed Overview with Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
            <h2 className="text-lg font-medium text-gray-800 dark:text-white mb-4">
              {isRTL ? 'ملخص مالي' : 'Financial Summary'}
            </h2>
            <FinancialSummary data={financialData} />
          </div>
        </div>
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
            <h2 className="text-lg font-medium text-gray-800 dark:text-white mb-4">
              {isRTL ? 'الجدول الزمني للمشروع' : 'Project Timeline'}
            </h2>
            <ProjectTimeline events={timelineEvents} />
          </div>
        </div>
      </div>
    </div>
  );
}
