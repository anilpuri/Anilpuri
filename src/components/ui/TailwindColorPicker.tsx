'use client'

import React, { useEffect, useState } from 'react'
import { useField, SelectInput, TextInput, FieldLabel } from '@payloadcms/ui'
import type { CustomComponent } from 'payload'
import { COLOR_MAP, SHADES, TAILWIND_COLORS } from '@/lib/color/tailwind-matrix'
/* ---------------- TAILWIND DATA ---------------- */

/**
 * Preview-only color map
 * (extend later if you want pixel-perfect accuracy)
 */

/* ---------------- COMPONENT ---------------- */

export const TailwindColorPicker: CustomComponent = (props) => {
  const { path, field } = props
  const { label } = field

  const { value = '', setValue } = useField<string>({ path })

  /* -------- MODE -------- */
  const isTailwind = !value || TAILWIND_COLORS.some((c) => value.startsWith(`${c}-`))

  const [mode, setMode] = useState<'tw' | 'custom'>(isTailwind ? 'tw' : 'custom')

  /* -------- PARSE VALUE -------- */
  const parts = value?.split('-') ?? []

  const [color, setColor] = useState(
    parts[0] && TAILWIND_COLORS.includes(parts[0]) ? parts[0] : 'slate',
  )

  const [shade, setShade] = useState(parts[1] && SHADES.includes(parts[1]) ? parts[1] : '500')

  const [custom, setCustom] = useState(mode === 'custom' ? value : '')

  /* -------- SYNC VALUE -------- */
  useEffect(() => {
    if (mode === 'tw') {
      const v = `${color}-${shade}`
      if (v !== value) setValue(v)
    }
  }, [mode, color, shade, value, setValue])

  useEffect(() => {
    if (mode === 'custom') {
      const v = custom.trim()
      if (v !== value) setValue(v)
    }
  }, [mode, custom, value, setValue])

  /* -------- PREVIEW -------- */
  const previewStyle: React.CSSProperties =
    mode === 'custom'
      ? { background: custom || '#ffffff' }
      : {
          backgroundColor: COLOR_MAP[color]?.[shade] ?? COLOR_MAP[color]?.['500'] ?? '#64748b',
        }

  return (
    <div className="field-type text mb-6">
      <FieldLabel label={label} />

      {/* ROW 1 — MODE */}
      <div style={{ marginBottom: 12 }}>
        <SelectInput
          path={`${path}_mode`}
          name={`${path}_mode`}
          value={mode}
          onChange={(e) => setMode(e?.value as 'tw' | 'custom')}
          options={[
            { label: 'Tailwind Color', value: 'tw' },
            { label: 'Custom Hex / CSS', value: 'custom' },
          ]}
        />
      </div>

      {/* ROW 2 — VALUES + PREVIEW */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        {/* VALUES (FULL WIDTH) */}
        <div style={{ flex: 1 }}>
          {mode === 'tw' ? (
            <div style={{ display: 'flex', gap: 8 }}>
              <div style={{ flex: 1 }}>
                <SelectInput
                  path={`${path}_color`}
                  name={`${path}_color`}
                  value={color}
                  onChange={(e) => setColor(e.value as string)}
                  options={TAILWIND_COLORS.map((c) => ({
                    label: c,
                    value: c,
                  }))}
                />
              </div>

              <div style={{ width: 110 }}>
                <SelectInput
                  path={`${path}_shade`}
                  name={`${path}_shade`}
                  value={shade}
                  onChange={(e) => setShade(e?.value as string)}
                  options={SHADES.map((s) => ({
                    label: s,
                    value: s,
                  }))}
                />
              </div>
            </div>
          ) : (
            <TextInput
              path={`${path}_custom`}
              name={`${path}_custom`}
              value={custom}
              onChange={(e) => setCustom(e.target.value)}
              placeholder="#2563eb / rgb(37,99,235) / var(--primary)"
            />
          )}
        </div>

        {/* PREVIEW */}
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: '50%',
            boxShadow: '0 0 0 1px rgba(0,0,0,0.1)',
            flexShrink: 0,
            ...previewStyle,
          }}
        />
      </div>

      {/* STORED VALUE */}
      <div style={{ marginTop: 8, fontSize: 12, color: '#666' }}>
        Stored value: <code style={{ color: '#333' }}>{value || '—'}</code>
      </div>
    </div>
  )
}
