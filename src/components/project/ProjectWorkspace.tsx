import React, { useState, useEffect } from 'react';
import { ProjectNavigation } from './ProjectNavigation';
import { ProjectOverview } from './ProjectOverview';
import { ProjectPreActivation } from './ProjectPreActivation';
import { ProjectActivation } from './ProjectActivation';
import { ProjectPostActivation } from './ProjectPostActivation';
import { ProjectReports } from './ProjectReports';
import { LoaderIcon, LayoutDashboardIcon, FileUpIcon, CheckSquareIcon, CalendarClockIcon, BarChart3Icon } from 'lucide-react';

interface ProjectWorkspaceProps {
  projectId: string;
  projectName: string;
  region: string;
  country: string;
  language?: string;
  direction?: 'ltr' | 'rtl';
}

const getInitialPhases = (language: string) => {
  const isRTL = language === 'arabic';
  return [
    {
      id: 'overview',
      label: isRTL ? 'نظرة عامة على المشروع' : 'Project Overview',
      icon: <LayoutDashboardIcon size={20} />,
      status: 'complete'
    },
    {
      id: 'pre-activation',
      label: isRTL ? 'ما قبل التفعيل' : 'Pre-Activation',
      icon: <FileUpIcon size={20} />,
      status: 'active',
      subItems: [
        { id: 'contract-drafting', label: isRTL ? 'صياغة العقد' : 'Contract Drafting', status: 'complete' },
        { id: 'drafting-approval', label: isRTL ? 'موافقة الصياغة' : 'Drafting Approval', status: 'active' },
        { id: 'upload-contracts', label: isRTL ? 'تحميل العقود' : 'Upload Contracts', status: 'pending' },
        { id: 'contract-comparison', label: isRTL ? 'مقارنة العقود' : 'Contract Comparison', status: 'pending' }
      ]
    },
    {
      id: 'activation',
      label: isRTL ? 'التفعيل' : 'Activation',
      icon: <CheckSquareIcon size={20} />,
      status: 'pending',
      subItems: [
        { id: 'final-draft', label: isRTL ? 'اختيار المسودة النهائية' : 'Final Draft Selection', status: 'pending' },
        { id: 'approval', label: isRTL ? 'سير عمل الموافقة' : 'Approval Workflow', status: 'pending' },
        { id: 'obligation-setup', label: isRTL ? 'إعداد الالتزامات' : 'Obligation Setup', status: 'pending' }
      ]
    },
    {
      id: 'post-activation',
      label: isRTL ? 'ما بعد التفعيل' : 'Post-Activation',
      icon: <CalendarClockIcon size={20} />,
      status: 'pending',
      subItems: [
        { id: 'obligation-tracker', label: isRTL ? 'متتبع الالتزامات' : 'Obligation Tracker', status: 'pending' },
        { id: 'disputes', label: isRTL ? 'إدارة النزاعات' : 'Dispute Manager', status: 'pending' },
        { id: 'compliance', label: isRTL ? 'معالجة الوثائق' : 'Document Handling', status: 'pending' },
        { id: 'risk-monitoring', label: isRTL ? 'مراقبة المخاطر' : 'Risk Monitoring', status: 'pending' }
      ]
    },
    {
      id: 'reports',
      label: isRTL ? 'تقارير المشروع' : 'Project Reports',
      icon: <BarChart3Icon size={20} />,
      status: 'pending'
    }
  ];
};

export function ProjectWorkspace({
  projectId,
  projectName,
  region,
  country,
  language = 'english',
  direction = 'ltr'
}: ProjectWorkspaceProps) {
  const [currentPhase, setCurrentPhase] = useState('overview');
  const [loading, setLoading] = useState(true);
  const [projectStatus, setProjectStatus] = useState('Pre-Activation');
  const [phases, setPhases] = useState(getInitialPhases(language));

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); // Simulate loading for 1 second
    return () => clearTimeout(timer);
  }, [currentPhase]);

  const handleActivateContract = () => {
    setCurrentPhase('post-activation/obligation-tracker');
    setProjectStatus('Active');
    setPhases(prevPhases => {
      const newPhases = prevPhases.map(p => {
        if (p.id === 'activation') {
          return { ...p, status: 'complete' };
        }
        if (p.id === 'post-activation') {
          return { ...p, status: 'active' };
        }
        return p;
      });
      return newPhases;
    });
  };

  const renderPhaseContent = () => {
    if (loading) {
      return (
        <div className="flex items-center justify-center h-full">
          <LoaderIcon className="animate-spin text-blue-600" size={48} />
        </div>
      );
    }

    const [mainPhase, subPhase] = currentPhase.split('/');

    switch (mainPhase) {
      case 'overview':
        return <ProjectOverview projectId={projectId} language={language} setCurrentPhase={setCurrentPhase} />;
      case 'pre-activation':
        return <ProjectPreActivation projectId={projectId} language={language} subPhase={subPhase} onActivate={() => setCurrentPhase('activation')} setCurrentPhase={setCurrentPhase} />;
      case 'activation':
        return <ProjectActivation projectId={projectId} language={language} onActivate={handleActivateContract} subPhase={subPhase} setCurrentPhase={setCurrentPhase} />;
      case 'post-activation':
        return <ProjectPostActivation projectId={projectId} language={language} subPhase={subPhase} setCurrentPhase={setCurrentPhase} />;
      case 'reports':
        return <ProjectReports projectId={projectId} />;
      default:
        return <ProjectOverview projectId={projectId} />;
    }
  };
  return <div className={`flex flex-1 overflow-hidden bg-gray-50 dark:bg-gray-900 ${direction === 'rtl' ? 'flex-row-reverse' : ''}`}>
    <ProjectNavigation currentPhase={currentPhase} setCurrentPhase={setCurrentPhase} projectName={projectName} region={region} country={country} language={language} projectStatus={projectStatus} phases={phases} setPhases={setPhases} />
    <div className="flex-1 overflow-y-auto p-4 bg-gray-50 dark:bg-gray-900">{renderPhaseContent()}</div>
  </div>
}