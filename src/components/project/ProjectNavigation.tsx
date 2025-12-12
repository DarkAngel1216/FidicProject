import React, { useState } from 'react';
import { ArrowLeftIcon, ArrowRightIcon, ClockIcon, CheckCircleIcon, XCircleIcon, SearchIcon, BuildingIcon, MapPinIcon, GlobeIcon, MessageSquareTextIcon, AlertCircleIcon } from 'lucide-react';

interface ProjectNavigationProps {
  currentPhase: string;
  setCurrentPhase: (phase: string) => void;
  projectName: string;
  region: string;
  country: string;
  language?: string;
  projectStatus: string;
  phases: any[];
  setPhases: React.Dispatch<React.SetStateAction<any[]>>;
}

function ProjectNavigation({
  currentPhase,
  setCurrentPhase,
  projectName,
  region,
  country,
  language = 'english',
  projectStatus,
  phases,
  setPhases
}: ProjectNavigationProps) {
  const isRTL = language === 'arabic';
  const ArrowIcon = isRTL ? ArrowRightIcon : ArrowLeftIcon;
  const [searchTerm, setSearchTerm] = useState('');

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'complete':
        return <CheckCircleIcon size={14} className="text-green-500" />;
      case 'active':
        return <ClockIcon size={14} className="text-blue-500" />;
      case 'pending':
        return <XCircleIcon size={14} className="text-gray-300" />;
      default:
        return null;
    }
  };
  const [mainPhase, subPhase] = currentPhase.split('/');

  const handlePhaseClick = (phaseId: string) => {
    const phase = phases.find(p => p.id === phaseId);
    if (phase && phase.subItems) {
      setCurrentPhase(`${phaseId}/${phase.subItems[0].id}`);
    } else {
      setCurrentPhase(phaseId);
    }
  }

  const handleSubPhaseClick = (phaseId: string, subPhaseId: string) => {
    setCurrentPhase(`${phaseId}/${subPhaseId}`);
  }

  const filteredPhases = phases.map(phase => ({
    ...phase,
    subItems: phase.subItems?.filter(item => !searchTerm || item.label.toLowerCase().includes(searchTerm.toLowerCase())),
    isVisible: !searchTerm || phase.label.toLowerCase().includes(searchTerm.toLowerCase()) || phase.subItems?.some(item => item.label.toLowerCase().includes(searchTerm.toLowerCase()))
  })).filter(phase => phase.isVisible);

  return <aside className={`w-72 bg-gray-50 dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 flex flex-col min-h-screen h-full ${isRTL ? 'border-r-0 border-l' : ''}`}>
    <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
      <button className={`flex items-center text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white mb-3 ${isRTL ? 'flex-row-reverse' : ''}`} onClick={() => window.history.back()}>
        <ArrowIcon size={16} className={isRTL ? 'ml-1' : 'mr-1'} />
        {language === 'arabic' ? 'العودة إلى لوحة المعلومات' : 'Back to Dashboard'}
      </button>
      <h1 className="text-lg font-bold text-gray-900 dark:text-white">{projectName}</h1>
      <div className={`flex items-center text-xs text-blue-600 dark:text-blue-400 mt-1 ${isRTL ? 'flex-row-reverse' : ''}`}>
        <GlobeIcon size={12} className={isRTL ? 'ml-1' : 'mr-1'} />
        <span>{region}</span>
        <span className="mx-1">•</span>
        <MapPinIcon size={12} className={isRTL ? 'ml-1' : 'mr-1'} />
        <span>{country}</span>
      </div>
    </div>
    <div className="p-3">
      <div className="relative w-full">
        <input type="text" placeholder={isRTL ? 'بحث...' : 'Search phases...'} className={`pl-9 pr-3 py-2 w-full text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 ${isRTL ? 'text-right' : ''}`} value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
        <SearchIcon size={16} className={`absolute ${isRTL ? 'right-3' : 'left-3'} top-2.5 text-gray-400 dark:text-gray-500`} />
      </div>
    </div>
    <nav className="flex-1 overflow-y-auto py-2">
      <div className="px-3">
        {filteredPhases.length > 0 ? (
          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700"></div>
            <ul className="space-y-1 relative">
              {filteredPhases.map(phase => <li key={phase.id} className="relative">
                <button onClick={() => handlePhaseClick(phase.id)} className={`w-full flex items-center px-4 py-2.5 text-sm font-medium ${isRTL ? 'flex-row-reverse text-right' : ''} ${mainPhase === phase.id ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'} rounded-lg transition-colors duration-150 ease-in-out`}>
                  <span className={`z-10 ${isRTL ? 'ml-3' : 'mr-3'}`}>
                    {phase.icon}
                  </span>
                  <span className="flex-1">{phase.label}</span>
                  <span className={isRTL ? "mr-2" : "ml-2"}>{getStatusIcon(phase.status)}</span>
                </button>
                {phase.subItems && mainPhase === phase.id && <ul className={`mt-1 mb-2 ${isRTL ? 'pr-8' : 'pl-8'} relative`}>
                  <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-blue-200 dark:bg-blue-800"></div>
                  {phase.subItems.map(subItem => <li key={subItem.id} className="relative">
                    <button onClick={() => handleSubPhaseClick(phase.id, subItem.id)} className={`w-full text-left py-1.5 px-4 text-xs font-medium ${subPhase === subItem.id ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'} rounded-md ${isRTL ? 'text-right' : ''} flex items-center justify-between`}>
                      <span>{subItem.label}</span>
                      <span>{getStatusIcon(subItem.status)}</span>
                    </button>
                  </li>)}
                </ul>}
              </li>)}
            </ul>
          </div>
        ) : (
          <div className="text-center text-sm text-gray-500 dark:text-gray-400 py-10">
            No results found
          </div>
        )}
      </div>
    </nav>
    <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
      <div className="flex items-center mb-3">
        <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
          <BuildingIcon size={16} className="text-white" />
        </div>
        <div className="ml-3">
          <p className="text-sm font-medium text-gray-900 dark:text-white">
            {language === 'arabic' ? 'حالة المشروع' : 'Project Status'}
          </p>
          <p className={`text-xs font-medium ${projectStatus === 'Active' ? 'text-green-600 dark:text-green-400' : 'text-blue-600 dark:text-blue-400'}`}>
            {projectStatus}
          </p>
        </div>
      </div>
      <div className="flex space-x-2">

        <button className="flex-1 text-xs px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-150 ease-in-out flex items-center justify-center shadow-sm">
          <AlertCircleIcon size={12} className="inline mr-1" />
          {language === 'arabic' ? 'الإبلاغ عن مشكلة' : 'Report Issue'}
        </button>
      </div>
    </div>
  </aside>;
}

export { ProjectNavigation };