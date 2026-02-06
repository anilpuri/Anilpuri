'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Loader2 } from 'lucide-react'
import clsx from 'clsx'

type PaginationVariant = 'arrows' | 'numbers' | 'load-more'

interface PaginationProps {
  currentPage: number
  totalPages: number
  /** Pass the loading state from the parent component */
  isLoading?: boolean
  onPageChange: (page: number) => Promise<void> | void
  variant?: PaginationVariant
  className?: string
}

const Pagination = ({
  currentPage,
  totalPages,
  isLoading = false, // Default to false if not provided
  onPageChange,
  variant = 'arrows',
  className,
}: PaginationProps) => {
  const isFirst = currentPage === 1
  const isLast = currentPage === totalPages

  const goToPage = (page: number) => {
    // Logic: Prevent out of bounds or clicking current page
    const next = Math.min(Math.max(page, 1), totalPages)

    // Logic: Block interaction if already on that page or currently loading
    if (next === currentPage || isLoading) return

    onPageChange(next)
  }

  if (totalPages <= 1) return null

  /* ---------------- LOAD MORE VARIANT ---------------- */
  if (variant === 'load-more') {
    return (
      <div className={clsx('flex justify-center mt-10', className)}>
        <motion.button
          disabled={isLast || isLoading}
          onClick={() => goToPage(currentPage + 1)}
          className={clsx(
            'px-8 py-3 rounded-2xl border border-slate-100 bg-white shadow-sm font-medium flex items-center gap-2 transition-all',
            // Logic: Pointer handling
            isLast || isLoading
              ? 'text-slate-400 cursor-not-allowed'
              : 'text-slate-700 hover:text-primary hover:shadow-xl cursor-pointer',
          )}
        >
          {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
          {isLoading ? 'Loading...' : 'Load More'}
        </motion.button>
      </div>
    )
  }

  /* ---------------- ARROWS / NUMBERS VARIANT ---------------- */
  return (
    <div className={clsx('flex justify-end mt-10', className)}>
      {/* UI: Reverted to original rounded-2xl and padding */}
      <div className="flex items-center gap-2 bg-white border border-slate-100 rounded-2xl shadow-sm px-4 py-3">
        {variant === 'arrows' && (
          <>
            <IconBtn disabled={isFirst || isLoading} onClick={() => goToPage(currentPage - 1)}>
              <ChevronLeft />
            </IconBtn>

            {/* UI: Added a small text indicator so 'arrows' mode isn't empty */}
            <span className="text-sm font-medium text-slate-600 px-2 min-w-[80px] text-center select-none">
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin mx-auto" />
              ) : (
                `${currentPage} / ${totalPages}`
              )}
            </span>

            <IconBtn disabled={isLast || isLoading} onClick={() => goToPage(currentPage + 1)}>
              <ChevronRight />
            </IconBtn>
          </>
        )}

        {variant === 'numbers' && (
          <>
            <IconBtn disabled={isFirst || isLoading} onClick={() => goToPage(1)}>
              <ChevronsLeft />
            </IconBtn>

            <IconBtn disabled={isFirst || isLoading} onClick={() => goToPage(currentPage - 1)}>
              <ChevronLeft />
            </IconBtn>

            {/* Logic: Using the robust getVisiblePages from previous fix */}
            {getVisiblePages(currentPage, totalPages).map((p, i) =>
              p === '...' ? (
                <span
                  key={`ellipsis-${i}`}
                  className="px-2 text-slate-400 select-none cursor-default"
                >
                  …
                </span>
              ) : (
                <PageBtn
                  key={p}
                  active={p === currentPage}
                  onClick={() => goToPage(p as number)}
                  disabled={isLoading}
                >
                  {p}
                </PageBtn>
              ),
            )}

            <IconBtn disabled={isLast || isLoading} onClick={() => goToPage(currentPage + 1)}>
              <ChevronRight />
            </IconBtn>

            <IconBtn disabled={isLast || isLoading} onClick={() => goToPage(totalPages)}>
              <ChevronsRight />
            </IconBtn>
          </>
        )}
      </div>
    </div>
  )
}

/* ---------- UI PARTS (Reverted to original styles) ---------- */

const IconBtn = ({ children, disabled, onClick }: any) => (
  <button
    disabled={disabled}
    onClick={onClick}
    className={clsx(
      'p-2 rounded-xl transition-all', // UI: Reverted to rounded-xl
      disabled
        ? 'text-slate-400 cursor-not-allowed'
        : 'text-slate-700 hover:text-primary hover:bg-slate-50 cursor-pointer',
    )}
  >
    {React.cloneElement(children, { className: 'w-4 h-4' })}
  </button>
)

const PageBtn = ({ children, active, onClick, disabled }: any) => (
  <button
    onClick={onClick}
    disabled={disabled || active}
    className={clsx(
      'px-3 py-1 rounded-xl text-sm font-medium transition-all', // UI: Reverted to rounded-xl and px-3
      active
        ? 'bg-primary text-white cursor-default' // UI: Reverted to bg-primary
        : disabled
          ? 'text-slate-400 cursor-not-allowed'
          : 'text-slate-700 hover:text-primary hover:bg-slate-50 cursor-pointer',
    )}
  >
    {children}
  </button>
)

/* ---------- FIXED PAGE LOGIC (Kept the better logic) ---------- */

function getVisiblePages(current: number, total: number) {
  const delta = 1 // Number of pages to show on each side
  const range: number[] = []
  const rangeWithDots: (number | '...')[] = []

  for (let i = 1; i <= total; i++) {
    if (i === 1 || i === total || (i >= current - delta && i <= current + delta)) {
      range.push(i)
    }
  }

  let l: number | undefined

  for (const i of range) {
    if (l) {
      if (i - l === 2) {
        rangeWithDots.push(l + 1)
      } else if (i - l !== 1) {
        rangeWithDots.push('...')
      }
    }
    rangeWithDots.push(i)
    l = i
  }

  return rangeWithDots
}

export default Pagination
