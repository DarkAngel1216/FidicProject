import React, { useState, useRef, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface ContractEditorProps {
  logo: string | null;
  setLogo: (logo: string | null) => void;
  title: string;
  setTitle: (title: string) => void;
  font: string;
  setFont: (font: string) => void;
  pageColor: string;
  setPageColor: (color: string) => void;
  borderColor: string;
  setBorderColor: (color: string) => void;
  borderWidth: number;
  setBorderWidth: (width: number) => void;
  logoPosition: string;
  setLogoPosition: (position: string) => void;
  onClose: () => void;
}

export function ContractEditor({ 
  logo: initialLogo, setLogo, 
  title: initialTitle, setTitle, 
  font: initialFont, setFont, 
  pageColor: initialPageColor, setPageColor,
  borderColor: initialBorderColor, setBorderColor,
  borderWidth: initialBorderWidth, setBorderWidth,
  logoPosition: initialLogoPosition, setLogoPosition,
  onClose 
}: ContractEditorProps) {
  const [editorContent, setEditorContent] = useState(
    '<p>This is a visual representation of your contract. Use the controls on the left to customize the logo, title, and font. You can drag and resize the logo directly on this canvas.</p>'
  );

  const [logo, setLocalLogo] = useState(initialLogo);
  const [title, setLocalTitle] = useState(initialTitle);
  const [font, setLocalFont] = useState(initialFont);
  const [pageColor, setLocalPageColor] = useState(initialPageColor);
  const [borderColor, setLocalBorderColor] = useState(initialBorderColor);
  const [borderWidth, setLocalBorderWidth] = useState(initialBorderWidth);
  const [logoPosition, setLocalLogoPosition] = useState(initialLogoPosition);

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
        setLocalLogo(event.target?.result as string);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleLogoDelete = () => {
    setLocalLogo(null);
  };

  const handleSave = () => {
    setLogo(logo);
    setTitle(title);
    setFont(font);
    setPageColor(pageColor);
    setBorderColor(borderColor);
    setBorderWidth(borderWidth);
    setLogoPosition(logoPosition);
    onClose();
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

  const modules = {
    toolbar: [
      [{'header': '1'}, {'header': '2'}, { 'font': fonts }],
      [{size: []}],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, 
       {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image', 'video'],
      ['clean']
    ],
  };

  const formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image', 'video'
  ];

  const getLogoPositionStyle = () => {
    const baseStyle: React.CSSProperties = {
      position: 'absolute',
      width: size.width,
      height: size.height,
      cursor: 'move',
      userSelect: 'none',
      zIndex: 10,
    };

    switch (logoPosition) {
      case 'top-left':
        return { ...baseStyle, top: position.y, left: position.x };
      case 'top-right':
        return { ...baseStyle, top: position.y, right: position.x };
      case 'bottom-left':
        return { ...baseStyle, bottom: position.y, left: position.x };
      case 'bottom-right':
        return { ...baseStyle, bottom: position.y, right: position.x };
      case 'center':
        return { ...baseStyle, top: '50%', left: '50%', transform: 'translate(-50%, -50%)' };
      default:
        return { ...baseStyle, top: position.y, left: position.x };
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full h-full max-w-6xl flex flex-col">
        <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Contract Editor</h2>
            <div>
              <button onClick={onClose} className="text-gray-500 hover:text-gray-800 mr-4">Cancel</button>
              <button onClick={handleSave} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Save</button>
            </div>
        </div>
        <div className="flex-grow flex space-x-4 overflow-hidden">
            <div className="w-1/4 space-y-4 overflow-y-auto">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Logo</label>
                    <input type="file" onChange={handleLogoUpload} className="mt-1 block w-full text-sm"/>
                    {logo && <button onClick={handleLogoDelete} className="mt-2 text-sm text-red-600">Delete Logo</button>}
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Title</label>
                    <input type="text" value={title} onChange={(e) => setLocalTitle(e.target.value)} className="mt-1 block w-full p-2 border rounded-md"/>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Font</label>
                    <select value={font} onChange={(e) => setLocalFont(e.target.value)} className="mt-1 block w-full p-2 border rounded-md">
                        {fonts.map(f => <option key={f} value={f}>{f}</option>)}
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Page Color</label>
                    <input type="color" value={pageColor} onChange={(e) => setLocalPageColor(e.target.value)} className="mt-1 block w-full"/>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Border Color</label>
                    <input type="color" value={borderColor} onChange={(e) => setLocalBorderColor(e.target.value)} className="mt-1 block w-full"/>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Border Width (px)</label>
                    <input type="number" value={borderWidth} onChange={(e) => setLocalBorderWidth(parseInt(e.target.value))} className="mt-1 block w-full p-2 border rounded-md"/>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Logo Position</label>
                    <select value={logoPosition} onChange={(e) => setLocalLogoPosition(e.target.value)} className="mt-1 block w-full p-2 border rounded-md">
                        <option value="top-left">Top Left</option>
                        <option value="top-right">Top Right</option>
                        <option value="bottom-left">Bottom Left</option>
                        <option value="bottom-right">Bottom Right</option>
                        <option value="center">Center</option>
                    </select>
                </div>
            </div>
            <div className="w-3/4 bg-gray-100 border rounded-md p-4 flex flex-col">
                <div 
                    className='h-full w-full shadow-md relative overflow-auto' 
                    style={{ 
                        fontFamily: font, 
                        backgroundColor: pageColor,
                        border: `${borderWidth}px solid ${borderColor}`
                    }}
                >
                    {logo && (
                        <div 
                            onMouseDown={handleMouseDown}
                            style={getLogoPositionStyle()}
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
                        <ReactQuill
                          theme="snow"
                          value={editorContent}
                          onChange={setEditorContent}
                          modules={modules}
                          formats={formats}
                          className="h-full"
                        />
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}