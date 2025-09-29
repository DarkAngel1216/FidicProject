import React from 'react';
import { ContractEditor } from './ContractEditor';

interface LayoutSettingsProps {
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
  isOpen: boolean;
  onClose: () => void;
}

export function LayoutSettings({ 
  logo, setLogo, 
  title, setTitle, 
  font, setFont, 
  pageColor, setPageColor,
  borderColor, setBorderColor,
  borderWidth, setBorderWidth,
  logoPosition, setLogoPosition,
  isOpen, 
  onClose 
}: LayoutSettingsProps) {
  return (
    <div>
      {isOpen && (
        <ContractEditor
          logo={logo}
          setLogo={setLogo}
          title={title}
          setTitle={setTitle}
          font={font}
          setFont={setFont}
          pageColor={pageColor}
          setPageColor={setPageColor}
          borderColor={borderColor}
          setBorderColor={setBorderColor}
          borderWidth={borderWidth}
          setBorderWidth={setBorderWidth}
          logoPosition={logoPosition}
          setLogoPosition={setLogoPosition}
          onClose={onClose}
        />
      )}
    </div>
  );
}
