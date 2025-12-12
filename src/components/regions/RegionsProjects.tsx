import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { GlobeIcon, MapPinIcon, BuildingIcon, FolderIcon, FileTextIcon, PlusIcon, ChevronDownIcon, ChevronRightIcon, SearchIcon, FilterIcon, AlertTriangleIcon, CheckCircleIcon, ClockIcon } from 'lucide-react';
import { mockData, findProjectById, Project, Region, Country, SubProject, Contract, Obligation, Risk, Dispute, TeamMember } from '../../data/mockData';

interface RegionsProjectsProps {
  onProjectSelect?: (projectId: string, projectName: string, region: string, country: string) => void;
}

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

export function RegionsProjects({ onProjectSelect }: RegionsProjectsProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedProjectId, setSelectedProjectId] = useState<string>('project-1'); // Default to Cairo Metro Line 3
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set(['region-me', 'country-egypt', 'project-1']));
  const [searchTerm, setSearchTerm] = useState<string>('');

  const selectedProject = useMemo(() => findProjectById(selectedProjectId), [selectedProjectId]);

  const handleProjectSelect = (projectId: string, projectName: string, region: string, country: string) => {
    setSelectedProjectId(projectId);
    if (onProjectSelect) {
      onProjectSelect(projectId, projectName, region, country);
    }
  };

  const handleExpandAll = () => {
    const allNodeIds = new Set<string>();
    mockData.forEach(region => {
      allNodeIds.add(region.id);
      region.countries.forEach(country => {
        allNodeIds.add(country.id);
        country.projects.forEach(project => {
          allNodeIds.add(project.id);
          project.subProjects.forEach(subProject => {
            allNodeIds.add(subProject.id);
          });
        });
      });
    });
    setExpandedNodes(allNodeIds);
  };

  const handleCollapseAll = () => {
    setExpandedNodes(new Set());
  };

  if (!selectedProject) {
    return <div className="p-8 text-center text-gray-500">Select a project from the hierarchy to view details.</div>
  }

  return (
    <motion.div
      className="space-y-8 p-6 bg-gray-50 dark:bg-gray-900 min-h-screen"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants} className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Regions & Projects</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Navigate project hierarchy and view detailed status reports.</p>
        </div>
        <div className="flex space-x-2">
          <button className="px-5 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-xl hover:bg-blue-700 flex items-center shadow-sm hover:shadow-md transition-all">
            <PlusIcon size={18} className="mr-2" />
            Add Project
          </button>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <motion.div variants={itemVariants} className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm h-full">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">Hierarchy</h2>
              <div className="flex space-x-3">
                <button className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-xs font-semibold" onClick={handleExpandAll}>
                  Expand All
                </button>
                <button className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-xs font-semibold" onClick={handleCollapseAll}>
                  Collapse All
                </button>
              </div>
            </div>
            <div className="relative mb-6">
              <input
                type="text"
                placeholder="Search projects..."
                className="pl-10 pr-4 py-2.5 border border-gray-200 dark:border-gray-600 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm bg-gray-50 dark:bg-gray-700/50 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <SearchIcon size={16} className="absolute left-3.5 top-3 text-gray-400 dark:text-gray-500" />
            </div>
            <div className="max-h-[calc(100vh-320px)] overflow-y-auto pr-2 custom-scrollbar">
              <ProjectTree
                data={mockData}
                onProjectSelect={handleProjectSelect}
                selectedProjectId={selectedProjectId}
                expandedNodes={expandedNodes}
                setExpandedNodes={setExpandedNodes}
                searchTerm={searchTerm}
              />
            </div>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="lg:col-span-3">
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden min-h-[600px]">
            <div className="flex border-b border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-700/30 p-2 gap-2 overflow-x-auto remove-scrollbar">
              <TabButton label="Overview" tabKey="overview" activeTab={activeTab} setActiveTab={setActiveTab} />
              <TabButton label="Contracts" tabKey="contracts" activeTab={activeTab} setActiveTab={setActiveTab} />
              <TabButton label="Obligations" tabKey="obligations" activeTab={activeTab} setActiveTab={setActiveTab} />
              <TabButton label="Risks" tabKey="risks" activeTab={activeTab} setActiveTab={setActiveTab} />
              <TabButton label="Disputes" tabKey="disputes" activeTab={activeTab} setActiveTab={setActiveTab} />
            </div>
            <div className="p-8">
              {activeTab === 'overview' && <ProjectOverview project={selectedProject} />}
              {activeTab === 'contracts' && <ProjectContracts contracts={selectedProject.subProjects.flatMap(sp => sp.contracts)} />}
              {activeTab === 'obligations' && <ProjectObligations obligations={selectedProject.obligations} />}
              {activeTab === 'risks' && <ProjectRisks risks={selectedProject.risks} />}
              {activeTab === 'disputes' && <ProjectDisputes disputes={selectedProject.disputes} />}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

