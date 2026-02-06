import { getPage } from '@/lib/payload'
import BlocksRenderer from '@/components/BlocksRenderer'
import PageLayout from '@/components/layout/PageLayout'
import { notFound } from 'next/navigation'

export default async function Page({ params }: { params: { slug: string; id: string } }) {
  const { slug } = await params

  const page = await getPage(slug)
  if (!page) return notFound()

  return (
    <PageLayout page={page}>
      <BlocksRenderer blocks={page?.layout} personalDetails={page?.personalDetails} />
    </PageLayout>
  )
}
