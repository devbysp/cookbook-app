import React from 'react';
import { TableRow } from './TableRow';

export function TableBody({ tableModel }) {
  return (
    <tbody>
      {tableModel.rows?.map((row) => (
        <TableRow key={row.key} row={row} columns={tableModel.columns} />
      )) }
    </tbody>

  );
}
