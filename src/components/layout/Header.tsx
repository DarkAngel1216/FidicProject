import React, { useState } from 'react';
import { BellIcon, SearchIcon, GlobeIcon, ChevronDownIcon, UserIcon, HelpCircleIcon, MoonIcon, SunIcon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export function Header({
  onLanguageChange
}) {
  const { theme, toggleTheme } = useTheme();
  const [language, setLanguage] = useState('english');
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const toggleLanguageMenu = () => {
    setIsLanguageMenuOpen(!isLanguageMenuOpen);
    if (isUserMenuOpen) setIsUserMenuOpen(false);
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
    if (isLanguageMenuOpen) setIsLanguageMenuOpen(false);
  };

  const changeLanguage = (lang: string) => {
    setLanguage(lang);
    setIsLanguageMenuOpen(false);
    if (onLanguageChange) {
      onLanguageChange(lang);
    }
  };

  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 h-16 flex items-center px-4 justify-between shadow-sm">
      <div className="flex items-center w-1/3">
        <div className="relative w-full max-w-md">
          <input
            type="text"
            placeholder="Search contracts, clauses, projects..."
            className="pl-10 pr-4 py-2 border border-gray-300 border-primary rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
          <SearchIcon size={18} className="absolute left-3 top-2.5 text-gray-400" />
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <button onClick={toggleTheme} className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
          {theme === 'light' ? <MoonIcon size={20} /> : <SunIcon size={20} />}
        </button>
        <button className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
          <HelpCircleIcon size={20} />
        </button>
        <div className="relative">
          <button className="relative p-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 focus:outline-none rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
            <BellIcon size={20} />
            <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
              3
            </span>
          </button>
        </div>
        <div className="relative">
          <button className="flex items-center text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700" onClick={toggleLanguageMenu}>
            <GlobeIcon size={20} />
          </button>
          {isLanguageMenuOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-10">
              <ul className="py-1">
                <li>
                  <button
                    className={`w-full text-left px-4 py-2 text-sm ${language === 'english' ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'}`}
                    onClick={() => changeLanguage('english')}
                  >
                    English
                  </button>
                </li>
                <li>
                  <button
                    className={`w-full text-left px-4 py-2 text-sm ${language === 'arabic' ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'}`}
                    onClick={() => changeLanguage('arabic')}
                  >
                    العربية
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
        <div className="relative">
          <button className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700" onClick={toggleUserMenu}>
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-medium">
              JD
            </div>
            <ChevronDownIcon size={16} className="text-gray-500" />
          </button>
          {isUserMenuOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-10">
              <div className="p-3 border-b border-gray-200 dark:border-gray-700">
                <p className="text-sm font-medium text-gray-900 dark:text-white">John Doe</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">john.doe@example.com</p>
              </div>
              <ul className="py-1">
                <li>
                  <button className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center">
                    <UserIcon size={16} className="mr-2 text-gray-500" />
                    Profile Settings
                  </button>
                </li>
                <li>
                  <button className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
                    <span className="flex items-center">
                      <GlobeIcon size={16} className="mr-2 text-gray-500" />
                      Language: {language === 'english' ? 'English' : 'العربية'}
                    </span>
                  </button>
                </li>
                <li className="border-t border-gray-200 dark:border-gray-700 mt-1">
                  <button className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/50">
                    Sign Out
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
