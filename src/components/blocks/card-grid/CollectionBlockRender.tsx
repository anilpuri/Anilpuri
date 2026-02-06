'use client'
import React, { useEffect, useState } from 'react'
import clsx from 'clsx'
import { mdColsMap, lgColsMap } from './GridColMaps'
import Pagination from '@/components/layout/Pagination'
import collectionComponentMap from './collection-styles'
import { findPaginated } from '@/lib/payload.client'

const CollectionBlockRender = ({ details, itemsPerRow }) => {
  if (details?.fetchType == 'infinite') {
    return (
      <InfiniteCollection
        details={details}
        itemsPerRow={itemsPerRow}
        paginationType={details?.paginationType}
      />
    )
  } else if (details?.fetchType == 'selective') {
    return <SelectiveCollection details={details} itemsPerRow={itemsPerRow} />
  } else {
    return null
  }
}

const SelectiveCollection = ({ details, itemsPerRow }) => {
  const mdCols = Math.min(itemsPerRow, 2)
  const lgCols = itemsPerRow
  const Component = collectionComponentMap[details?.collection]
  const collectionItems = (details?.items ?? []).map((item) => item?.value)
  return (
    <>
      <div className={clsx('grid gap-8 grid-cols-1', mdColsMap[mdCols], lgColsMap[lgCols])}>
        {Component &&
          collectionItems.map((item, idx) => {
            return <Component item={item} idx={idx} key={idx} />
          })}
      </div>
    </>
  )
}
const InfiniteCollection = ({ details, itemsPerRow, paginationType }) => {
  const mdCols = Math.min(itemsPerRow, 2)
  const lgCols = itemsPerRow
  const Component = collectionComponentMap[details?.collection]

  const [currentCollectionItems, setCurrentCollectionItems] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const changePage = async (page) => {
    setIsLoading(true)
    const result = await findPaginated(details?.collection, {
      page: page,
      pageSize: details?.itemsPerPage ?? 6,
      depth: 2,
      sort: 'id',
      where: {
        isActive: {
          equals: true,
        },
      },
    })
    setCurrentPage(result?.page)
    setTotalPages(result?.totalPages)
    setCurrentCollectionItems((prev) => {
      if (paginationType == 'loadMore') {
        return [...prev, ...(result?.docs ?? [])]
      } else {
        return result?.docs ?? []
      }
    })
    setCurrentPage(page)
    setIsLoading(false)
  }
  useEffect(() => {
    changePage(1)
  }, [])
  return (
    <>
      <div className={clsx('grid gap-8 grid-cols-1', mdColsMap[mdCols], lgColsMap[lgCols])}>
        {isLoading &&
          [1, 2, 3].map((i) => (
            <div key={i} className="h-40 bg-slate-100 rounded-2xl animate-pulse" />
          ))}
        {Component &&
          !isLoading &&
          currentCollectionItems.map((item, idx) => {
            return <Component item={item} idx={idx} key={idx} />
          })}
      </div>
      <Pagination
        isLoading={isLoading}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={changePage}
        variant={paginationType == 'loadMore' ? 'load-more' : 'arrows'} // 'arrows' | 'numbers' | 'load-more'
      />
    </>
  )
}

export default CollectionBlockRender
