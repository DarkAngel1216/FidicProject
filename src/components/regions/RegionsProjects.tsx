import React, { useState, useMemo } from 'react';
import { GlobeIcon, MapPinIcon, BuildingIcon, FolderIcon, FileTextIcon, PlusIcon, ChevronDownIcon, ChevronRightIcon, SearchIcon, FilterIcon, AlertTriangleIcon, CheckCircleIcon, ClockIcon } from 'lucide-react';
import { mockData, findProjectById, Project, Region, Country, SubProject, Contract, Obligation, Risk, Dispute, TeamMember } from '../../data/mockData';

interface RegionsProjectsProps {
  onProjectSelect?: (projectId: string, projectName: string, region: string, country: string) => void;
}

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
    return <div className="p-4 text-center text-gray-500">Select a project from the hierarchy to view details.</div>
  }

  return (
    <div className="space-y-6 p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Regions & Projects</h1>
        <div className="flex space-x-2">
          <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 flex items-center">
            <PlusIcon size={16} className="mr-2" />
            Add Project
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium text-gray-800">Hierarchy</h2>
              <div className="flex space-x-2">
                <button className="text-blue-600 hover:text-blue-800 text-sm font-medium" onClick={handleExpandAll}>
                  Expand All
                </button>
                <button className="text-blue-600 hover:text-blue-800 text-sm font-medium" onClick={handleCollapseAll}>
                  Collapse All
                </button>
              </div>
            </div>
            <div className="relative mb-4">
              <input
                type="text"
                placeholder="Search projects..."
                className="pl-9 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <SearchIcon size={16} className="absolute left-3 top-2.5 text-gray-400" />
            </div>
            <div className="max-h-[calc(100vh-280px)] overflow-y-auto">
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
        </div>

        <div className="lg:col-span-3">
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
            <div className="flex border-b border-gray-200">
              <TabButton label="Overview" tabKey="overview" activeTab={activeTab} setActiveTab={setActiveTab} />
              <TabButton label="Contracts" tabKey="contracts" activeTab={activeTab} setActiveTab={setActiveTab} />
              <TabButton label="Obligations" tabKey="obligations" activeTab={activeTab} setActiveTab={setActiveTab} />
              <TabButton label="Risks" tabKey="risks" activeTab={activeTab} setActiveTab={setActiveTab} />
              <TabButton label="Disputes" tabKey="disputes" activeTab={activeTab} setActiveTab={setActiveTab} />
            </div>
            <div className="p-4">
              {activeTab === 'overview' && <ProjectOverview project={selectedProject} />}
              {activeTab === 'contracts' && <ProjectContracts contracts={selectedProject.subProjects.flatMap(sp => sp.contracts)} />}
              {activeTab === 'obligations' && <ProjectObligations obligations={selectedProject.obligations} />}
              {activeTab === 'risks' && <ProjectRisks risks={selectedProject.risks} />}
              {activeTab === 'disputes' && <ProjectDisputes disputes={selectedProject.disputes} />}
            </div>
          </div>
        </div>
      </div>
    </div>
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
    className={`px-4 py-3 text-sm font-medium ${activeTab === tabKey ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
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
        icon = <GlobeIcon size={16} className="text-blue-600" />;
        children = renderTreeNodes(node.countries, level + 1);
      } else if (node.projects) {
        icon = <MapPinIcon size={16} className="text-green-600" />;
        children = renderTreeNodes(node.projects, level + 1);
      } else if (node.subProjects) {
        icon = <BuildingIcon size={16} className="text-purple-600" />;
        children = renderTreeNodes(node.subProjects, level + 1);
      } else if (node.contracts) {
        icon = <FolderIcon size={16} className="text-amber-600" />;
        children = renderTreeNodes(node.contracts, level + 1);
      } else {
        icon = <FileTextIcon size={16} className="text-gray-600" />;
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

  return <div className="space-y-1">{renderTreeNodes(filteredData, 0)}</div>
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
        className={`flex items-center py-1.5 px-2 rounded text-sm ${active ? 'bg-blue-50 text-blue-700' : 'hover:bg-gray-50 text-gray-700'} cursor-pointer`}
        onClick={onClick}
        style={{ paddingLeft: `${level * 12 + 8}px` }}
      >
        {!isLeaf && children ? (
          isExpanded ? (
            <ChevronDownIcon size={14} className="text-gray-400 mr-1.5 flex-shrink-0" />
          ) : (
            <ChevronRightIcon size={14} className="text-gray-400 mr-1.5 flex-shrink-0" />
          )
        ) : (
          <span className="w-3.5 mr-1.5"></span>
        )}
        {icon && <span className="mr-2 flex-shrink-0">{icon}</span>}
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
    <div className="space-y-6">
      <div className="flex items-start">
        <div className="h-12 w-12 rounded-lg bg-purple-100 flex items-center justify-center">
          <BuildingIcon size={24} className="text-purple-600" />
        </div>
        <div className="ml-4">
          <h2 className="text-xl font-bold text-gray-800">
            {project.name}
          </h2>
          <p className="text-sm text-gray-500">{project.country} • {project.region}</p>
          <div className="mt-2 flex items-center space-x-4">
            <span className={`text-xs px-2 py-1 rounded-full ${project.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
              {project.status}
            </span>
            <span className="text-xs text-gray-500">Started: {project.startDate}</span>
            <span className="text-xs text-gray-500">
              Completion: {project.completionDate}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-700">
              Contract Value
            </h3>
            <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
              {project.currency}
            </span>
          </div>
          <p className="text-2xl font-bold text-gray-900">${project.contractValue}M</p>
          <p className="text-xs text-gray-500 mt-1">{project.activeContracts} active contracts</p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
          <h3 className="text-sm font-medium text-gray-700 mb-2">Completion</h3>
          <div className="flex items-center">
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${project.completionPercentage}%` }}></div>
            </div>
            <span className="ml-2 text-sm font-medium text-gray-700">{project.completionPercentage}%</span>
          </div>
          <p className="text-xs text-gray-500 mt-2">{project.completionStatus}</p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
          <h3 className="text-sm font-medium text-gray-700 mb-2">Risk Level</h3>
          <div className="flex items-center">
            <div className={`w-8 h-8 rounded-full ${project.riskText === 'High' ? 'bg-red-500' : project.riskText === 'Medium' ? 'bg-amber-500' : 'bg-green-500'} flex items-center justify-center text-white text-sm font-medium mr-2`}>
              {project.riskLevel}
            </div>
            <span className={`text-sm font-medium ${project.riskText === 'High' ? 'text-red-800' : project.riskText === 'Medium' ? 'text-amber-800' : 'text-green-800'}`}>{project.riskText}</span>
          </div>
          <p className="text-xs text-gray-500 mt-2">{project.highRiskItems} high risk items</p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
          <h3 className="text-sm font-medium text-gray-700 mb-2">
            Pending Actions
          </h3>
          <p className="text-2xl font-bold text-gray-900">{project.pendingActions}</p>
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>{project.obligationsCount} obligations</span>
            <span>{project.approvalsCount} approvals</span>
            <span>{project.reviewsCount} reviews</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
          <h3 className="text-sm font-medium text-gray-700 mb-4">
            Sub-Projects
          </h3>
          <div className="space-y-3">
            {project.subProjects.length > 0 ? (
              project.subProjects.map(subProject => (
                <div key={subProject.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center">
                      <FolderIcon size={16} className="text-amber-600" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-800">
                        {subProject.name}
                      </p>
                      <p className="text-xs text-gray-500">{subProject.contractCount} contracts • ${subProject.value}M</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <span className={`text-xs px-2 py-1 rounded-full mr-2 ${subProject.status === 'On Track' ? 'bg-green-100 text-green-800' : subProject.status === 'Delayed' ? 'bg-amber-100 text-amber-800' : 'bg-gray-100 text-gray-800'}`}>
                      {subProject.status}
                    </span>
                    <ChevronRightIcon size={16} className="text-gray-400" />
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500">No sub-projects found.</p>
            )}
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
          <h3 className="text-sm font-medium text-gray-700 mb-4">
            Project Team
          </h3>
          <div className="space-y-3">
            {project.team.length > 0 ? (
              project.team.map(member => (
                <div key={member.id} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className={`w-8 h-8 rounded-full ${member.color} flex items-center justify-center text-white text-sm font-medium`}>
                      {member.initials}
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-800">
                        {member.name}
                      </p>
                      <p className="text-xs text-gray-500">{member.role}</p>
                    </div>
                  </div>
                  <button className="text-xs text-blue-600 font-medium">
                    Contact
                  </button>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500">No team members found.</p>
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
        <h3 className="text-lg font-medium text-gray-800">Project Contracts</h3>
        <div className="flex items-center space-x-2">
          <div className="relative">
            <input
              type="text"
              placeholder="Search contracts..."
              className="pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <SearchIcon size={16} className="absolute left-3 top-2.5 text-gray-400" />
          </div>
          <div className="relative">
            <select
              className="p-2 text-gray-500 hover:text-gray-700 border border-gray-300 rounded-lg bg-white text-sm"
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
              className="p-2 text-gray-500 hover:text-gray-700 border border-gray-300 rounded-lg bg-white text-sm"
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
            <div key={contract.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                    <FileTextIcon size={20} className="text-green-600" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-gray-900">
                      {contract.name}
                    </h3>
                    <p className="text-xs text-gray-500">
                      {contract.code} • {contract.type}
                    </p>
                  </div>
                </div>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${contract.status === 'Active' ? 'bg-green-100 text-green-800' : contract.status === 'Review' ? 'bg-blue-100 text-blue-800' : contract.status === 'Draft' ? 'bg-gray-100 text-gray-800' : 'bg-purple-100 text-purple-800'}`}>
                  {contract.status}
                </span>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-2 text-center">
                <div className="p-2 bg-gray-50 rounded">
                  <p className="text-xs text-gray-500">Value</p>
                  <p className="text-sm font-medium text-gray-800">${contract.value}M</p>
                </div>
                <div className="p-2 bg-gray-50 rounded">
                  <p className="text-xs text-gray-500">Risk Score</p>
                  <p className={`text-sm font-medium ${contract.riskScore === 'High' ? 'text-red-600' : contract.riskScore === 'Medium' ? 'text-amber-600' : 'text-green-600'}`}>{contract.riskScore}</p>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-500">Activated: {contract.activatedDate}</span>
                  <button className="text-blue-600 font-medium">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-sm text-gray-500 col-span-full">No contracts found for the selected filters.</p>
        )}
      </div>

      <div className="flex justify-center mt-6">
        <button className="px-4 py-2 text-sm font-medium text-blue-700 bg-blue-50 rounded-lg hover:bg-blue-100 flex items-center">
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
        <h3 className="text-lg font-medium text-gray-800">Project Obligations</h3>
        <div className="flex items-center space-x-2">
          <div className="relative">
            <input
              type="text"
              placeholder="Search obligations..."
              className="pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <SearchIcon size={16} className="absolute left-3 top-2.5 text-gray-400" />
          </div>
          <div className="relative">
            <select
              className="p-2 text-gray-500 hover:text-gray-700 border border-gray-300 rounded-lg bg-white text-sm"
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
            <div key={obligation.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
              <div className="flex items-center">
                <div className={`w-8 h-8 rounded-full ${obligation.status === 'Overdue' ? 'bg-red-100' : obligation.status === 'Open' ? 'bg-blue-100' : 'bg-green-100'} flex items-center justify-center`}>
                  {obligation.status === 'Overdue' ? <AlertTriangleIcon size={16} className="text-red-600" /> : obligation.status === 'Open' ? <ClockIcon size={16} className="text-blue-600" /> : <CheckCircleIcon size={16} className="text-green-600" />}
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-800">{obligation.description}</p>
                  <p className="text-xs text-gray-500">Due: {obligation.dueDate}</p>
                </div>
              </div>
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${obligation.status === 'Overdue' ? 'bg-red-100 text-red-800' : obligation.status === 'Open' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>
                {obligation.status}
              </span>
            </div>
          ))
        ) : (
          <p className="text-sm text-gray-500">No obligations found for the selected filters.</p>
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
        <h3 className="text-lg font-medium text-gray-800">Project Risks</h3>
        <div className="flex items-center space-x-2">
          <div className="relative">
            <input
              type="text"
              placeholder="Search risks..."
              className="pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <SearchIcon size={16} className="absolute left-3 top-2.5 text-gray-400" />
          </div>
          <div className="relative">
            <select
              className="p-2 text-gray-500 hover:text-gray-700 border border-gray-300 rounded-lg bg-white text-sm"
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
              className="p-2 text-gray-500 hover:text-gray-700 border border-gray-300 rounded-lg bg-white text-sm"
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
            <div key={risk.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
              <div className="flex items-center">
                <div className={`w-8 h-8 rounded-full ${risk.severity === 'High' ? 'bg-red-100' : risk.severity === 'Medium' ? 'bg-amber-100' : 'bg-green-100'} flex items-center justify-center`}>
                  {risk.severity === 'High' ? <AlertTriangleIcon size={16} className="text-red-600" /> : risk.severity === 'Medium' ? <AlertTriangleIcon size={16} className="text-amber-600" /> : <CheckCircleIcon size={16} className="text-green-600" />}
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-800">{risk.description}</p>
                  <p className="text-xs text-gray-500">Severity: {risk.severity}</p>
                </div>
              </div>
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${risk.status === 'Open' ? 'bg-blue-100 text-blue-800' : risk.status === 'Mitigated' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                {risk.status}
              </span>
            </div>
          ))
        ) : (
          <p className="text-sm text-gray-500">No risks found for the selected filters.</p>
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
        <h3 className="text-lg font-medium text-gray-800">Project Disputes</h3>
        <div className="flex items-center space-x-2">
          <div className="relative">
            <input
              type="text"
              placeholder="Search disputes..."
              className="pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <SearchIcon size={16} className="absolute left-3 top-2.5 text-gray-400" />
          </div>
          <div className="relative">
            <select
              className="p-2 text-gray-500 hover:text-gray-700 border border-gray-300 rounded-lg bg-white text-sm"
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
            <div key={dispute.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
              <div className="flex items-center">
                <div className={`w-8 h-8 rounded-full ${dispute.status === 'Escalated' ? 'bg-red-100' : dispute.status === 'Open' ? 'bg-blue-100' : 'bg-green-100'} flex items-center justify-center`}>
                  {dispute.status === 'Escalated' ? <AlertTriangleIcon size={16} className="text-red-600" /> : dispute.status === 'Open' ? <ClockIcon size={16} className="text-blue-600" /> : <CheckCircleIcon size={16} className="text-green-600" />}
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-800">{dispute.description}</p>
                  <p className="text-xs text-gray-500">Status: {dispute.status}</p>
                </div>
              </div>
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${dispute.status === 'Escalated' ? 'bg-red-100 text-red-800' : dispute.status === 'Open' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>
                {dispute.status}
              </span>
            </div>
          ))
        ) : (
          <p className="text-sm text-gray-500">No disputes found for the selected filters.</p>
        )}
      </div>
    </div>
  );
}