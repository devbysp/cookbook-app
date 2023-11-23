import React from 'react';
import { TableHead } from './components/TableHead';
import { TableBody } from './components/TableBody';
import './table.css';

export function Table({ tableModel }) {
  return (
    <table className="table">
      <TableHead tableModel={tableModel} />
      <TableBody tableModel={tableModel} />
    </table>

  );
}
