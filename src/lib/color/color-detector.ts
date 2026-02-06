// utils/color.ts
import { SHADES, TAILWIND_COLORS, COLOR_MAP } from './tailwind-matrix'

export type ColorType = 'tailwind' | 'hex' | 'rgb' | 'hsl' | 'css-var' | 'unknown'

export function detectColorType(value?: string): {
  type: ColorType
  isTailwind: boolean
  normalized?: string
  css?: string
} {
  if (!value) {
    return { type: 'unknown', isTailwind: false }
  }

  const v = value.trim()

  /* ---------------- TAILWIND ---------------- */
  // supports: blue-500, text-blue-500, bg-blue-500
  const twMatch = v.match(/^(?:text-|bg-)?([a-z]+)-(\d{2,3})$/)

  if (twMatch) {
    const color = twMatch[1]
    const shade = twMatch[2]

    if (TAILWIND_COLORS.includes(color) && SHADES.includes(shade)) {
      const hex = COLOR_MAP?.[color]?.[shade]

      return {
        type: 'tailwind',
        isTailwind: true,
        normalized: `${color}-${shade}`,
        css: hex ?? undefined, // 👈 THIS is what you wanted
      }
    }
  }

  /* ---------------- HEX ---------------- */
  if (/^#([0-9a-f]{3}|[0-9a-f]{6}|[0-9a-f]{8})$/i.test(v)) {
    return {
      type: 'hex',
      isTailwind: false,
      css: v,
    }
  }

  /* ---------------- RGB / RGBA ---------------- */
  if (/^rgba?\((.+)\)$/.test(v)) {
    return {
      type: 'rgb',
      isTailwind: false,
      css: v,
    }
  }

  /* ---------------- HSL ---------------- */
  if (/^hsla?\((.+)\)$/.test(v)) {
    return {
      type: 'hsl',
      isTailwind: false,
      css: v,
    }
  }

  /* ---------------- CSS VAR ---------------- */
  if (/^var\(--.+\)$/.test(v)) {
    return {
      type: 'css-var',
      isTailwind: false,
      css: v,
    }
  }

  return {
    type: 'unknown',
    isTailwind: false,
    css: v,
  }
}
