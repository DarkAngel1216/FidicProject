import React from 'react';

export const Table = ({ children }) => (
  <div className="overflow-x-auto">
    <table className="min-w-full divide-y divide-gray-200">
      {children}
    </table>
  </div>
);

export const TableHeader = ({ children }) => (
  <thead>{children}</thead>
);

export const TableBody = ({ children }) => (
  <tbody className="bg-white divide-y divide-gray-200">{children}</tbody>
);

export const TableRow = ({ children }) => (
  <tr>{children}</tr>
);

export const TableHead = ({ children }) => (
  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
    {children}
  </th>
);

export const TableCell = ({ children }) => (
  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
    {children}
  </td>
);
