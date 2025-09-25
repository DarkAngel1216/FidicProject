import React, { useState, useRef, useEffect } from 'react';
import {
  SendIcon,
  BrainIcon,
  XIcon,
  ThumbsUpIcon,
  ThumbsDownIcon,
  RefreshCwIcon,
  CopyIcon,
} from 'lucide-react';

const mockResponses = {
  default: "I'm sorry, I can only answer questions about the approval process. Please ask a relevant question.",
  keywords: {
    "status": "The current approval status is 'In Progress' with 2 out of 4 approvals received. You need at least 3 approvals to proceed.",
    "reminder": "To send a reminder, click the 'Send Reminder to Pending Approvers' button. This will notify all stakeholders who haven't responded yet.",
    "approvers": "The pending approvers are Yousef Al-Mansoori and David Chen. A reminder was last sent yesterday at 4:15 PM.",
    "next": "Once you have at least 3 approvals, the 'Continue to Upload Contracts' button will be enabled, and you can proceed to the next step.",
    "help": "I can help you with questions about the approval status, sending reminders, identifying pending approvers, and understanding the next steps.",
  },
};

const getAIResponse = (query) => {
  const lowerCaseQuery = query.toLowerCase();
  for (const keyword in mockResponses.keywords) {
    if (lowerCaseQuery.includes(keyword)) {
      return mockResponses.keywords[keyword];
    }
  }
  return mockResponses.default;
};

export function AIAssistant({ onClose, isRTL }) {
  const [messages, setMessages] = useState([
    {
      role: 'system',
      content: "Hello! I'm your FIDIC AI Assistant for the Drafting Approval stage. How can I assist you?",
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    const query = inputValue.trim();
    if (query === '') return;

    setMessages(prev => [...prev, { role: 'user', content: query }]);
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      const response = getAIResponse(query);
      setMessages(prev => [...prev, { role: 'system', content: response }]);
      setIsTyping(false);
    }, 1500);
  };

  const handleClearConversation = () => {
    setMessages([
      {
        role: 'system',
        content: "Conversation cleared. How can I help you now?",
      },
    ]);
  };

  const suggestedPrompts = [
    'What is the current approval status?',
    'How do I send a reminder?',
    'Who are the pending approvers?',
    'What is the next step?',
  ];

  return (
    <div className="flex flex-col h-full bg-white shadow-lg w-full max-h-[800px]">
      <div className={`flex justify-between items-center p-4 bg-blue-600 text-white ${isRTL ? 'flex-row-reverse' : ''}`}>
        <div className={`flex items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
          <BrainIcon size={24} className={isRTL ? 'ml-3' : 'mr-3'} />
          <h2 className="text-lg font-semibold">
            {isRTL ? 'المساعد الذكي' : 'AI Assistant'}
          </h2>
        </div>
        <button onClick={onClose} className="text-white hover:bg-blue-700 p-2 rounded-full">
          <XIcon size={24} />
        </button>
      </div>

      <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex my-3 ${message.role === 'user' ? (isRTL ? 'justify-start' : 'justify-end') : (isRTL ? 'justify-end' : 'justify-start')}`}>
            <div
              className={`p-3 rounded-lg max-w-md shadow-sm ${ 
                message.role === 'user' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-white text-gray-800 border border-gray-200'
              }`}>
              <p className="text-sm whitespace-pre-wrap">{message.content}</p>
              {message.role === 'system' && index > 0 && (
                <div className={`flex items-center mt-2 pt-2 border-t border-gray-200 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <div className={`flex space-x-2 ${isRTL ? 'ml-auto' : 'mr-auto'}`}>
                    <button className="text-gray-400 hover:text-blue-600">
                      <CopyIcon size={18} />
                    </button>
                    <button className="text-gray-400 hover:text-green-600">
                      <ThumbsUpIcon size={18} />
                    </button>
                    <button className="text-gray-400 hover:text-red-600">
                      <ThumbsDownIcon size={18} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
        {isTyping && (
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
              <div
                className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"
                style={{ animationDelay: '0.2s' }}
              ></div>
              <div
                className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"
                style={{ animationDelay: '0.4s' }}
              ></div>
              <span className="text-sm text-gray-500">{isRTL ? 'يفكر...' : 'Thinking...'}</span>
            </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t border-gray-200">
        <div className="mb-3 flex flex-wrap gap-2">
            {suggestedPrompts.map((prompt, i) => (
                <button 
                    key={i} 
                    onClick={() => setInputValue(prompt)}
                    className="px-3 py-2 text-sm bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors"
                >
                    {isRTL ? `اقتراح ${i+1}` : prompt}
                </button>
            ))}
        </div>
        <form onSubmit={handleSendMessage} className={`flex items-center space-x-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={isRTL ? 'اطرح سؤالاً...' : 'Ask a question...'}
            className="flex-grow px-4 py-2 text-sm border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="p-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:bg-blue-300 transition-colors"
            disabled={isTyping || inputValue.trim() === ''}
          >
            <SendIcon size={24} />
          </button>
          <button
            type="button"
            onClick={handleClearConversation}
            className="p-3 bg-gray-200 text-gray-600 rounded-full hover:bg-gray-300 transition-colors"
            title={isRTL ? 'مسح المحادثة' : 'Clear Conversation'}
          >
            <RefreshCwIcon size={24} />
          </button>
        </form>
      </div>
    </div>
  );
}