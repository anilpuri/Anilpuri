'use client'

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
  const res = await fetch('/api/payload/find-paginated', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      collection,
      ...options,
    }),
  })

  if (!res.ok) throw new Error('Failed to fetch')

  return res.json()
}

/* ---------------- GET BY ID ---------------- */
export async function getById<T = any>(
  collection: string,
  id: string | number,
  depth: number = 1,
): Promise<T | null> {
  const res = await fetch('/api/payload/get-by-id', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ collection, id, depth }),
  })

  if (!res.ok) return null
  return res.json()
}

/* ---------------- GET ONE ---------------- */
export async function getOne<T = any>(
  collection: string,
  options?: {
    depth?: number
    sort?: string
    where?: Record<string, any>
  },
): Promise<T | null> {
  const res = await fetch('/api/payload/get-one', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      collection,
      ...options,
    }),
  })

  if (!res.ok) return null
  return res.json()
}

/* ---------------- CREATE ---------------- */
export async function createOne<T = any>(collection: string, data: Partial<T>): Promise<T> {
  const res = await fetch('/api/payload/create-one', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ collection, data }),
  })

  if (!res.ok) {
    throw new Error('Create failed')
  }

  return res.json()
}
