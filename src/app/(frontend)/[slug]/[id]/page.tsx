import { getPage, findOne } from '@/lib/payload'
import BlocksRenderer from '@/components/BlocksRenderer'
import PageLayout from '@/components/layout/PageLayout'
import { notFound } from 'next/navigation'
import BackToLink from '@/components/layout/BackToLink'
import ProjectDetails from '@/components/blocks/project/ProjectDetails'

export default async function Page({ params }: { params: { slug: string; id: string } }) {
  const { slug, id } = params

  const page = await getPage(slug + '/*')
  const pageObject = await findOne(slug, { id: { equals: id } }, 2)
  if (!page) return notFound()

  return (
    <PageLayout page={page}>
      {slug === 'projects' && (
        <ProjectDetails project={pageObject} page={page} personalDetails={page?.personalDetails} />
      )}
    </PageLayout>
  )
}
