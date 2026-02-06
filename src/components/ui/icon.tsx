import React from 'react'
import { DynamicIcon } from 'lucide-react/dynamic'
import * as RemixIcons from '@remixicon/react'
import { detectColorType } from '@/lib/color/color-detector'

const Icon = ({ icon }) => {
  const fallbackBg = 'blue-100'
  const fallbackIconColor = 'white'

  const iconStyle = icon?.style?.enabled ? icon?.style : false
  const bgColor = detectColorType(iconStyle?.['bg-color'] ?? fallbackBg)?.css
  const iconColor = detectColorType(iconStyle?.['color'] ?? fallbackIconColor)?.css
  const bgShapeClass =
    iconStyle?.shape === 'circle'
      ? 'rounded-full'
      : iconStyle?.shape === 'square'
        ? 'rounded-none'
        : iconStyle?.shape === 'rounded'
          ? 'rounded-2xl'
          : 'rounded-2xl'
  const imageShapeClass =
    iconStyle?.shape === 'circle'
      ? 'rounded-full'
      : iconStyle?.shape === 'square'
        ? 'rounded-none'
        : iconStyle?.shape === 'rounded'
          ? 'rounded'
          : 'rounded'

  if (icon?.type == 'lib') {
    const RemixIconComponent = icon?.lib?.library === 'remix' ? RemixIcons[icon?.lib?.name] : null
    return (
      <div
        className={`p-4 inline-block mb-6
            group-hover:scale-110 transition-transform ${bgShapeClass}`}
        style={{ backgroundColor: bgColor }}
      >
        {/* LUCIDE */}
        {icon?.lib?.library === 'lucide' && icon?.lib?.name && (
          <DynamicIcon name={icon.lib.name} className="w-8 h-8" style={{ color: iconColor }} />
        )}

        {/* REMIX */}
        {icon?.lib?.library === 'remix' && RemixIconComponent && (
          <RemixIconComponent className="w-8 h-8" style={{ color: iconColor }} />
        )}
      </div>
    )
  }

  if ((icon?.type === 'url' && icon?.url) || (icon?.type === 'image' && icon?.image?.url)) {
    const iconUrl = icon?.type === 'url' ? icon?.url : icon?.image?.url
    return (
      <div
        className={`p-4  inline-flex items-center justify-center mb-6
                   group-hover:scale-110 transition-transform ${bgShapeClass}`}
        style={{ backgroundColor: bgColor }}
      >
        <img
          src={iconUrl}
          alt={icon?.alt ?? 'icon'}
          className={`w-9 h-9 object-contain ${imageShapeClass}`}
          loading="lazy"
        />
      </div>
    )
  }

  return null
}

export default Icon
