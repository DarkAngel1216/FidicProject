import React, { useState, useRef, useEffect } from 'react';

interface ContractEditorProps {
  logo: string | null;
  setLogo: (logo: string | null) => void;
  title: string;
  setTitle: (title: string) => void;
  font: string;
  setFont: (font: string) => void;
  onClose: () => void;
}

export function ContractEditor({ logo, setLogo, title, setTitle, font, setFont, onClose }: ContractEditorProps) {
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const [size, setSize] = useState({ width: 150, height: 150 });
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const dragStartPos = useRef({ x: 0, y: 0 });
  const resizeStartPos = useRef({ x: 0, y: 0 });
  const initialSize = useRef({ width: 0, height: 0 });

  const fonts = ['Arial', 'Verdana', 'Times New Roman', 'Courier New', 'Georgia', 'Garamond', 'Comic Sans MS', 'Trebuchet MS', 'Arial Black', 'Impact', 'Lucida Sans Unicode', 'Tahoma', 'Palatino Linotype', 'Book Antiqua', 'Century Gothic'];

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setLogo(event.target?.result as string);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    dragStartPos.current = { x: e.clientX - position.x, y: e.clientY - position.y };
  };

  const handleResizeMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setIsResizing(true);
    resizeStartPos.current = { x: e.clientX, y: e.clientY };
    initialSize.current = size;
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragStartPos.current.x,
        y: e.clientY - dragStartPos.current.y,
      });
    }
    if (isResizing) {
      const dx = e.clientX - resizeStartPos.current.x;
      const dy = e.clientY - resizeStartPos.current.y;
      setSize({
        width: initialSize.current.width + dx,
        height: initialSize.current.height + dy,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setIsResizing(false);
  };

  useEffect(() => {
    if (isDragging || isResizing) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    } else {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, isResizing]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-3/4 h-3/4 flex flex-col">
        <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Contract Editor</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-800">&times;</button>
        </div>
        <div className="flex-grow flex space-x-4">
            <div className="w-1/3 space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Logo</label>
                    <input type="file" onChange={handleLogoUpload} className="mt-1 block w-full text-sm"/>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Title</label>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="mt-1 block w-full p-2 border rounded-md"/>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Font</label>
                    <select value={font} onChange={(e) => setFont(e.target.value)} className="mt-1 block w-full p-2 border rounded-md">
                        {fonts.map(f => <option key={f} value={f}>{f}</option>)}
                    </select>
                </div>
            </div>
            <div className="w-2/3 bg-gray-100 border rounded-md p-4 relative overflow-hidden">
                <div className='h-full w-full bg-white shadow-md relative'>
                    {logo && (
                        <div 
                            onMouseDown={handleMouseDown}
                            style={{ 
                                position: 'absolute', 
                                left: position.x, 
                                top: position.y, 
                                width: size.width, 
                                height: size.height, 
                                cursor: 'move',
                                userSelect: 'none'
                            }}
                        >
                            <img src={logo} alt="logo" className="w-full h-full object-contain" />
                            <div 
                                onMouseDown={handleResizeMouseDown}
                                style={{
                                    position: 'absolute', 
                                    right: 0, 
                                    bottom: 0, 
                                    width: '10px', 
                                    height: '10px', 
                                    backgroundColor: 'blue', 
                                    cursor: 'nwse-resize'
                                }}
                            />
                        </div>
                    )}
                    <div className="p-8">
                        <h1 style={{ fontFamily: font, fontSize: '2.5rem' }} className="text-center mb-8">{title}</h1>
                        <div className="text-gray-700 space-y-4">
                            <p>This is a visual representation of your contract. Use the controls on the left to customize the logo, title, and font. You can drag and resize the logo directly on this canvas.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
