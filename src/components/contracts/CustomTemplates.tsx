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
      <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Custom Company Templates</h2>
      <div className="flex mb-4">
        <input
          type="text"
          value={newCompanyName}
          onChange={(e) => setNewCompanyName(e.target.value)}
          placeholder="Enter new company name"
          className="flex-grow p-2 border border-gray-300 dark:border-gray-600 rounded-l-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button onClick={addCompany} className="px-4 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700 transition-colors">Add Company</button>
      </div>
      <div className="space-y-6">
        {companies.map(company => (
          <div key={company.id} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800">
            <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">{company.name}</h3>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Upload Custom Template for {company.name}</label>
              <input type="file" className="mt-1 block w-full text-sm text-gray-900 dark:text-gray-100 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-300 dark:border-gray-600 cursor-pointer focus:outline-none" />
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