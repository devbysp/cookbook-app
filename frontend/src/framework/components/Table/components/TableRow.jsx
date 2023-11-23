import React from 'react';
import { TableCell } from './TableCell';

export function TableRow({ row, columns }) {
  return (
    <tr>
      {
          row.data?.map((value, index) => {
            const { type, name, className } = columns[index];
            return (
              <TableCell key={name} value={value} type={type ?? 'td'} className={className} />
            );
          })
      }
    </tr>
  );
}
