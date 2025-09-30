import React, { useEffect, useState, useRef } from 'react';
import { MessageSquareTextIcon, XIcon, SendIcon, MinimizeIcon, MaximizeIcon, FileTextIcon, BrainIcon, BookOpenIcon, SettingsIcon, ChevronDownIcon } from 'lucide-react';
interface GlobalChatbotProps {
  language?: string;
  projectContext?: {
    projectId?: string;
    projectName?: string;
    contractId?: string;
    contractName?: string;
  };
}
export function GlobalChatbot({
  language = 'english',
  projectContext
}: GlobalChatbotProps) {
  // Local open state for the floating mini-chat, independent from the full-screen assistant
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([{
    role: 'system',
    content: language === 'arabic' ? 'مرحبًا! أنا مساعد فيديك الذكي. كيف يمكنني مساعدتك اليوم؟' : "Hello! I'm your FIDIC AI Assistant. How can I help you today?"
  }]);
  const [inputValue, setInputValue] = useState('');
  const [contextDropdownOpen, setContextDropdownOpen] = useState(false);
  const [selectedContext, setSelectedContext] = useState<string>(projectContext?.projectName ? `${projectContext.projectName}${projectContext.contractName ? ` - ${projectContext.contractName}` : ''}` : 'General');
  const isRTL = language === 'arabic';
  const messagesEndRef = useRef<HTMLDivElement>(null);
  // Available contexts
  const availableContexts = [{
    id: 'general',
    name: isRTL ? 'عام' : 'General'
  }, {
    id: 'fidic-red-book',
    name: isRTL ? 'فيديك الكتاب الأحمر 2017' : 'FIDIC Red Book 2017'
  }, {
    id: 'cairo-metro',
    name: isRTL ? 'مترو القاهرة - الخط الثالث' : 'Cairo Metro Line 3'
  }, {
    id: 'abb-contract',
    name: isRTL ? 'عقد ABB' : 'ABB Contract'
  }, {
    id: 'siemens-contract',
    name: isRTL ? 'عقد سيمنز' : 'Siemens Contract'
  }];
  // Scroll to bottom of messages when new message is added
  useEffect(() => {
    if (messagesEndRef.current && isOpen && !isMinimized) {
      messagesEndRef.current.scrollIntoView({
        behavior: 'smooth'
      });
    }
  }, [messages, isOpen, isMinimized]);

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };
  const handleSendMessage = () => {
    if (inputValue.trim() === '') return;
    // Add user message
    setMessages([...messages, {
      role: 'user',
      content: inputValue
    }]);
    setInputValue('');
    // Simulate AI response
    setTimeout(() => {
      let aiResponse = '';
      // Generate different responses based on context
      if (selectedContext.includes('ABB Contract') || selectedContext.includes('عقد ABB')) {
        aiResponse = isRTL ? 'أنا أحلل سؤالك حول عقد ABB. بناءً على شروط العقد، البند 14.7 يحدد شروط الدفع التي تتطلب معالجة المدفوعات خلال 90 يومًا. هذا يختلف عن معيار فيديك البالغ 56 يومًا ويشكل خطرًا متوسطًا على التدفق النقدي للمشروع.' : "I'm analyzing your question about the ABB Contract. Based on the contract terms, Clause 14.7 specifies payment terms requiring payments to be processed within 90 days. This differs from the FIDIC standard of 56 days and presents a medium risk to the project's cash flow.";
      } else if (selectedContext.includes('Cairo Metro') || selectedContext.includes('مترو القاهرة')) {
        aiResponse = isRTL ? 'بالنسبة لمشروع مترو القاهرة - الخط الثالث، يتضمن المشروع ثلاثة عقود رئيسية: عقد سيمنز للأنظمة الكهربائية، وعقد ABB للمعدات الكهربائية، وعقد أوراسكوم للأعمال المدنية. هل تريد معلومات محددة عن أي من هذه العقود؟' : 'For the Cairo Metro Line 3 project, the project includes three main contracts: Siemens Contract for electrical systems, ABB Contract for electrical equipment, and Orascom Contract for civil works. Would you like specific information about any of these contracts?';
      } else {
        aiResponse = isRTL ? 'أنا أحلل سؤالك حول عقود فيديك. هذه ستكون إجابة مفصلة حول بنود العقد والالتزامات وأفضل الممارسات بناءً على سؤالك المحدد.' : "I'm analyzing your question about FIDIC contracts. This would be a detailed response about contract clauses, obligations, and best practices based on your specific question.";
      }
      setMessages(prev => [...prev, {
        role: 'system',
        content: aiResponse
      }]);
    }, 1000);
  };
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  const handleContextSelect = (contextName: string) => {
    setSelectedContext(contextName);
    setContextDropdownOpen(false);
  };
  return <>
      {/* Chatbot button */}
      <button onClick={() => setIsOpen(prev => !prev)} className="fixed bottom-6 right-6 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-all z-50" aria-label={isRTL ? 'فتح المساعد الذكي' : 'Open AI Assistant'}>
        {isOpen ? <XIcon size={24} /> : <MessageSquareTextIcon size={24} />}
      </button>
      {/* Chatbot window */}
      {isOpen && <div className={`fixed bottom-20 right-6 bg-white rounded-lg shadow-xl border border-gray-200 transition-all z-50 ${isMinimized ? 'w-72 h-14' : 'w-96 h-[600px] max-h-[80vh]'} flex flex-col`}>
          {/* Header */}
          <div className="flex items-center justify-between p-3 border-b border-gray-200 bg-blue-600 text-white rounded-t-lg">
            <div className="flex items-center">
              <BrainIcon size={20} className="mr-2" />
              <h3 className="font-medium">
                {isRTL ? 'المساعد الذكي' : 'AI Assistant'}
              </h3>
            </div>
            <div className="flex items-center space-x-2">
              <button onClick={toggleMinimize} className="text-white hover:text-blue-100">
                {isMinimized ? <MaximizeIcon size={18} /> : <MinimizeIcon size={18} />}
              </button>
              <button onClick={() => setIsOpen(false)} className="text-white hover:text-blue-100">
                <XIcon size={18} />
              </button>
            </div>
          </div>
          {!isMinimized && <>
              {/* Context selector */}
              <div className="px-3 py-2 border-b border-gray-200 bg-gray-50">
                <div className="relative">
                  <button onClick={() => setContextDropdownOpen(!contextDropdownOpen)} className="w-full flex items-center justify-between px-3 py-1.5 text-sm bg-white border border-gray-300 rounded-md hover:bg-gray-50">
                    <div className="flex items-center">
                      <FileTextIcon size={14} className="text-blue-600 mr-2" />
                      <span className="text-gray-700">{selectedContext}</span>
                    </div>
                    <ChevronDownIcon size={16} className="text-gray-500" />
                  </button>
                  {contextDropdownOpen && <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-md z-10">
                      <ul className="py-1">
                        {availableContexts.map(context => <li key={context.id}>
                            <button onClick={() => handleContextSelect(context.name)} className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-50 ${selectedContext === context.name ? 'bg-blue-50 text-blue-600' : 'text-gray-700'}`}>
                              {context.name}
                            </button>
                          </li>)}
                      </ul>
                    </div>}
                </div>
              </div>
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-3 bg-gray-50">
                {messages.map((message, index) => <div key={index} className={`mb-3 ${message.role === 'user' ? 'flex justify-end' : 'flex justify-start'}`}>
                    <div className={`max-w-[80%] rounded-lg p-3 ${message.role === 'user' ? 'bg-blue-600 text-white' : 'bg-white border border-gray-200 shadow-sm'}`}>
                      <p className="text-sm whitespace-pre-line">
                        {message.content}
                      </p>
                      {message.role === 'system' && <div className="mt-2 pt-2 border-t border-gray-100 flex justify-between items-center">
                          <div className="flex space-x-2">
                            <button className="text-xs text-gray-500 hover:text-blue-600">
                              {isRTL ? 'نسخ' : 'Copy'}
                            </button>
                            <button className="text-xs text-gray-500 hover:text-blue-600">
                              {isRTL ? 'حفظ في الملاحظات' : 'Save to Notes'}
                            </button>
                          </div>
                          <div className="text-xs text-gray-400">FIDIC AI</div>
                        </div>}
                    </div>
                  </div>)}
                <div ref={messagesEndRef} />
              </div>
              {/* Input */}
              <div className="p-3 border-t border-gray-200">
                <div className="relative">
                  <textarea value={inputValue} onChange={e => setInputValue(e.target.value)} onKeyPress={handleKeyPress} placeholder={isRTL ? 'اكتب سؤالك هنا...' : 'Type your question here...'} className="w-full pl-3 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none" rows={2} />
                  <button onClick={handleSendMessage} disabled={inputValue.trim() === ''} className={`absolute right-2 bottom-2 text-blue-600 hover:text-blue-800 ${inputValue.trim() === '' ? 'opacity-50 cursor-not-allowed' : ''}`}>
                    <SendIcon size={20} />
                  </button>
                </div>
                <div className="flex justify-between mt-2 text-xs text-gray-500">
                  <span>
                    {isRTL ? 'يمكنك طرح أسئلة حول العقود والبنود والالتزامات' : 'Ask questions about contracts, clauses, and obligations'}
                  </span>
                  <button className="text-blue-600 hover:text-blue-800">
                    <SettingsIcon size={14} className="inline mr-1" />
                    {isRTL ? 'إعدادات' : 'Settings'}
                  </button>
                </div>
              </div>
            </>}
        </div>}
    </>;
}