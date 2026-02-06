import React from 'react'
import { detectColorType } from '@/lib/color/color-detector'
import { DynamicIcon } from 'lucide-react/dynamic'
import * as RemixIcons from '@remixicon/react'

const SkillSmall = ({ item, idx }) => {
  console.log(item)
  const { icon, name, enableIcon } = item
  const iconStyle = icon?.style?.enabled ? icon?.style : false
  const bgColor = detectColorType(iconStyle?.['bg-color'] ?? 'white')?.css
  return (
    <span
      className="inline-flex items-center gap-2 px-3 py-1.5  border border-slate-200 rounded-lg text-sm font-medium text-slate-600 shadow-sm"
      style={{ backgroundColor: bgColor }}
    >
      {enableIcon && <SkillIcon icon={icon} />}
      {name}
    </span>
  )
}

export default SkillSmall

const SkillIcon = ({ icon }) => {
  const fallbackIconColor = 'slate-400'

  const iconStyle = icon?.style?.enabled ? icon?.style : false

  const iconColor = detectColorType(iconStyle?.['color'] ?? fallbackIconColor)?.css

  const imageShapeClass =
    iconStyle?.shape === 'circle'
      ? 'rounded-full'
      : iconStyle?.shape === 'square'
        ? 'rounded-none'
        : iconStyle?.shape === 'rounded'
          ? 'rounded'
          : 'rounded-none'

  if (icon?.type == 'lib') {
    const RemixIconComponent = icon?.lib?.library === 'remix' ? RemixIcons[icon?.lib?.name] : null
    if (icon?.lib?.library === 'lucide' && icon?.lib?.name) {
      return <DynamicIcon name={icon.lib.name} className="w-4 h-4" style={{ color: iconColor }} />
    } else if (icon?.lib?.library === 'remix' && RemixIconComponent)
      return <RemixIconComponent className="w-4 h-4" style={{ color: iconColor }} />
  }

  if ((icon?.type === 'url' && icon?.url) || (icon?.type === 'image' && icon?.image?.url)) {
    const iconUrl = icon?.type === 'url' ? icon?.url : icon?.image?.url
    return (
      <img
        src={iconUrl}
        alt={icon?.alt ?? 'icon'}
        className={`w-4 h-4 object-contain ${imageShapeClass}`}
        loading="lazy"
      />
    )
  }

  return null
}
