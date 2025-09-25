import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDownIcon, ChevronRightIcon, GlobeIcon, MapPinIcon, BuildingIcon, FolderIcon, FileTextIcon } from 'lucide-react';

interface TreeNodeProps {
  label: string;
  type: 'region' | 'country' | 'project' | 'subproject' | 'contract';
  children?: React.ReactNode;
  level: number;
  projectId?: string;
}

const TreeNode: React.FC<TreeNodeProps> = ({ label, type, children, level, projectId }) => {
  const [isOpen, setIsOpen] = useState(level < 2);

  const getIcon = () => {
    switch (type) {
      case 'region': return <GlobeIcon size={16} className="text-blue-600" />;
      case 'country': return <MapPinIcon size={16} className="text-green-600" />;
      case 'project': return <BuildingIcon size={16} className="text-purple-600" />;
      case 'subproject': return <FolderIcon size={16} className="text-amber-600" />;
      case 'contract': return <FileTextIcon size={16} className="text-gray-600" />;
    }
  };

  const nodeContent = (
    <div
      className={`flex items-center py-1 cursor-pointer hover:bg-blue-100 rounded px-1 ${type === 'project' ? 'hover:text-blue-600' : ''}`}
      onClick={() => setIsOpen(!isOpen)}
      style={{ paddingLeft: `${level * 12}px` }}
    >
      {children ? (
        isOpen ? <ChevronDownIcon size={14} className="text-gray-500 mr-1" /> : <ChevronRightIcon size={14} className="text-gray-500 mr-1" />
      ) : (
        <span className="w-3.5 mr-1"></span>
      )}
      <span className="mr-1.5">{getIcon()}</span>
      <span className="text-sm">{label}</span>
    </div>
  );

  return (
    <div>
      {type === 'project' && projectId ? (
        <Link to={`/project/${projectId}`}>{nodeContent}</Link>
      ) : (
        nodeContent
      )}
      {isOpen && children}
    </div>
  );
};

export function HierarchyTree() {
  return (
    <div className="max-h-80 overflow-y-auto">
      <TreeNode label="Middle East" type="region" level={0}>
        <TreeNode label="Egypt" type="country" level={1}>
          <TreeNode label="Cairo Metro Line 3" type="project" level={2} projectId="project-1">
            <TreeNode label="Electrical Systems" type="subproject" level={3}>
              <TreeNode label="Siemens Contract" type="contract" level={4} />
              <TreeNode label="ABB Contract" type="contract" level={4} />
            </TreeNode>
            <TreeNode label="Civil Works" type="subproject" level={3}>
              <TreeNode label="Orascom Contract" type="contract" level={4} />
            </TreeNode>
          </TreeNode>
          <TreeNode label="Alexandria Port Expansion" type="project" level={2} projectId="project-2" />
        </TreeNode>
        <TreeNode label="UAE" type="country" level={1}>
          <TreeNode label="Dubai Airport T3" type="project" level={2} projectId="project-3">
            <TreeNode label="HVAC System" type="subproject" level={3}>
              <TreeNode label="Carrier Contract" type="contract" level={4} />
            </TreeNode>
          </TreeNode>
        </TreeNode>
        <TreeNode label="Qatar" type="country" level={1}>
          <TreeNode label="Qatar Stadium" type="project" level={2} projectId="project-4" />
        </TreeNode>
      </TreeNode>
      <TreeNode label="Europe" type="region" level={0}>
        <TreeNode label="Germany" type="country" level={1} />
        <TreeNode label="France" type="country" level={1} />
      </TreeNode>
    </div>
  );
}
