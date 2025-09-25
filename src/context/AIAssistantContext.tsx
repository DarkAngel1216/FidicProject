import React, { createContext, useState, useContext } from 'react';

const AIAssistantContext = createContext({
  isAIAssistantOpen: false,
  toggleAIAssistant: () => {},
});

export const useAIAssistant = () => useContext(AIAssistantContext);

export const AIAssistantProvider = ({ children }) => {
  const [isAIAssistantOpen, setIsAIAssistantOpen] = useState(false);

  const toggleAIAssistant = () => {
    setIsAIAssistantOpen(!isAIAssistantOpen);
  };

  return (
    <AIAssistantContext.Provider value={{ isAIAssistantOpen, toggleAIAssistant }}>
      {children}
    </AIAssistantContext.Provider>
  );
};
