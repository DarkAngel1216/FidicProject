import React, { createContext, useState, useContext, ReactNode } from 'react';

const redBookContent = `
Clause 8.4 - Extension of Time for Completion
The Contractor shall be entitled subject to Sub-Clause 20.1 [Contractor's Claims] to an extension of the Time for Completion if and to the extent that completion for the purposes of Sub-Clause 10.1 [Taking Over of the Works and Sections] is or will be delayed by any of the following causes:
a) a Variation (unless an adjustment to the Time for Completion has been agreed under Sub-Clause 13.3 [Variation Procedure])
b) a cause of delay giving an entitlement to extension of time under a Sub-Clause of these Conditions
c) exceptionally adverse climatic conditions
d) Unforeseeable shortages in the availability of personnel or Goods caused by epidemic or governmental actions

Clause 14.7 - Payment
Payment shall be made by the Employer to the Contractor in accordance with the provisions of this Clause.

Clause 15.2 - Termination by Employer
The Employer shall be entitled to terminate the Contract if the Contractor:
a) fails to comply with a notice to correct
b) abandons the Works or otherwise plainly demonstrates the intention not to continue performance of his obligations under the Contract

Clause 19.1 - Force Majeure
"Force Majeure" means an exceptional event or circumstance:
a) which is beyond a Party's control;
b) which such Party could not reasonably have provided against before entering into the Contract;
c) which, having arisen, such Party could not reasonably have avoided or overcome; and
d) which is not substantially attributable to the other Party.

Clause 20.1 - Contractor's Claims
If the Contractor considers himself to be entitled to any extension of the Time for Completion and/or any additional payment, under any Clause of these Conditions or otherwise in connection with the Contract, the Contractor shall give notice to the Engineer, describing the event or circumstance giving rise to the claim. The notice shall be given as soon as practicable, and not later than 28 days after the Contractor became aware, or should have become aware, of the event or circumstance.
`;

const yellowBookContent = `This is the content for FIDIC Yellow Book 2017.

Clause 1: General Provisions
...
`;
const silverBookContent = `This is the content for FIDIC Silver Book 2017.

Clause 1: General Provisions
...
`;


interface Template {
  id: string;
  name: string;
  description: string;
  content: string;
  logo?: string | null;
  title?: string;
  font?: string;
  pageColor?: string;
  borderColor?: string;
  borderWidth?: number;
  logoPosition?: string;
}

interface TemplateContextType {
  templates: Template[];
  addTemplate: (template: Omit<Template, 'id'>) => void;
  updateTemplate: (id: string, template: Partial<Template>) => void;
}

const TemplateContext = createContext<TemplateContextType | undefined>(undefined);

export const useTemplates = () => {
  const context = useContext(TemplateContext);
  if (!context) {
    throw new Error('useTemplates must be used within a TemplateProvider');
  }
  return context;
};

interface TemplateProviderProps {
  children: ReactNode;
}

const initialTemplates: Template[] = [
    {
        id: 'fidic-red-book',
        name: 'FIDIC Red Book 2017',
        description: 'Conditions of Contract for Construction',
        content: redBookContent
      }, {
        id: 'fidic-yellow-book',
        name: 'FIDIC Yellow Book 2017',
        description: 'Plant and Design-Build',
        content: yellowBookContent
      }, {
        id: 'fidic-silver-book',
        name: 'FIDIC Silver Book 2017',
        description: 'EPC/Turnkey Projects',
        content: silverBookContent
      }
];

export const TemplateProvider = ({ children }: TemplateProviderProps) => {
  const [templates, setTemplates] = useState<Template[]>(initialTemplates);

  const addTemplate = (template: Omit<Template, 'id'>) => {
    const newTemplate = { ...template, id: `custom-${Date.now()}` };
    setTemplates(prevTemplates => [...prevTemplates, newTemplate]);
  };

  const updateTemplate = (id: string, updatedTemplate: Partial<Template>) => {
    setTemplates(prevTemplates => 
      prevTemplates.map(t => (t.id === id ? { ...t, ...updatedTemplate } : t))
    );
  };

  return (
    <TemplateContext.Provider value={{ templates, addTemplate, updateTemplate }}>
      {children}
    </TemplateContext.Provider>
  );
};
