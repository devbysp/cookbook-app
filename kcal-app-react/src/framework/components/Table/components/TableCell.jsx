import React from 'react';

export function TableCell({ value, type, className }) {
  if (type === 'th') {
    return <th className={`table-body table-head-cell ${className ?? ''}`.trim()}>{value}</th>;
  }
  return <td className={`table-body table-data-cell ${className ?? ''}`.trim()}>{value}</td>;
}
