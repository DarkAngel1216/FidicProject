import React, { useState } from 'react';
import { LayoutSettings } from './LayoutSettings';

interface Company {
  id: number;
  name: string;
  logo: string | null;
  title: string;
  font: string;
}

export function CustomTemplates() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [newCompanyName, setNewCompanyName] = useState('');

  const addCompany = () => {
    if (newCompanyName.trim() !== '') {
      const newCompany: Company = {
        id: Date.now(),
        name: newCompanyName,
        logo: null,
        title: `${newCompanyName} Contract`,
        font: 'Arial',
      };
      setCompanies([...companies, newCompany]);
      setNewCompanyName('');
    }
  };

  const setCompanyLogo = (id: number, logo: string | null) => {
    setCompanies(companies.map(c => c.id === id ? { ...c, logo } : c));
  };

  const setCompanyTitle = (id: number, title: string) => {
    setCompanies(companies.map(c => c.id === id ? { ...c, title } : c));
  };

  const setCompanyFont = (id: number, font: string) => {
    setCompanies(companies.map(c => c.id === id ? { ...c, font } : c));
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Custom Company Templates</h2>
      <div className="flex mb-4">
        <input 
          type="text" 
          value={newCompanyName} 
          onChange={(e) => setNewCompanyName(e.target.value)} 
          placeholder="Enter new company name" 
          className="flex-grow p-2 border rounded-l-md"
        />
        <button onClick={addCompany} className="px-4 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700">Add Company</button>
      </div>
      <div className="space-y-6">
        {companies.map(company => (
          <div key={company.id} className="p-4 border rounded-lg">
            <h3 className="text-lg font-semibold mb-2">{company.name}</h3>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Upload Custom Template for {company.name}</label>
              <input type="file" className="mt-1 block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer focus:outline-none" />
            </div>
            <LayoutSettings 
              logo={company.logo}
              setLogo={(logo) => setCompanyLogo(company.id, logo)}
              title={company.title}
              setTitle={(title) => setCompanyTitle(company.id, title)}
              font={company.font}
              setFont={(font) => setCompanyFont(company.id, font)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}