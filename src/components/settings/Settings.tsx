import React from 'react';
import { UserIcon, GlobeIcon, BellIcon, LockIcon, DatabaseIcon, ServerIcon } from 'lucide-react';
export function Settings() {
  return <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Settings</h1>
        <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700">
          Save Changes
        </button>
      </div>
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        <div className="grid grid-cols-4">
          <div className="col-span-1 bg-gray-50 border-r border-gray-200">
            <nav className="py-4">
              <ul>
                {[{
                id: 'account',
                label: 'Account',
                icon: <UserIcon size={16} />
              }, {
                id: 'regions',
                label: 'Regions & Countries',
                icon: <GlobeIcon size={16} />
              }, {
                id: 'notifications',
                label: 'Notifications',
                icon: <BellIcon size={16} />
              }, {
                id: 'security',
                label: 'Security',
                icon: <LockIcon size={16} />
              }, {
                id: 'data',
                label: 'Data Residency',
                icon: <DatabaseIcon size={16} />
              }, {
                id: 'integrations',
                label: 'Integrations',
                icon: <ServerIcon size={16} />
              }].map((item, index) => <li key={item.id}>
                    <button className={`w-full flex items-center px-4 py-2.5 text-sm font-medium ${index === 1 ? 'text-blue-700 bg-blue-50' : 'text-gray-700 hover:bg-gray-100'}`}>
                      <span className="mr-3">{item.icon}</span>
                      {item.label}
                    </button>
                  </li>)}
              </ul>
            </nav>
          </div>
          <div className="col-span-3 p-6">
            <h2 className="text-lg font-medium text-gray-800 mb-4">
              Regions & Countries
            </h2>
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-sm font-medium text-gray-700">
                    Managed Regions
                  </h3>
                  <button className="px-3 py-1.5 text-xs font-medium text-blue-700 bg-blue-50 rounded-md hover:bg-blue-100">
                    Add Region
                  </button>
                </div>
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Region
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Countries
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Projects
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Admin
                        </th>
                        <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {[{
                      name: 'Middle East',
                      countries: 4,
                      projects: 8,
                      admin: 'Ahmed Hassan'
                    }, {
                      name: 'Europe',
                      countries: 2,
                      projects: 3,
                      admin: 'Maria Schmidt'
                    }, {
                      name: 'North America',
                      countries: 2,
                      projects: 5,
                      admin: 'John Smith'
                    }].map((region, index) => <tr key={index}>
                          <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-800">
                            {region.name}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                            {region.countries}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                            {region.projects}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                            {region.admin}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-right text-sm font-medium">
                            <button className="text-blue-600 hover:text-blue-800 mr-3">
                              Edit
                            </button>
                            <button className="text-red-600 hover:text-red-800">
                              Delete
                            </button>
                          </td>
                        </tr>)}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-sm font-medium text-gray-700">
                    Data Residency Settings
                  </h3>
                </div>
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-0.5">
                      <DatabaseIcon size={20} className="text-blue-600" />
                    </div>
                    <div className="ml-3">
                      <h4 className="text-sm font-medium text-gray-800">
                        Regional Data Compliance
                      </h4>
                      <p className="mt-1 text-xs text-gray-500">
                        Configure where contract data is stored to comply with
                        regional data protection laws.
                      </p>
                      <div className="mt-3 space-y-2">
                        <div className="flex items-center">
                          <input id="middle-east" name="data-region" type="radio" className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500" defaultChecked />
                          <label htmlFor="middle-east" className="ml-2 block text-xs text-gray-700">
                            Middle East (UAE) - Compliant with GCC Data Laws
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input id="europe" name="data-region" type="radio" className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500" />
                          <label htmlFor="europe" className="ml-2 block text-xs text-gray-700">
                            Europe (Germany) - GDPR Compliant
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input id="us" name="data-region" type="radio" className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500" />
                          <label htmlFor="us" className="ml-2 block text-xs text-gray-700">
                            United States - CCPA Compliant
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="pt-4 border-t border-gray-200">
                <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700">
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
}