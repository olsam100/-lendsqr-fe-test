import { useState, useRef, useEffect } from 'react'
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  useReactTable,
  type ColumnDef,
  type SortingState,
  type PaginationState,
  type OnChangeFn,
} from '@tanstack/react-table'
import { MoreIcon, SortIcon } from '../assets/icons/dashboard-icons/dashboard'
import FilterDropdown, { type FilterValues } from './filterdropdown'
import MoreActions from './morections'
import '../styles/datatable.scss'
import { Pagination } from './pagination'

type DataTableProps<T> = {
  data: T[]
  columns: ColumnDef<T>[]
  sorting: SortingState
  onSortingChange: OnChangeFn<SortingState>
  pagination: PaginationState
  onPaginationChange: OnChangeFn<PaginationState>
  gridTemplateColumns?: string
  onFilterApply?: (columnId: string, filters: FilterValues) => void
  onRowClick?: (row: T) => void
}

export function DataTable<T>({
  data,
  columns,
  sorting,
  onSortingChange,
  pagination,
  onPaginationChange,
  onFilterApply,
  onRowClick,
}: DataTableProps<T>) {
  const [menuAnchor, setMenuAnchor] = useState<{
    top: number
    left: number
    row: T
  } | null>(null)

  const [activeFilterColumn, setActiveFilterColumn] = useState<string | null>(
    null
  )
  const filterRef = useRef<HTMLDivElement>(null)

  const table = useReactTable({
    data,
    columns,
    state: { sorting, pagination },
    onSortingChange,
    onPaginationChange,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    enableSorting: true,
    enableSortingRemoval: false,
  })

  const handleOpenMenu = (e: React.MouseEvent, row: T) => {
    e.stopPropagation()
    const target = e.currentTarget as HTMLElement
    const rect = target.getBoundingClientRect()

    const dropdownWidth = 170

    setMenuAnchor({
      top: rect.bottom + 4,
      left: rect.right - dropdownWidth,
      row: row,
    })
  }

  useEffect(() => {
    const handleClose = () => setMenuAnchor(null)
    if (menuAnchor) {
      document.addEventListener('mousedown', handleClose)
      window.addEventListener('scroll', handleClose, true)
    }
    return () => {
      document.removeEventListener('mousedown', handleClose)
      window.removeEventListener('scroll', handleClose, true)
    }
  }, [menuAnchor])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        filterRef.current &&
        !filterRef.current.contains(event.target as Node)
      ) {
        setActiveFilterColumn(null)
      }
    }
    if (activeFilterColumn) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [activeFilterColumn])

  const handleHeaderClick = (headerId: string) => {
    if (headerId === 'company' || headerId === 'username') {
      setActiveFilterColumn(activeFilterColumn === headerId ? null : headerId)
    } else {
      const header = table
        .getHeaderGroups()[0]
        .headers.find((h) => h.id === headerId)
      if (header && headerId !== 'actions') {
        header.column.toggleSorting()
      }
    }
  }

  const handleFilterApply = (filters: FilterValues) => {
    if (onFilterApply && activeFilterColumn) {
      onFilterApply(activeFilterColumn, filters)
    }
    setActiveFilterColumn(null)
  }

  const headerGroup = table.getHeaderGroups()[0]
  const rows = table.getRowModel().rows

  const weights = headerGroup.headers.map(
    (h) => (h.column.columnDef.size as number) || 100
  )
  const totalWeight = weights.reduce((acc, w) => acc + w, 0)
  const filterWidthPercent = ((weights[0] + weights[1]) / totalWeight) * 100

  return (
    <div className='user-content-wrapper'>
      <div className='table-container'>
        <div className='users-table'>
          <div className='table-grid'>
            <div className='table-row header-row'>
              {headerGroup.headers.map((header, idx) => (
                <div
                  key={header.id}
                  className={`table-cell header-cell ${
                    activeFilterColumn === header.id ? 'filter-active' : ''
                  }`}
                  style={{ flex: `${weights[idx]} 1 0%` }}
                  onClick={() => handleHeaderClick(header.id)}
                >
                  <div className='header-content cell-content'>
                    <span className='header-text'>
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </span>
                    {header.id !== 'actions' && <SortIcon />}
                  </div>
                </div>
              ))}
            </div>

            <div className='table-body-container'>
              {activeFilterColumn && (
                <div
                  className='filter-overlay-wrapper'
                  ref={filterRef}
                  style={{ width: `${filterWidthPercent}%` }}
                >
                  <FilterDropdown
                    onClose={() => setActiveFilterColumn(null)}
                    onApply={handleFilterApply}
                    columnId={activeFilterColumn as 'company' | 'username'}
                  />
                </div>
              )}

              {rows.map((row) => (
                <div key={row.id} className='table-row'>
                  {row.getVisibleCells().map((cell, idx) => {
                    const isActions = cell.column.id === 'actions'
                    const isHiddenByFilter = activeFilterColumn && idx < 2

                    return (
                      <div
                        key={cell.id}
                        className='table-cell body-cell'
                        style={{
                          flex: `${weights[idx]} 1 0%`,
                          visibility: isHiddenByFilter ? 'hidden' : 'visible',
                        }}
                        onClick={() => !isActions && onRowClick?.(row.original)}
                      >
                        {isActions ? (
                          <div className='more-actions'>
                            <button
                              className='more-btn'
                              onClick={(e) => handleOpenMenu(e, row.original)}
                            >
                              <MoreIcon />
                            </button>
                          </div>
                        ) : (
                          <div className='cell-content'>
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className='paginationcontainer'>
          <div className='paginationshowing'>
            Showing{' '}
            {table.getState().pagination.pageIndex *
              table.getState().pagination.pageSize +
              1}
            –
            {Math.min(
              (table.getState().pagination.pageIndex + 1) *
                table.getState().pagination.pageSize,
              table.getPrePaginationRowModel().rows.length
            )}{' '}
            out of {table.getPrePaginationRowModel().rows.length}
          </div>
          <Pagination table={table} />
        </div>
      </div>

      {menuAnchor && (
        <div
          className='more-dropdown-portal'
          style={{
            position: 'fixed',
            top: `${menuAnchor.top}px`,
            left: `${menuAnchor.left}px`,
            zIndex: 99999,
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <MoreActions
            row={menuAnchor.row}
            onClose={() => setMenuAnchor(null)}
          />
        </div>
      )}
    </div>
  )
}
