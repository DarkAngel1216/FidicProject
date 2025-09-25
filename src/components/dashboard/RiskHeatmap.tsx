import React from 'react';
export function RiskHeatmap() {
  // Sample risk data for demonstration
  const riskCategories = ['Financial', 'Legal', 'Operational', 'Timeline', 'Compliance'];
  const projects = ['Cairo Metro Line 3', 'Dubai Airport T3', 'Riyadh Metro', 'Qatar Stadium'];
  const riskData = [
    {
      project: 'Cairo Metro Line 3',
      risks: [
        { category: 'Financial', score: 8 },
        { category: 'Legal', score: 4 },
        { category: 'Operational', score: 6 },
        { category: 'Timeline', score: 7 },
        { category: 'Compliance', score: 3 },
      ],
    },
    {
      project: 'Dubai Airport T3',
      risks: [
        { category: 'Financial', score: 4 },
        { category: 'Legal', score: 2 },
        { category: 'Operational', score: 3 },
        { category: 'Timeline', score: 5 },
        { category: 'Compliance', score: 2 },
      ],
    },
    {
      project: 'Riyadh Metro',
      risks: [
        { category: 'Financial', score: 7 },
        { category: 'Legal', score: 8 },
        { category: 'Operational', score: 9 },
        { category: 'Timeline', score: 6 },
        { category: 'Compliance', score: 7 },
      ],
    },
    {
      project: 'Qatar Stadium',
      risks: [
        { category: 'Financial', score: 3 },
        { category: 'Legal', score: 2 },
        { category: 'Operational', score: 4 },
        { category: 'Timeline', score: 3 },
        { category: 'Compliance', score: 2 },
      ],
    },
  ];

  // Function to determine color based on risk score
  const getRiskColor = (score: number) => {
    if (score <= 3) return 'bg-green-200 text-green-800';
    if (score <= 6) return 'bg-yellow-200 text-yellow-800';
    return 'bg-red-200 text-red-800';
  };
  return <div className="overflow-x-auto">
      <table className="min-w-full">
        <thead>
          <tr>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">
              Project
            </th>
            {riskCategories.map(category => <th key={category} className="px-4 py-2 text-center text-sm font-medium text-gray-500">
                {category}
              </th>)}
            <th className="px-4 py-2 text-center text-sm font-medium text-gray-500">
              Overall
            </th>
          </tr>
        </thead>
        <tbody>
          {riskData.map((projectData, index) => {
          const overallScore = Math.round(projectData.risks.reduce((sum, risk) => sum + risk.score, 0) / projectData.risks.length);
          return <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                <td className="px-4 py-3 text-sm font-medium text-gray-800">
                  {projectData.project}
                </td>
                {projectData.risks.map((risk, riskIndex) => <td key={riskIndex} className="px-4 py-3 text-center">
                    <div className="flex justify-center">
                      <div className={`w-8 h-8 rounded-full ${getRiskColor(risk.score)} flex items-center justify-center text-white text-sm font-medium`}>
                        {risk.score}
                      </div>
                    </div>
                  </td>)}
                <td className="px-4 py-3 text-center">
                  <div className="flex justify-center">
                    <div className={`w-8 h-8 rounded-full ${getRiskColor(overallScore)} flex items-center justify-center text-white text-sm font-medium`}>
                      {overallScore}
                    </div>
                  </div>
                </td>
              </tr>
        })}
        </tbody>
      </table>
    </div>
}