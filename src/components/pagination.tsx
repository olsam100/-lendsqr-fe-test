import type { Table } from '@tanstack/react-table'
import { NextIcon, PreviousIcon } from "../assets/icons/dashboard-icons/dashboard"

interface PaginationProps<T> {
    table: Table<T>
}

export function Pagination<T>({ table }: PaginationProps<T>) {
    const getPageNumbers = () => {
        const totalPages = table.getPageCount()
        if (totalPages === 0) return []

        const currentPage = table.getState().pagination.pageIndex + 1
        const maxVisible = 3
        const pages: (number | string)[] = []

        let start = Math.max(1, currentPage - Math.floor(maxVisible / 2))
        const end = Math.min(totalPages - 2, start + maxVisible - 1)

        if (end === totalPages - 2) {
            start = Math.max(1, end - maxVisible + 1)
        }

        for (let i = start; i <= end; i++) {
            pages.push(i)
        }

        if (end < totalPages - 2) {
            pages.push('...')
        }

        if (totalPages > 1) {
            pages.push(totalPages - 1)
            pages.push(totalPages)
        }

        return pages
    }

    if (table.getPageCount() <= 1) return null

    return (
        <div className='pagination-controls'>
            <button
                className='pagination-btn'
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
            >
                <PreviousIcon />
            </button>

            {getPageNumbers().map((page, idx) => (
                <button
                    key={idx}
                    className={`pagination-btn ${page === '...' ? 'ellipsis' : ''} ${page === table.getState().pagination.pageIndex + 1 ? 'active' : ''
                        }`}
                    onClick={() => {
                        if (typeof page === 'number') {
                            table.setPageIndex(page - 1)
                        }
                    }}
                    disabled={page === '...'}
                >
                    {page}
                </button>
            ))}

            <button
                className='pagination-btn'
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
            >
                <NextIcon />
            </button>
        </div>
    )
}