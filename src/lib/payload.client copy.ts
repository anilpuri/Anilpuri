'use client'

import qs from 'qs'

const API_BASE = process.env.NEXT_PUBLIC_PAYLOAD_URL!

export type Paginated<T> = {
  docs: T[]
  page: number
  totalPages: number
  totalDocs: number
}

/* ---------------- FIND PAGINATED ---------------- */
export async function findPaginated<T = any>(
  collection: string,
  options?: {
    page?: number
    pageSize?: number
    depth?: number
    sort?: string
    where?: Record<string, any>
  },
): Promise<Paginated<T>> {
  const query = qs.stringify(
    {
      page: options?.page ?? 1,
      limit: options?.pageSize ?? 10,
      depth: options?.depth ?? 1,
      sort: options?.sort,
      where: options?.where,
    },
    {
      encodeValuesOnly: true, // ✅ important for Payload
    },
  )

  const res = await fetch(`${API_BASE}/api/${collection}?${query}`, {
    cache: 'no-store',
  })

  if (!res.ok) {
    throw new Error(`Failed to fetch ${collection}`)
  }

  return res.json()
}
export async function getById<T = any>(
  collection: string,
  id: string | number,
  depth: number = 1,
): Promise<T | null> {
  const res = await fetch(`${API_BASE}/api/${collection}/${id}?depth=${depth}`, {
    cache: 'no-store',
  })

  if (!res.ok) return null
  return res.json()
}
export async function getOne<T = any>(
  collection: string,
  options?: {
    depth?: number
    sort?: string
    where?: Record<string, any>
  },
): Promise<T | null> {
  const query = qs.stringify(
    {
      limit: 1,
      depth: options?.depth ?? 1,
      sort: options?.sort,
      where: options?.where,
    },
    { encodeValuesOnly: true },
  )

  const res = await fetch(`${API_BASE}/api/${collection}?${query}`, {
    cache: 'no-store',
  })

  if (!res.ok) return null

  const data = await res.json()
  return data?.docs?.[0] ?? null
}

/* ---------------- CREATE ---------------- */
export async function createOne<T = any>(collection: string, data: Partial<T>): Promise<T> {
  const res = await fetch(`${API_BASE}/api/${collection}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  if (!res.ok) {
    const error = await res.text()
    throw new Error(`Failed to create in ${collection}: ${error}`)
  }

  return res.json()
}
