import React from 'react';

export function TableHead({ tableModel }) {
  return (
    <thead>
      <tr>
        {tableModel.columns?.map((column) => (
          <th key={column.name} className={`table-header table-head-cell ${column.className ?? ''}`.trim()}>{column.name}</th>
        ))}
      </tr>
    </thead>
  );
}
