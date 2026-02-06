'use client'
import React from 'react'
import ManualBlockRender from './card-grid/ManualBlockRender'

import CollectionBlockRender from './card-grid/CollectionBlockRender'

const CardGrid = ({ blockType, itemsPerRow, sourceType, collectionConfig, manualConfig }) => {
  return (
    <section id="projects" className="section-bottom-padding bg-slate-50">
      <div className="container-custom">
        {sourceType == 'manual' ? (
          <ManualBlockRender details={manualConfig} itemsPerRow={itemsPerRow} />
        ) : (
          <CollectionBlockRender details={collectionConfig} itemsPerRow={itemsPerRow} />
        )}
      </div>
    </section>
  )
}

export default CardGrid