interface TabButtonProps {
  label: string;
  tabKey: string;
  activeTab: string;
  setActiveTab: (tabKey: string) => void;
}

const TabButton: React.FC<TabButtonProps> = ({ label, tabKey, activeTab, setActiveTab }) => (
  <button
    className={`px-5 py-2 text-sm font-medium rounded-xl whitespace-nowrap transition-all ${activeTab === tabKey ? 'bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 shadow-sm ring-1 ring-gray-100 dark:ring-gray-700' : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700'}`}
    onClick={() => setActiveTab(tabKey)}
  >
    {label}
  </button>
);

interface ProjectTreeProps {
  data: Region[];
  onProjectSelect: (projectId: string, projectName: string, region: string, country: string) => void;
  selectedProjectId: string;
  expandedNodes: Set<string>;
  setExpandedNodes: React.Dispatch<React.SetStateAction<Set<string>>>;
  searchTerm: string;
}

function ProjectTree({ data, onProjectSelect, selectedProjectId, expandedNodes, setExpandedNodes, searchTerm }: ProjectTreeProps) {
  const filterTree = (nodes: any[], term: string) => {
    if (!term) return nodes;

    return nodes.filter(node => {
      const matches = node.name.toLowerCase().includes(term.toLowerCase());
      if (matches) return true;

      if (node.countries) {
        node.countries = filterTree(node.countries, term);
        if (node.countries.length > 0) return true;
      }
      if (node.projects) {
        node.projects = filterTree(node.projects, term);
        if (node.projects.length > 0) return true;
      }
      if (node.subProjects) {
        node.subProjects = filterTree(node.subProjects, term);
        if (node.subProjects.length > 0) return true;
      }
      if (node.contracts) {
        node.contracts = filterTree(node.contracts, term);
        if (node.contracts.length > 0) return true;
      }
      return false;
    });
  };

  const filteredData = useMemo(() => filterTree(JSON.parse(JSON.stringify(data)), searchTerm), [data, searchTerm]);

  const toggleExpand = (id: string) => {
    setExpandedNodes(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const renderTreeNodes = (nodes: any[], level: number) => {
    return nodes.map(node => {
      const isExpanded = expandedNodes.has(node.id);
      const isActive = node.id === selectedProjectId;
      let icon = null;
      let children = null;
      let isLeaf = false;

      if (node.countries) {
        icon = <GlobeIcon size={16} className="text-blue-500" />;
        children = renderTreeNodes(node.countries, level + 1);
      } else if (node.projects) {
        icon = <MapPinIcon size={16} className="text-emerald-500" />;
        children = renderTreeNodes(node.projects, level + 1);
      } else if (node.subProjects) {
        icon = <BuildingIcon size={16} className="text-purple-500" />;
        children = renderTreeNodes(node.subProjects, level + 1);
      } else if (node.contracts) {
        icon = <FolderIcon size={16} className="text-amber-500" />;
        children = renderTreeNodes(node.contracts, level + 1);
      } else {
        icon = <FileTextIcon size={16} className="text-gray-400" />;
        isLeaf = true;
      }

      return (
        <TreeNode
          key={node.id}
          label={node.name}
          icon={icon}
          level={level}
          isLeaf={isLeaf}
          active={isActive}
          isExpanded={isExpanded}
          onClick={() => {
            if (node.projects || node.subProjects || node.contracts) { // Only projects and subprojects are selectable
              onProjectSelect(node.id, node.name, node.region, node.country);
            }
            toggleExpand(node.id);
          }}
        >
          {children}
        </TreeNode>
      );
    });
  };

  return <div className="space-y-1 py-2">{renderTreeNodes(filteredData, 0)}</div>
}

interface TreeNodeProps {
  label: string;
  icon?: React.ReactNode;
  children?: React.ReactNode;
  level?: number;
  active?: boolean;
  isLeaf?: boolean;
  isExpanded: boolean;
  onClick: () => void;
}

function TreeNode({ label, icon, children, level = 0, active = false, isLeaf = false, isExpanded, onClick }: TreeNodeProps) {
  return (
    <div>
      <div
        className={`flex items-center py-2 px-3 rounded-xl text-sm transition-colors ${active ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-medium' : 'hover:bg-gray-50 dark:hover:bg-gray-700/50 text-gray-700 dark:text-gray-300'} cursor-pointer`}
        onClick={onClick}
        style={{ paddingLeft: `${level * 16 + 12}px` }}
      >
        {!isLeaf && children ? (
          isExpanded ? (
            <ChevronDownIcon size={14} className="text-gray-400 dark:text-gray-500 mr-2 flex-shrink-0" />
          ) : (
            <ChevronRightIcon size={14} className="text-gray-400 dark:text-gray-500 mr-2 flex-shrink-0" />
          )
        ) : (
          <span className="w-3.5 mr-2"></span>
        )}
        {icon && <span className="mr-2.5 flex-shrink-0 opacity-80">{icon}</span>}
        <span className="truncate">{label}</span>
      </div>
      {isExpanded && children && <div>{children}</div>}
    </div>
  );
}

interface ProjectOverviewProps {
  project: Project;
}

function ProjectOverview({ project }: ProjectOverviewProps) {
  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="flex items-start">
        <div className="h-16 w-16 rounded-2xl bg-purple-50 dark:bg-purple-900/30 border border-purple-100 dark:border-purple-800 flex items-center justify-center shadow-sm">
          <BuildingIcon size={32} className="text-purple-600 dark:text-purple-400" />
        </div>
        <div className="ml-5">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
            {project.name}
          </h2>
          <div className="flex items-center mt-1 text-sm text-gray-500 dark:text-gray-400">
            <span className="flex items-center"><GlobeIcon size={14} className="mr-1" /> {project.region}</span>
            <span className="mx-2">•</span>
            <span className="flex items-center"><MapPinIcon size={14} className="mr-1" /> {project.country}</span>
          </div>
          <div className="mt-3 flex items-center space-x-3">
            <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${project.status === 'Active' ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-100 text-gray-800'}`}>
              {project.status}
            </span>
            <span className="text-xs text-gray-500 border-l border-gray-200 pl-3">Started: {project.startDate}</span>
            <span className="text-xs text-gray-500 border-l border-gray-200 pl-3">
              Completion: {project.completionDate}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex justify-between mb-3">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Contract Value
            </h3>
            <span className="text-xs px-2 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-lg font-medium">
              {project.currency}
            </span>
          </div>
          <p className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">${project.contractValue}M</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{project.activeContracts} active contracts</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">Completion</h3>
          <div className="flex items-center mb-2">
            <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-2">
              <div className="bg-blue-600 dark:bg-blue-500 h-2 rounded-full transition-all duration-1000" style={{ width: `${project.completionPercentage}%` }}></div>
            </div>
            <span className="ml-3 text-sm font-bold text-gray-900 dark:text-white">{project.completionPercentage}%</span>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400">{project.completionStatus}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">Risk Level</h3>
          <div className="flex items-center">
            <div className={`w-10 h-10 rounded-xl ${project.riskText === 'High' ? 'bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400' : project.riskText === 'Medium' ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400' : 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400'} flex items-center justify-center text-sm font-bold mr-3`}>
              {project.riskLevel}
            </div>
            <div>
              <span className={`block text-sm font-bold ${project.riskText === 'High' ? 'text-rose-700 dark:text-rose-400' : project.riskText === 'Medium' ? 'text-amber-700 dark:text-amber-400' : 'text-emerald-700 dark:text-emerald-400'}`}>{project.riskText}</span>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{project.highRiskItems} high risk items</p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
            Pending Actions
          </h3>
          <p className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">{project.pendingActions}</p>
          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-3 pt-3 border-t border-gray-50 dark:border-gray-700">
            <span>{project.obligationsCount} obs</span>
            <span>{project.approvalsCount} appr</span>
            <span>{project.reviewsCount} rev</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm">
          <h3 className="text-base font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <FolderIcon size={18} className="mr-2 text-gray-400" />
            Sub-Projects
          </h3>
          <div className="space-y-3">
            {project.subProjects.length > 0 ? (
              project.subProjects.map(subProject => (
                <div key={subProject.id} className="flex items-center justify-between p-4 border border-gray-100 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors group cursor-pointer">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-900/30 flex items-center justify-center group-hover:bg-amber-100 dark:group-hover:bg-amber-900/50 transition-colors">
                      <FolderIcon size={20} className="text-amber-600 dark:text-amber-400" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">
                        {subProject.name}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{subProject.contractCount} contracts • ${subProject.value}M</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <span className={`text-xs px-2.5 py-1 rounded-full mr-3 font-medium ${subProject.status === 'On Track' ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-300' : subProject.status === 'Delayed' ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300' : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300'}`}>
                      {subProject.status}
                    </span>
                    <ChevronRightIcon size={16} className="text-gray-300 group-hover:text-gray-500 dark:group-hover:text-gray-400 transition-colors" />
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500 dark:text-gray-400 italic">No sub-projects found.</p>
            )}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm">
          <h3 className="text-base font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <BuildingIcon size={18} className="mr-2 text-gray-400" />
            Project Team
          </h3>
          <div className="space-y-3">
            {project.team.length > 0 ? (
              project.team.map(member => (
                <div key={member.id} className="flex items-center justify-between p-2">
                  <div className="flex items-center">
                    <div className={`w-10 h-10 rounded-full ${member.color} flex items-center justify-center text-white text-sm font-bold shadow-sm ring-2 ring-white dark:ring-gray-700`}>
                      {member.initials}
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">
                        {member.name}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{member.role}</p>
                    </div>
                  </div>
                  <button className="text-xs text-blue-600 dark:text-blue-400 font-medium hover:text-blue-800 dark:hover:text-blue-300 bg-blue-50 dark:bg-blue-900/20 px-3 py-1.5 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors">
                    Contact
                  </button>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500 dark:text-gray-400 italic">No team members found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

interface ProjectContractsProps {
  contracts: Contract[];
}

function ProjectContracts({ contracts }: ProjectContractsProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All'); // 'All', 'Active', 'Review', 'Draft', 'Completed'
  const [filterRisk, setFilterRisk] = useState('All'); // 'All', 'Low', 'Medium', 'High'

  const filteredContracts = useMemo(() => {
    return contracts.filter(contract => {
      const matchesSearch = contract.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contract.code.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = filterStatus === 'All' || contract.status === filterStatus;
      const matchesRisk = filterRisk === 'All' || contract.riskScore === filterRisk;
      return matchesSearch && matchesStatus && matchesRisk;
    });
  }, [contracts, searchTerm, filterStatus, filterRisk]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-800 dark:text-white">Project Contracts</h3>
        <div className="flex items-center space-x-2">
          <div className="relative">
            <input
              type="text"
              placeholder="Search contracts..."
              className="pl-9 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <SearchIcon size={16} className="absolute left-3 top-2.5 text-gray-400 dark:text-gray-500" />
          </div>
          <div className="relative">
            <select
              className="p-2 text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-100 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-sm"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="All">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Review">Review</option>
              <option value="Draft">Draft</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
          <div className="relative">
            <select
              className="p-2 text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-100 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-sm"
              value={filterRisk}
              onChange={(e) => setFilterRisk(e.target.value)}
            >
              <option value="All">All Risks</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredContracts.length > 0 ? (
          filteredContracts.map(contract => (
            <div key={contract.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow bg-white dark:bg-gray-800">
              <div className="flex items-start justify-between">
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                    <FileTextIcon size={20} className="text-green-600 dark:text-green-400" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                      {contract.name}
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {contract.code} • {contract.type}
                    </p>
                  </div>
                </div>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${contract.status === 'Active' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' : contract.status === 'Review' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' : contract.status === 'Draft' ? 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300' : 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300'}`}>
                  {contract.status}
                </span>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-2 text-center">
                <div className="p-2 bg-gray-50 dark:bg-gray-700/50 rounded">
                  <p className="text-xs text-gray-500 dark:text-gray-400">Value</p>
                  <p className="text-sm font-medium text-gray-800 dark:text-gray-200">${contract.value}M</p>
                </div>
                <div className="p-2 bg-gray-50 dark:bg-gray-700/50 rounded">
                  <p className="text-xs text-gray-500 dark:text-gray-400">Risk Score</p>
                  <p className={`text-sm font-medium ${contract.riskScore === 'High' ? 'text-red-600 dark:text-red-400' : contract.riskScore === 'Medium' ? 'text-amber-600 dark:text-amber-400' : 'text-green-600 dark:text-green-400'}`}>{contract.riskScore}</p>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-500 dark:text-gray-400">Activated: {contract.activatedDate}</span>
                  <button className="text-blue-600 dark:text-blue-400 font-medium">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-sm text-gray-500 dark:text-gray-400 col-span-full">No contracts found for the selected filters.</p>
        )}
      </div>

      <div className="flex justify-center mt-6">
        <button className="px-4 py-2 text-sm font-medium text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-900/20 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/40 flex items-center">
          <PlusIcon size={16} className="mr-2" />
          Add New Contract
        </button>
      </div>
    </div>
  );
}

interface ProjectObligationsProps {
  obligations: Obligation[];
}

function ProjectObligations({ obligations }: ProjectObligationsProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All'); // 'All', 'Open', 'Closed', 'Overdue'

  const filteredObligations = useMemo(() => {
    return obligations.filter(obligation => {
      const matchesSearch = obligation.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = filterStatus === 'All' || obligation.status === filterStatus;
      return matchesSearch && matchesStatus;
    });
  }, [obligations, searchTerm, filterStatus]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-800 dark:text-white">Project Obligations</h3>
        <div className="flex items-center space-x-2">
          <div className="relative">
            <input
              type="text"
              placeholder="Search obligations..."
              className="pl-9 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <SearchIcon size={16} className="absolute left-3 top-2.5 text-gray-400 dark:text-gray-500" />
          </div>
          <div className="relative">
            <select
              className="p-2 text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-100 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-sm"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="All">All Statuses</option>
              <option value="Open">Open</option>
              <option value="Closed">Closed</option>
              <option value="Overdue">Overdue</option>
            </select>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {filteredObligations.length > 0 ? (
          filteredObligations.map(obligation => (
            <div key={obligation.id} className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 bg-white dark:bg-gray-800">
              <div className="flex items-center">
                <div className={`w-8 h-8 rounded-full ${obligation.status === 'Overdue' ? 'bg-red-100 dark:bg-red-900/30' : obligation.status === 'Open' ? 'bg-blue-100 dark:bg-blue-900/30' : 'bg-green-100 dark:bg-green-900/30'} flex items-center justify-center`}>
                  {obligation.status === 'Overdue' ? <AlertTriangleIcon size={16} className="text-red-600 dark:text-red-400" /> : obligation.status === 'Open' ? <ClockIcon size={16} className="text-blue-600 dark:text-blue-400" /> : <CheckCircleIcon size={16} className="text-green-600 dark:text-green-400" />}
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-800 dark:text-white">{obligation.description}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Due: {obligation.dueDate}</p>
                </div>
              </div>
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${obligation.status === 'Overdue' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300' : obligation.status === 'Open' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' : 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'}`}>
                {obligation.status}
              </span>
            </div>
          ))
        ) : (
          <p className="text-sm text-gray-500 dark:text-gray-400">No obligations found for the selected filters.</p>
        )}
      </div>
    </div>
  );
}

interface ProjectRisksProps {
  risks: Risk[];
}

function ProjectRisks({ risks }: ProjectRisksProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSeverity, setFilterSeverity] = useState('All'); // 'All', 'Low', 'Medium', 'High'
  const [filterStatus, setFilterStatus] = useState('All'); // 'All', 'Open', 'Mitigated', 'Closed'

  const filteredRisks = useMemo(() => {
    return risks.filter(risk => {
      const matchesSearch = risk.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesSeverity = filterSeverity === 'All' || risk.severity === filterSeverity;
      const matchesStatus = filterStatus === 'All' || risk.status === filterStatus;
      return matchesSearch && matchesSeverity && matchesStatus;
    });
  }, [risks, searchTerm, filterSeverity, filterStatus]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-800 dark:text-white">Project Risks</h3>
        <div className="flex items-center space-x-2">
          <div className="relative">
            <input
              type="text"
              placeholder="Search risks..."
              className="pl-9 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <SearchIcon size={16} className="absolute left-3 top-2.5 text-gray-400 dark:text-gray-500" />
          </div>
          <div className="relative">
            <select
              className="p-2 text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-100 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-sm"
              value={filterSeverity}
              onChange={(e) => setFilterSeverity(e.target.value)}
            >
              <option value="All">All Severities</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
          <div className="relative">
            <select
              className="p-2 text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-100 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-sm"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="All">All Statuses</option>
              <option value="Open">Open</option>
              <option value="Mitigated">Mitigated</option>
              <option value="Closed">Closed</option>
            </select>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {filteredRisks.length > 0 ? (
          filteredRisks.map(risk => (
            <div key={risk.id} className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 bg-white dark:bg-gray-800">
              <div className="flex items-center">
                <div className={`w-8 h-8 rounded-full ${risk.severity === 'High' ? 'bg-red-100 dark:bg-red-900/30' : risk.severity === 'Medium' ? 'bg-amber-100 dark:bg-amber-900/30' : 'bg-green-100 dark:bg-green-900/30'} flex items-center justify-center`}>
                  {risk.severity === 'High' ? <AlertTriangleIcon size={16} className="text-red-600 dark:text-red-400" /> : risk.severity === 'Medium' ? <AlertTriangleIcon size={16} className="text-amber-600 dark:text-amber-400" /> : <CheckCircleIcon size={16} className="text-green-600 dark:text-green-400" />}
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-800 dark:text-white">{risk.description}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Severity: {risk.severity}</p>
                </div>
              </div>
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${risk.status === 'Open' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' : risk.status === 'Mitigated' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'}`}>
                {risk.status}
              </span>
            </div>
          ))
        ) : (
          <p className="text-sm text-gray-500 dark:text-gray-400">No risks found for the selected filters.</p>
        )}
      </div>
    </div>
  );
}

interface ProjectDisputesProps {
  disputes: Dispute[];
}

function ProjectDisputes({ disputes }: ProjectDisputesProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All'); // 'All', 'Open', 'Resolved', 'Escalated'

  const filteredDisputes = useMemo(() => {
    return disputes.filter(dispute => {
      const matchesSearch = dispute.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = filterStatus === 'All' || dispute.status === filterStatus;
      return matchesSearch && matchesStatus;
    });
  }, [disputes, searchTerm, filterStatus]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-800 dark:text-white">Project Disputes</h3>
        <div className="flex items-center space-x-2">
          <div className="relative">
            <input
              type="text"
              placeholder="Search disputes..."
              className="pl-9 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <SearchIcon size={16} className="absolute left-3 top-2.5 text-gray-400 dark:text-gray-500" />
          </div>
          <div className="relative">
            <select
              className="p-2 text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-100 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-sm"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="All">All Statuses</option>
              <option value="Open">Open</option>
              <option value="Resolved">Resolved</option>
              <option value="Escalated">Escalated</option>
            </select>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {filteredDisputes.length > 0 ? (
          filteredDisputes.map(dispute => (
            <div key={dispute.id} className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 bg-white dark:bg-gray-800">
              <div className="flex items-center">
                <div className={`w-8 h-8 rounded-full ${dispute.status === 'Escalated' ? 'bg-red-100 dark:bg-red-900/30' : dispute.status === 'Open' ? 'bg-blue-100 dark:bg-blue-900/30' : 'bg-green-100 dark:bg-green-900/30'} flex items-center justify-center`}>
                  {dispute.status === 'Escalated' ? <AlertTriangleIcon size={16} className="text-red-600 dark:text-red-400" /> : dispute.status === 'Open' ? <ClockIcon size={16} className="text-blue-600 dark:text-blue-400" /> : <CheckCircleIcon size={16} className="text-green-600 dark:text-green-400" />}
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-800 dark:text-white">{dispute.description}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Status: {dispute.status}</p>
                </div>
              </div>
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${dispute.status === 'Escalated' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300' : dispute.status === 'Open' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' : 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'}`}>
                {dispute.status}
              </span>
            </div>
          ))
        ) : (
          <p className="text-sm text-gray-500 dark:text-gray-400">No disputes found for the selected filters.</p>
        )}
      </div>
    </div>
  );
}