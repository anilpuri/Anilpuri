// lib/payload.ts

import payload, { BasePayload, CollectionSlug, GlobalSlug } from 'payload'
import configPromise from '@payload-config'

let initPromise: Promise<BasePayload> | null = null

async function initPayload() {
  if (!initPromise) {
    initPromise = payload.init({
      config: await configPromise,
    })
  }

  await initPromise
}

export async function getGlobal<T = any>(
  slug: GlobalSlug,
  options?: {
    depth?: number
  },
): Promise<T | null> {
  await initPayload()

  try {
    const global = await payload.findGlobal({
      slug,
      depth: options?.depth ?? 1,
    })

    return global as T
  } catch (error) {
    console.error(`getGlobal(${slug}) error`, error)
    return null
  }
}

export async function getFirst<T = any>(
  collection: CollectionSlug,
  options?: {
    where?: Record<string, any>
    depth?: number
    sort?: string
  },
): Promise<T | null> {
  await initPayload()

  try {
    const res = await payload.find({
      collection,
      where: options?.where,
      depth: options?.depth ?? 1,
      sort: options?.sort,
      limit: 1,
    })

    return (res?.docs?.[0] as T) ?? null
  } catch (error) {
    console.error(`getFirst(${collection}) error`, error)
    return null
  }
}
export async function findOne<T = any>(
  collection: CollectionSlug,
  where: Record<string, any>,
  depth: number = 8,
): Promise<T | null> {
  await initPayload()

  try {
    const res = await payload.find({
      collection,
      where,
      depth,
      limit: 1,
    })

    return (res?.docs?.[0] as T) ?? null
  } catch (error) {
    console.error(`findOne(${collection}) error`, error)
    return null
  }
}
export async function findPaginated<T = any>(
  collection: CollectionSlug,
  options?: {
    page?: number
    pageSize?: number
    where?: Record<string, any>
    depth?: number
    sort?: string
  },
): Promise<{
  docs: T[]
  page: number
  totalPages: number
  totalDocs: number
}> {
  await initPayload()

  try {
    const res = await payload.find({
      collection,
      where: options?.where,
      depth: options?.depth ?? 1,
      page: options?.page ?? 1,
      limit: options?.pageSize ?? 10,
      sort: options?.sort,
    })

    return {
      docs: (res.docs as T[]) ?? [],
      page: res.page,
      totalPages: res.totalPages,
      totalDocs: res.totalDocs,
    }
  } catch (error) {
    console.error(`findPaginated(${collection}) error`, error)
    return {
      docs: [],
      page: options?.page ?? 1,
      totalPages: 0,
      totalDocs: 0,
    }
  }
}

export async function createOne<T = any>(collection: CollectionSlug, data: Partial<T>): Promise<T> {
  await initPayload()

  try {
    const doc = await payload.create({
      collection,
      data,
    })

    return doc as T
  } catch (error) {
    console.error(`createOne(${collection}) error`, error)
    throw error
  }
}

export const getHeader = () => {
  console.log('header Called')
  return getGlobal('header', { depth: 2 })
}
export const getFooter = () => getGlobal('footer', { depth: 2 })

export async function getPage(slug: string) {
  const page = await findOne('pages', {
    slug: {
      equals: slug,
    },
  })
  if (!page) return null

  const personalDetails = await getFirst('personal-details')

  return {
    ...page,
    personalDetails: personalDetails ?? null,
  }
}
