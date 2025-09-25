import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { GlobalChatbot } from './components/ui/GlobalChatbot';
import { AIAssistant } from './components/ai/AIAssistant';
import { AIAssistantProvider, useAIAssistant } from './context/AIAssistantContext';
import { ThemeProvider, useTheme } from './context/ThemeContext';

function AppContent() {
  const [language, setLanguage] = useState('english');
  const [direction, setDirection] = useState<'ltr' | 'rtl'>('ltr');
  const location = useLocation();
  const { isAIAssistantOpen, toggleAIAssistant } = useAIAssistant();
  const { theme } = useTheme();

  const handleLanguageChange = (lang: string) => {
    setLanguage(lang);
    setDirection(lang === 'arabic' ? 'rtl' : 'ltr');
  };

  const showSidebar = !location.pathname.startsWith('/project/');

  return (
    <div className={`${theme} flex h-screen w-full bg-accent flex-col ${direction}`} dir={direction}>
      <div className="flex flex-1 overflow-hidden">
        {showSidebar && <Sidebar language={language} />}
        <div className="flex flex-col flex-1 overflow-hidden">
          <Header onLanguageChange={handleLanguageChange} />
          <main className="flex-1 overflow-y-auto bg-white">
            <Outlet />
          </main>
          <Footer language={language} />
        </div>
        {isAIAssistantOpen && <AIAssistant onClose={toggleAIAssistant} isRTL={direction === 'rtl'} />}
      </div>
      <GlobalChatbot language={language} />
    </div>
  );
}

export function App() {
  return (
    <ThemeProvider>
      <AIAssistantProvider>
        <AppContent />
      </AIAssistantProvider>
    </ThemeProvider>
  );
}
