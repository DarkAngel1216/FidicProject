import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { UserIcon, GlobeIcon, BellIcon, LockIcon, DatabaseIcon, ServerIcon, SaveIcon, PlusIcon, MailIcon, UserCircleIcon, CheckCircleIcon } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring" as const,
      stiffness: 100
    }
  }
};

export function Settings() {
  const { user, updateProfile } = useAuth();
  const [activeTab, setActiveTab] = useState('account');
  const [loading, setLoading] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Account form state
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    role: user?.role || '',
  });

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert('Settings saved successfully!');
    }, 1000);
  };

  const handleAccountSave = () => {
    setLoading(true);
    setSaveSuccess(false);

    // Update profile in AuthContext
    updateProfile({
      name: formData.name,
      email: formData.email,
    });

    setTimeout(() => {
      setLoading(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }, 1000);
  };

  const navItems = [
    { id: 'account', label: 'Account', icon: <UserIcon size={18} /> },
    { id: 'regions', label: 'Regions & Countries', icon: <GlobeIcon size={18} /> },
    { id: 'notifications', label: 'Notifications', icon: <BellIcon size={18} /> },
    { id: 'security', label: 'Security', icon: <LockIcon size={18} /> },
    { id: 'data', label: 'Data Residency', icon: <DatabaseIcon size={18} /> },
    { id: 'integrations', label: 'Integrations', icon: <ServerIcon size={18} /> },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'account':
        return (
          <motion.div key="account" variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
            <motion.div variants={itemVariants} className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Account Settings</h3>
                {saveSuccess && (
                  <div className="flex items-center text-green-600 dark:text-green-400 text-sm font-medium">
                    <CheckCircleIcon size={16} className="mr-1" />
                    Saved successfully!
                  </div>
                )}
              </div>

              <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl p-6 shadow-sm">
                <div className="space-y-6">
                  {/* Profile Picture */}
                  <div className="flex items-center space-x-6">
                    <div className="w-20 h-20 rounded-full bg-blue-600 flex items-center justify-center text-white text-2xl font-bold">
                      {user?.name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'U'}
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 dark:text-white">Profile Picture</h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">JPG, GIF or PNG. Max size of 2MB</p>
                      <button className="mt-2 px-3 py-1.5 text-xs font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors">
                        Upload Photo
                      </button>
                    </div>
                  </div>

                  {/* Name Field */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      <UserCircleIcon size={16} className="inline mr-1" />
                      Full Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your full name"
                    />
                  </div>

                  {/* Email Field */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      <MailIcon size={16} className="inline mr-1" />
                      Email Address
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your email"
                    />
                  </div>

                  {/* Role Field (Read-only) */}
                  <div>
                    <label htmlFor="role" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Role
                    </label>
                    <input
                      id="role"
                      type="text"
                      value={formData.role}
                      disabled
                      className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-700/50 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                    />
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Contact your administrator to change your role</p>
                  </div>

                  {/* Save Button */}
                  <div className="flex justify-end pt-4 border-t border-gray-200 dark:border-gray-700">
                    <button
                      onClick={handleAccountSave}
                      disabled={loading}
                      className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center font-medium transition-colors"
                    >
                      {loading ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Saving...
                        </>
                      ) : (
                        <>
                          <SaveIcon size={16} className="mr-2" />
                          Save Changes
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        );
      case 'regions':
        return (
          <motion.div key="regions" variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
            <motion.div variants={itemVariants} className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Managed Regions</h3>
                <button
                  onClick={() => alert("Add Region modal would open here")}
                  className="px-4 py-2 text-sm font-medium text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-900/30 rounded-xl hover:bg-blue-100 dark:hover:bg-blue-900/50 flex items-center gap-1.5 transition-colors"
                >
                  <PlusIcon size={16} /> Add Region
                </button>
              </div>
              <div className="border border-gray-100 dark:border-gray-700 rounded-2xl overflow-hidden shadow-sm">
                <table className="min-w-full divide-y divide-gray-100 dark:divide-gray-700">
                  <thead className="bg-gray-50/50 dark:bg-gray-700/50">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Region</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Countries</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Projects</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Admin</th>
                      <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <motion.tbody
                    className="bg-white dark:bg-gray-800 divide-y divide-gray-100 dark:divide-gray-700"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    {[
                      { name: 'Middle East', countries: 4, projects: 8, admin: 'Ahmed Hassan' },
                      { name: 'Europe', countries: 2, projects: 3, admin: 'Maria Schmidt' },
                      { name: 'North America', countries: 2, projects: 5, admin: 'John Smith' }
                    ].map((region, index) => (
                      <motion.tr
                        key={index}
                        variants={itemVariants}
                        className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{region.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{region.countries}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{region.projects}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{region.admin}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-3">
                          <button className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium transition-colors" onClick={() => alert(`Editing ${region.name}`)}>Edit</button>
                          <button className="text-rose-600 dark:text-rose-400 hover:text-rose-800 dark:hover:text-rose-300 font-medium transition-colors" onClick={() => { if (confirm(`Delete ${region.name}?`)) alert("Deleted"); }}>Delete</button>
                        </td>
                      </motion.tr>
                    ))}
                  </motion.tbody>
                </table>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Data Residency Settings</h3>
              </div>
              <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center">
                      <DatabaseIcon size={20} className="text-blue-600 dark:text-blue-400" />
                    </div>
                  </div>
                  <div className="ml-5">
                    <h4 className="text-base font-bold text-gray-900 dark:text-white">Regional Data Compliance</h4>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Configure where contract data is stored to comply with regional data protection laws.</p>
                    <div className="mt-5 space-y-4">
                      <div className="flex items-center">
                        <input id="middle-east" name="data-region" type="radio" className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600" defaultChecked />
                        <label htmlFor="middle-east" className="ml-3 block text-sm font-medium text-gray-700 dark:text-gray-300">Middle East (UAE) - Compliant with GCC Data Laws</label>
                      </div>
                      <div className="flex items-center">
                        <input id="europe" name="data-region" type="radio" className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600" />
                        <label htmlFor="europe" className="ml-3 block text-sm font-medium text-gray-700 dark:text-gray-300">Europe (Germany) - GDPR Compliant</label>
                      </div>
                      <div className="flex items-center">
                        <input id="us" name="data-region" type="radio" className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600" />
                        <label htmlFor="us" className="ml-3 block text-sm font-medium text-gray-700 dark:text-gray-300">United States - CCPA Compliant</label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        );
      default:
        return (
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-24 bg-gray-50 dark:bg-gray-800/50 rounded-2xl border border-gray-100 dark:border-gray-700 dashed-border"
          >
            <div className="p-6 bg-white dark:bg-gray-700 rounded-2xl shadow-sm mb-4">
              {React.cloneElement(navItems.find(i => i.id === activeTab)?.icon as React.ReactElement, { size: 32, className: "text-gray-400 dark:text-gray-300" })}
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">{navItems.find(i => i.id === activeTab)?.label} Settings</h3>
            <p className="text-gray-500 dark:text-gray-400 mt-2">This module is currently under development.</p>
          </motion.div>
        );
    }
  };

  return (
    <motion.div
      className="space-y-8 p-6 bg-gray-50 dark:bg-gray-900 min-h-screen"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Settings</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Manage platform configuration and preferences.</p>
        </div>
        <button
          onClick={handleSave}
          disabled={loading}
          className="px-5 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-xl hover:bg-blue-700 shadow-sm flex items-center gap-2 transition-all hover:shadow-md disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {loading ? 'Saving...' : <><SaveIcon size={18} /> Save Changes</>}
        </button>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden min-h-[600px] flex">
        <div className="w-64 bg-gray-50/50 dark:bg-gray-800/50 border-r border-gray-100 dark:border-gray-700 flex-shrink-0">
          <nav className="p-4 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all ${activeTab === item.id
                  ? 'text-blue-700 dark:text-blue-400 bg-white dark:bg-gray-700 shadow-sm ring-1 ring-gray-100 dark:ring-gray-600'
                  : 'text-gray-500 dark:text-gray-400 hover:bg-white/50 dark:hover:bg-gray-700/50 hover:text-gray-900 dark:hover:text-gray-200'
                  }`}
              >
                <span className={`mr-3 ${activeTab === item.id ? 'text-blue-600 dark:text-blue-400' : 'text-gray-400 dark:text-gray-500'}`}>
                  {item.icon}
                </span>
                {item.label}
              </button>
            ))}
          </nav>
        </div>
        <div className="flex-1 p-8 bg-white dark:bg-gray-800">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 pb-4 border-b border-gray-100 dark:border-gray-700">
            {navItems.find(i => i.id === activeTab)?.label}
          </h2>
          {renderContent()}
        </div>
      </div>
    </motion.div>
  );
}