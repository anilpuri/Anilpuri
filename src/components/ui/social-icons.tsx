'use client'
import React, { useState } from 'react'
import { DynamicIcon } from 'lucide-react/dynamic'
import * as RemixIcons from '@remixicon/react'
import { detectColorType } from '@/lib/color/color-detector'

const SocialIcons = ({ icon }) => {
  const fallbackIconColor = 'slate-400'
  const [isHovered, setIsHovered] = useState(false)
  const iconStyle = icon?.style?.enabled ? icon?.style : false
  const iconColor = detectColorType(iconStyle?.['color'] ?? fallbackIconColor)?.css

  if (icon?.type == 'lib') {
    const RemixIconComponent = icon?.lib?.library === 'remix' ? RemixIcons[icon?.lib?.name] : null
    return (
      <>
        {/* LUCIDE */}
        {icon?.lib?.library === 'lucide' && icon?.lib?.name && (
          <DynamicIcon
            name={icon.lib.name}
            className="w-6 h-6"
            style={{ color: isHovered ? '#6366f1' : iconColor }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          />
        )}

        {/* REMIX */}
        {icon?.lib?.library === 'remix' && RemixIconComponent && (
          <RemixIconComponent
            className="w-6 h-6"
            style={{ color: isHovered ? '#6366f1' : iconColor }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          />
        )}
      </>
    )
  }

  if ((icon?.type === 'url' && icon?.url) || (icon?.type === 'image' && icon?.image?.url)) {
    const iconUrl = icon?.type === 'url' ? icon?.url : icon?.image?.url
    return (
      <>
        <img
          src={iconUrl}
          alt={icon?.alt ?? 'icon'}
          className={`w-6 h-6 object-contain`}
          loading="lazy"
        />
      </>
    )
  }

  return null
}

export default SocialIcons
