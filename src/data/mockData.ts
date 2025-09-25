export interface Approver extends TeamMember {
  status: 'approved' | 'pending' | 'rejected';
  comment: string;
}

export interface ContractDraft {
  id: string;
  version: string;
  date: string;
  status: 'Draft' | 'In Review' | 'Approved' | 'Rejected';
  approvers?: Approver[];
  isContractorDraft: boolean;
}

export interface Contract {
  id: string;
  name: string;
  code: string;
  type: string;
  value: number;
  currency: string;
  riskScore: 'Low' | 'Medium' | 'High';
  status: 'Active' | 'Review' | 'Draft' | 'Completed';
  activatedDate: string;
  lastUpdated: string;
  subProjectId: string;
  drafts?: ContractDraft[];
}

export interface Obligation {
  id: string;
  description: string;
  dueDate: string;
  status: 'Open' | 'Closed' | 'Overdue';
  projectId: string;
  type: 'Payment' | 'Delivery' | 'Testing' | 'Legal' | 'Other';
  clauseReference: string;
  assignedTo: string; // TeamMember name
}

export interface Risk {
  id: string;
  description: string;
  severity: 'Low' | 'Medium' | 'High';
  status: 'Open' | 'Mitigated' | 'Closed';
  projectId: string;
  impact: string;
  mitigationPlan: string;
  owner: string; // TeamMember name
}

export interface Dispute {
  id: string;
  description: string;
  status: 'Open' | 'Resolved' | 'Escalated';
  projectId: string;
  type: 'Time Extension' | 'Cost Claim' | 'Quality Issue' | 'Other';
  dateRaised: string;
  clauseReference: string;
  statusHistory?: { status: string; date: string; }[];
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  initials: string;
  color: string;
}

export interface SubProject {
  id: string;
  name: string;
  contractCount: number;
  value: number;
  status: 'On Track' | 'Delayed' | 'Completed';
  contracts: Contract[];
}

export interface ComplianceItem {
    id: string;
    requirement: string;
    category: 'Health & Safety' | 'Quality Assurance' | 'Environmental' | 'Regulatory';
    status: 'Compliant' | 'Non-Compliant' | 'Pending Review';
    lastUpdated: string;
    clauseReference: string;
}

export interface Project {
  id: string;
  name: string;
  region: string;
  country: string;
  status: 'Active' | 'Completed' | 'On Hold';
  startDate: string;
  completionDate: string;
  contractValue: number;
  currency: string;
  activeContracts: number;
  completionPercentage: number;
  completionStatus: 'On schedule' | 'Delayed';
  riskLevel: number;
  riskText: 'Low' | 'Medium' | 'High';
  highRiskItems: number;
  pendingActions: number;
  obligationsCount: number;
  approvalsCount: number;
  reviewsCount: number;
  subProjects: SubProject[];
  team: TeamMember[];
  obligations: Obligation[];
  risks: Risk[];
  disputes: Dispute[];
  compliance?: ComplianceItem[];
}

export interface Country {
  id: string;
  name: string;
  projects: Project[];
}

export interface Region {
  id: string;
  name: string;
  countries: Country[];
}

