import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { useAIAssistant } from '../../context/AIAssistantContext';
import { LayoutDashboardIcon, FileTextIcon, CalendarClockIcon, SettingsIcon, BarChart3Icon, AlertCircleIcon, MessageSquareTextIcon, GlobeIcon, BuildingIcon, UploadIcon, BrainIcon, ChevronDownIcon, ChevronRightIcon, MapPinIcon, FolderIcon, SearchIcon, CheckCircle2Icon, MoonIcon, SunIcon } from 'lucide-react';

interface SidebarProps {
  language?: string;
}

export function Sidebar({ language = 'english' }: SidebarProps) {
  const isRTL = language === 'arabic';
  const location = useLocation();
  const { toggleAIAssistant } = useAIAssistant();
  const { theme, toggleTheme } = useTheme();
  const [expandedRegion, setExpandedRegion] = useState<string | null>(null);
  const [expandedCountry, setExpandedCountry] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [preActivationCompleted, setPreActivationCompleted] = useState(true);

  const menuItems = [
    { id: 'dashboard', label: isRTL ? 'لوحة المعلومات' : 'Dashboard', icon: <LayoutDashboardIcon size={20} />, path: '/dashboard' },
    { id: 'regions', label: isRTL ? 'المناطق والمشاريع' : 'Regions & Projects', icon: <GlobeIcon size={20} />, hasDropdown: true, path: '/regions' },
    { id: 'contracts', label: isRTL ? 'العقود' : 'Contracts', icon: <FileTextIcon size={20} />, subLabel: isRTL ? 'اكتمل' : 'Completed', path: '/contracts', completed: preActivationCompleted },
    { id: 'obligations', label: isRTL ? 'الالتزامات' : 'Obligations', icon: <CalendarClockIcon size={20} />, subLabel: isRTL ? 'ما بعد التفعيل' : 'Post-Activation', path: '/obligations' },
    { id: 'ai-assistant', label: isRTL ? 'المساعد الذكي' : 'AI Assistant', icon: <BrainIcon size={20} />, path: '/ai-assistant' },
    { id: 'reports', label: isRTL ? 'التقارير' : 'Reports', icon: <BarChart3Icon size={20} />, path: '/reports' },
    { id: 'settings', label: isRTL ? 'الإعدادات' : 'Settings', icon: <SettingsIcon size={20} />, path: '/settings' },
  ];

  const regions = [{
    id: 'middle-east',
    name: isRTL ? 'الشرق الأوسط' : 'Middle East',
    countries: [{
      id: 'egypt',
      name: isRTL ? 'مصر' : 'Egypt',
      projects: [{
        id: 'project-1',
        name: isRTL ? 'مترو القاهرة - الخط الثالث' : 'Cairo Metro Line 3',
        subprojects: [{
          id: 'electrical',
          name: isRTL ? 'الأنظمة الكهربائية' : 'Electrical Systems',
          contracts: [{
            id: 'siemens',
            name: isRTL ? 'عقد سيمنز' : 'Siemens Contract'
          }, {
            id: 'abb',
            name: isRTL ? 'عقد إيه بي بي' : 'ABB Contract'
          }]
        }, {
          id: 'civil',
          name: isRTL ? 'الأعمال المدنية' : 'Civil Works',
          contracts: [{
            id: 'orascom',
            name: isRTL ? 'عقد أوراسكوم' : 'Orascom Contract'
          }]
        }]
      }, {
        id: 'project-2',
        name: isRTL ? 'توسعة ميناء الإسكندرية' : 'Alexandria Port Expansion',
        subprojects: []
      }]
    }, {
      id: 'uae',
      name: isRTL ? 'الإمارات العربية المتحدة' : 'UAE',
      projects: [{
        id: 'project-3',
        name: isRTL ? 'مطار دبي T3' : 'Dubai Airport T3',
        subprojects: [{
          id: 'hvac',
          name: isRTL ? 'نظام التكييف' : 'HVAC System',
          contracts: [{
            id: 'carrier',
            name: isRTL ? 'عقد كارير' : 'Carrier Contract'
          }]
        }]
      }]
    }, {
      id: 'qatar',
      name: isRTL ? 'قطر' : 'Qatar',
      projects: [{
        id: 'project-4',
        name: isRTL ? 'استاد قطر' : 'Qatar Stadium',
        subprojects: []
      }]
    }]
  }, {
    id: 'europe',
    name: isRTL ? 'أوروبا' : 'Europe',
    countries: [{
      id: 'germany',
      name: isRTL ? 'ألمانيا' : 'Germany',
      projects: []
    }, {
      id: 'france',
      name: isRTL ? 'فرنسا' : 'France',
      projects: []
    }]
  }];

  const toggleRegion = (regionId: string) => {
    setExpandedRegion(expandedRegion === regionId ? null : regionId);
    setExpandedCountry(null);
  };

  const toggleCountry = (countryId: string) => {
    setExpandedCountry(expandedCountry === countryId ? null : countryId);
  };

  const filteredRegions = searchTerm ? regions.map(region => ({
    ...region,
    countries: region.countries.map(country => ({
      ...country,
      projects: country.projects.filter(project => project.name.toLowerCase().includes(searchTerm.toLowerCase()))
    })).filter(country => country.projects.length > 0)
  })).filter(region => region.countries.length > 0) : regions;

  return (
    <aside className={`w-72 bg-accent dark:bg-gray-900 border-r border-secondary dark:border-gray-700 flex flex-col h-full ${isRTL ? 'border-r-0 border-l' : ''}`}>
      <div className="p-4 border-b border-secondary dark:border-gray-700 bg-gradient-to-r from-primary to-blue-500">
        <h1 className="text-xl font-bold text-white">FIDIC AI</h1>
        <p className="text-sm text-blue-100">{isRTL ? 'نظام إدارة العقود' : 'Contract Management System'}</p>
      </div>
      <div className="p-3">
        <div className="relative w-full">
          <input
            type="text"
            placeholder={isRTL ? 'بحث...' : 'Search...'}
            className={`pl-9 pr-3 py-2 w-full text-sm border border-light-gray dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-white dark:bg-gray-800 text-text dark:text-gray-100 ${isRTL ? 'text-right' : ''} placeholder-gray-400 dark:placeholder-gray-500`}
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
          <SearchIcon size={16} className={`absolute ${isRTL ? 'right-3' : 'left-3'} top-2.5 text-gray-400 dark:text-gray-500`} />
        </div>
      </div>
      <nav className="flex-1 overflow-y-auto py-2">
        <ul className="space-y-0.5">
          {menuItems.map(item => (
            <li key={item.id}>
              {item.id === 'ai-assistant' ? (
                <button onClick={toggleAIAssistant} className={`w-full flex items-center px-4 py-2.5 text-sm font-medium ${isRTL ? 'flex-row-reverse text-right' : ''} text-text dark:text-gray-200 hover:bg-secondary dark:hover:bg-gray-800 rounded-lg transition-colors duration-150 ease-in-out`}>
                  <span className={isRTL ? 'ml-3' : 'mr-3'}>{item.icon}</span>
                  <div className="flex-1">
                    <span>{item.label}</span>
                    {item.subLabel && <span className="block text-xs text-gray-500 dark:text-gray-400 mt-0.5">{item.subLabel}</span>}
                  </div>
                </button>
              ) : (
                <Link to={item.path} className={`w-full flex items-center px-4 py-2.5 text-sm font-medium ${isRTL ? 'flex-row-reverse text-right' : ''} ${location.pathname.startsWith(item.path) ? 'text-primary bg-secondary dark:bg-gray-800 dark:text-blue-400' : 'text-text dark:text-gray-200 hover:bg-secondary dark:hover:bg-gray-800'} rounded-lg transition-colors duration-150 ease-in-out`}>
                  <span className={isRTL ? 'ml-3' : 'mr-3'}>{item.icon}</span>
                  <div className="flex-1">
                    <span>{item.label}</span>
                    {item.subLabel && <span className="block text-xs text-gray-500 dark:text-gray-400 mt-0.5">{item.subLabel}</span>}
                  </div>
                  {item.completed && <CheckCircle2Icon size={16} className="text-green-600 dark:text-green-500" />}
                  {item.hasDropdown && <ChevronDownIcon size={16} className="text-gray-400 dark:text-gray-500" />}
                </Link>
              )}
              {item.id === 'regions' && (location.pathname.startsWith('/regions') || expandedRegion) && <div className="mt-2 ml-6 mr-2 space-y-1">
                {filteredRegions.map(region => <div key={region.id}>
                  <button onClick={() => toggleRegion(region.id)} className={`w-full flex items-center px-3 py-1.5 text-sm ${isRTL ? 'flex-row-reverse text-right' : ''} text-text dark:text-gray-200 hover:bg-secondary dark:hover:bg-gray-800 rounded-md transition-colors`}>
                    <GlobeIcon size={16} className={`text-primary dark:text-blue-400 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                    <span className="flex-1">{region.name}</span>
                    {expandedRegion === region.id ? <ChevronDownIcon size={14} className="text-gray-400 dark:text-gray-500" /> : <ChevronRightIcon size={14} className="text-gray-400 dark:text-gray-500" />}
                  </button>
                  {expandedRegion === region.id && <div className={`ml-4 ${isRTL ? 'mr-4 ml-0' : ''} space-y-1 mt-1`}>
                    {region.countries.map(country => <div key={country.id}>
                      <button onClick={() => toggleCountry(country.id)} className={`w-full flex items-center px-3 py-1.5 text-sm ${isRTL ? 'flex-row-reverse text-right' : ''} text-text dark:text-gray-300 hover:bg-secondary dark:hover:bg-gray-800 rounded-md transition-colors`}>
                        <MapPinIcon size={16} className={`text-green-600 dark:text-green-500 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                        <span className="flex-1">{country.name}</span>
                        {country.projects.length > 0 && (expandedCountry === country.id ? <ChevronDownIcon size={14} className="text-gray-400 dark:text-gray-500" /> : <ChevronRightIcon size={14} className="text-gray-400 dark:text-gray-500" />)}
                      </button>
                      {expandedCountry === country.id && <div className={`ml-4 ${isRTL ? 'mr-4 ml-0' : ''} space-y-1 mt-1`}>
                        {country.projects.map(project => <Link to={`/project/${project.id}`} key={project.id} className={`w-full flex items-center px-3 py-1.5 text-sm ${isRTL ? 'flex-row-reverse text-right' : ''} text-text dark:text-gray-400 hover:bg-secondary dark:hover:bg-gray-800 rounded-md transition-colors duration-150 ease-in-out`}>
                          <BuildingIcon size={16} className={`text-dark-blue dark:text-blue-300 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                          <span>{project.name}</span>
                        </Link>)}
                      </div>}
                    </div>)}
                  </div>}
                </div>)}
              </div>}
            </li>
          ))}
        </ul>
        <div className="px-4 pt-6 pb-2">
          <h3 className={`text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider ${isRTL ? 'text-right' : ''}`}>
            {isRTL ? 'وصول سريع' : 'Quick Access'}
          </h3>
        </div>
        <ul className="space-y-1 px-3">
          <li>
            <Link to="/project/project-1" className={`w-full flex items-center px-3 py-2 text-xs font-medium text-text dark:text-gray-300 hover:bg-secondary dark:hover:bg-gray-800 rounded-md ${isRTL ? 'flex-row-reverse text-right' : ''}`}>
              <BuildingIcon size={14} className={`text-primary dark:text-blue-400 ${isRTL ? 'ml-2' : 'mr-2'}`} />
              {isRTL ? 'مترو القاهرة - الخط الثالث' : 'Cairo Metro Line 3'}
            </Link>
          </li>
          <li>
            <Link to="/contracts" className={`w-full flex items-center px-3 py-2 text-xs font-medium text-text dark:text-gray-300 hover:bg-secondary dark:hover:bg-gray-800 rounded-md ${isRTL ? 'flex-row-reverse text-right' : ''}`}>
              <FileTextIcon size={14} className={`text-green-600 dark:text-green-500 ${isRTL ? 'ml-2' : 'mr-2'}`} />
              {isRTL ? 'عقد سيمنز' : 'Siemens Contract'}
            </Link>
          </li>
          <li>
            <Link to="/reports" className={`w-full flex items-center px-3 py-2 text-xs font-medium text-text dark:text-gray-300 hover:bg-secondary dark:hover:bg-gray-800 rounded-md ${isRTL ? 'flex-row-reverse text-right' : ''}`}>
              <AlertCircleIcon size={14} className={`text-red-600 dark:text-rose-500 ${isRTL ? 'ml-2' : 'mr-2'}`} />
              {isRTL ? 'عناصر عالية المخاطر' : 'High Risk Items'}
            </Link>
          </li>
        </ul>
      </nav>
      <div className="p-4 border-t border-secondary dark:border-gray-700 bg-secondary dark:bg-gray-800">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-medium">
            JD
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-text dark:text-white">
              {isRTL ? 'جون دو' : 'John Doe'}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {isRTL ? 'مدير العقود' : 'Contract Administrator'}
            </p>
          </div>
          <div className="ml-auto flex items-center space-x-1">
            <button
              onClick={toggleTheme}
              className="p-1.5 rounded-full hover:bg-white/10 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {theme === 'dark' ? <SunIcon size={16} /> : <MoonIcon size={16} />}
            </button>
            <button className="p-1.5 rounded-full hover:bg-secondary dark:hover:bg-gray-700">
              <SettingsIcon size={16} className="text-gray-500 dark:text-gray-400" />
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}