import { DynamicIcon } from 'lucide-react/dynamic'
import * as RemixIcons from '@remixicon/react'
import { detectColorType } from '@/lib/color/color-detector'
const ProjectLinkIcon = ({ icon, defaultColor = '' }) => {
  const fallbackIconColor = 'white'

  const iconStyle = icon?.style?.enabled ? icon?.style : false
  const iconColor = detectColorType(defaultColor ?? iconStyle?.['color'] ?? fallbackIconColor)?.css

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
    if (icon?.lib?.library === 'lucide' && icon?.lib?.name) {
      return <DynamicIcon name={icon.lib.name} className="w-5 h-5" style={{ color: iconColor }} />
    } else if (icon?.lib?.library === 'lucide' && icon?.lib?.name) {
      ;<RemixIconComponent className="w-5 h-5" style={{ color: iconColor }} />
    }
  }

  if ((icon?.type === 'url' && icon?.url) || (icon?.type === 'image' && icon?.image?.url)) {
    const iconUrl = icon?.type === 'url' ? icon?.url : icon?.image?.url
    return (
      <img
        src={iconUrl}
        alt={icon?.alt ?? 'icon'}
        className={`w-5 h-5 object-contain ${imageShapeClass}`}
        loading="lazy"
      />
    )
  }

  return null
}

export default ProjectLinkIcon