export const mockData: Region[] = [
  {
    id: 'region-me',
    name: 'Middle East',
    countries: [
      {
        id: 'country-egypt',
        name: 'Egypt',
        projects: [
          {
            id: 'project-1',
            name: 'Cairo Metro Line 3',
            region: 'Middle East',
            country: 'Egypt',
            status: 'Active',
            startDate: 'Jan 15, 2022',
            completionDate: 'Dec 31, 2025',
            contractValue: 120,
            currency: 'USD',
            activeContracts: 3,
            completionPercentage: 45,
            completionStatus: 'On schedule',
            riskLevel: 6.4,
            riskText: 'Medium',
            highRiskItems: 25,
            pendingActions: 18,
            obligationsCount: 8,
            approvalsCount: 5,
            reviewsCount: 5,
            subProjects: [
              {
                id: 'subproject-1-1',
                name: 'Electrical Systems',
                contractCount: 2,
                value: 45,
                status: 'On Track',
                contracts: [
                  {
                    id: 'contract-1-1-1',
                    name: 'Siemens Electrical Systems',
                    code: 'CTR-2023-001',
                    type: 'Electrical Systems',
                    value: 28.5,
                    currency: 'USD',
                    riskScore: 'High',
                    status: 'Active',
                    activatedDate: '3 months ago',
                    lastUpdated: '2 days ago',
                    subProjectId: 'subproject-1-1',
                    drafts: [
                      {
                        id: 'd1',
                        version: 'v1',
                        date: '2025-08-15',
                        status: 'Approved',
                        isContractorDraft: false,
                        approvers: [
                          { id: 'tm-1', name: 'Ahmed Hassan', role: 'Legal Director', initials: 'AH', color: 'bg-blue-600', status: 'approved', comment: 'Approved with minor comments on force majeure clause.' },
                          { id: 'tm-2', name: 'Fatima Al-Zahra', role: 'Project Manager', initials: 'FZ', color: 'bg-pink-600', status: 'approved', comment: 'Looks good to me.' },
                          { id: 'tm-3', name: 'Omar Khalid', role: 'Finance Director', initials: 'OK', color: 'bg-yellow-600', status: 'pending', comment: '' },
                          { id: 'tm-4', name: 'Layla Mahmoud', role: 'Risk Manager', initials: 'LM', color: 'bg-red-600', status: 'pending', comment: '' }
                        ]
                      }
                    ]
                  },
                  {
                    id: 'contract-1-1-2',
                    name: 'ABB Electrical Equipment',
                    code: 'CTR-2023-004',
                    type: 'Electrical Systems',
                    value: 16.5,
                    currency: 'USD',
                    riskScore: 'Medium',
                    status: 'Review',
                    activatedDate: '1 month ago',
                    lastUpdated: '1 day ago',
                    subProjectId: 'subproject-1-1',
                    drafts: [
                      { id: 'd3', version: 'v1', date: '2025-08-22', status: 'In Review', isContractorDraft: true, approvers: [] },
                    ]
                  },
                ],
              },
              {
                id: 'subproject-1-2',
                name: 'Civil Works',
                contractCount: 1,
                value: 75,
                status: 'Delayed',
                contracts: [
                  {
                    id: 'contract-1-2-1',
                    name: 'Orascom Civil Works',
                    code: 'CTR-2023-002',
                    type: 'Civil Works',
                    value: 75,
                    currency: 'USD',
                    riskScore: 'Medium',
                    status: 'Draft',
                    activatedDate: '6 months ago',
                    lastUpdated: '5 hours ago',
                    subProjectId: 'subproject-1-2',
                    drafts: []
                  },
                ],
              },
            ],
            team: [
              { id: 'tm-1', name: 'Ahmed Hassan', role: 'Project Manager', initials: 'AH', color: 'bg-blue-600' },
              { id: 'tm-2', name: 'Maria Schmidt', role: 'Legal Advisor', initials: 'MS', color: 'bg-green-600' },
              { id: 'tm-3', name: 'John Doe', role: 'Contract Administrator', initials: 'JD', color: 'bg-purple-600' },
            ],
            obligations: [
              { id: 'ob-1', description: 'Submit monthly progress report', dueDate: '2025-10-01', status: 'Open', projectId: 'project-1', type: 'Reporting', clauseReference: 'C-1.2', assignedTo: 'Ahmed Hassan' },
              { id: 'ob-2', description: 'Conduct safety audit', dueDate: '2025-09-20', status: 'Overdue', projectId: 'project-1', type: 'Compliance', clauseReference: 'C-5.5', assignedTo: 'Maria Schmidt' },
            ],
            risks: [
              { id: 'ri-1', description: 'Material supply chain disruption', severity: 'High', status: 'Open', projectId: 'project-1', impact: 'Delay in project completion', mitigationPlan: 'Source from alternative suppliers', owner: 'John Doe' },
              { id: 'ri-2', description: 'Labor shortage', severity: 'Medium', status: 'Mitigated', projectId: 'project-1', impact: 'Increased labor costs', mitigationPlan: 'Recruitment drive in new regions', owner: 'Ahmed Hassan' },
            ],
            disputes: [
              { id: 'di-1', description: 'Payment dispute with subcontractor X', status: 'Open', projectId: 'project-1', type: 'Cost Claim', dateRaised: '2025-08-28', clauseReference: 'C-14.7' },
            ],
            compliance: []
          },
          // ... other projects
        ],
      },
    ],
  },
];

export const findProjectById = (projectId: string): Project | undefined => {
  for (const region of mockData) {
    for (const country of region.countries) {
      const project = country.projects.find(p => p.id === projectId);
      if (project) {
        return project;
      }
    }
  }
  return undefined;
};