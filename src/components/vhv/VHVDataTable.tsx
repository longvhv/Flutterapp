import React, { useState } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';

export interface VHVDataColumn<T = any> {
  label: string;
  numeric?: boolean;
  tooltip?: string;
  onSort?: () => void;
}

export interface VHVDataRow<T = any> {
  selected?: boolean;
  cells: VHVDataCell[];
  onSelectChanged?: (selected: boolean) => void;
}

export interface VHVDataCell {
  child: React.ReactNode;
  placeholder?: boolean;
}

interface VHVDataTableProps<T = any> {
  columns: VHVDataColumn<T>[];
  rows: VHVDataRow<T>[];
  sortColumnIndex?: number;
  sortAscending?: boolean;
  onSelectAll?: (selected: boolean) => void;
  headingRowColor?: string;
  headingTextStyle?: React.CSSProperties;
  dataRowColor?: string;
  dataTextStyle?: React.CSSProperties;
  border?: boolean;
  dividerThickness?: number;
  showCheckboxColumn?: boolean;
  className?: string;
}

export function VHVDataTable<T = any>({
  columns,
  rows,
  sortColumnIndex,
  sortAscending = true,
  onSelectAll,
  headingRowColor = '#F3F4F6',
  headingTextStyle,
  dataRowColor,
  dataTextStyle,
  border = true,
  dividerThickness = 1,
  showCheckboxColumn = false,
  className = '',
}: VHVDataTableProps<T>) {
  const [selectedRows, setSelectedRows] = useState<Set<number>>(
    new Set(rows.map((row, idx) => row.selected ? idx : -1).filter(idx => idx !== -1))
  );

  const handleSelectAll = (selected: boolean) => {
    if (selected) {
      setSelectedRows(new Set(rows.map((_, idx) => idx)));
    } else {
      setSelectedRows(new Set());
    }
    onSelectAll?.(selected);
  };

  const handleRowSelect = (index: number, selected: boolean) => {
    const newSelected = new Set(selectedRows);
    if (selected) {
      newSelected.add(index);
    } else {
      newSelected.delete(index);
    }
    setSelectedRows(newSelected);
    rows[index].onSelectChanged?.(selected);
  };

  const allSelected = selectedRows.size === rows.length && rows.length > 0;

  return (
    <div className={`overflow-x-auto ${className}`}>
      <table className={`w-full ${border ? 'border border-gray-200 dark:border-gray-700' : ''}`}>
        <thead style={{ backgroundColor: headingRowColor }}>
          <tr>
            {showCheckboxColumn && (
              <th className="px-4 py-3 text-left">
                <input
                  type="checkbox"
                  checked={allSelected}
                  onChange={(e) => handleSelectAll(e.target.checked)}
                  className="w-4 h-4"
                />
              </th>
            )}
            {columns.map((column, index) => (
              <th
                key={index}
                className={`px-4 py-3 ${column.numeric ? 'text-right' : 'text-left'} font-medium`}
                style={headingTextStyle}
                title={column.tooltip}
              >
                <div className="flex items-center gap-2">
                  <span>{column.label}</span>
                  {column.onSort && sortColumnIndex === index && (
                    <button onClick={column.onSort}>
                      {sortAscending ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </button>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              style={{ backgroundColor: dataRowColor }}
              className={`
                ${border ? `border-t border-gray-200 dark:border-gray-700` : ''}
                hover:bg-gray-50 dark:hover:bg-gray-800
                ${selectedRows.has(rowIndex) ? 'bg-blue-50 dark:bg-blue-950' : ''}
              `}
            >
              {showCheckboxColumn && (
                <td className="px-4 py-3">
                  <input
                    type="checkbox"
                    checked={selectedRows.has(rowIndex)}
                    onChange={(e) => handleRowSelect(rowIndex, e.target.checked)}
                    className="w-4 h-4"
                  />
                </td>
              )}
              {row.cells.map((cell, cellIndex) => (
                <td
                  key={cellIndex}
                  className={`px-4 py-3 ${columns[cellIndex]?.numeric ? 'text-right' : 'text-left'} ${cell.placeholder ? 'text-gray-400 italic' : ''}`}
                  style={dataTextStyle}
                >
                  {cell.child}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
