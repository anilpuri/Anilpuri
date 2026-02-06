import React from 'react'
import clsx from 'clsx'
import manualComponentMap from './manual-styles'
import { mdColsMap, lgColsMap } from './GridColMaps'
const ManualBlockRender = ({ details, itemsPerRow }) => {
  const mdCols = Math.min(itemsPerRow, 2)
  const lgCols = itemsPerRow
  const currentStyle = details?.style
  const StyleComponent = manualComponentMap[currentStyle]
  return (
    <div className={clsx('grid gap-8 grid-cols-1', mdColsMap[mdCols], lgColsMap[lgCols])}>
      {(details?.cards || []).map((card, idx) => {
        return <StyleComponent idx={idx} {...card} key={idx} />
      })}
    </div>
  )
}

export default ManualBlockRender
