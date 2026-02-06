import { getPage } from '@/lib/payload'
import BlocksRenderer from '@/components/BlocksRenderer'
import PageLayout from '@/components/layout/PageLayout'
import { notFound } from 'next/navigation'

export default async function Page({ params }) {
  const page = await getPage('home')
  if (!page) return notFound()

  return (
    <PageLayout page={page}>
      <BlocksRenderer blocks={page?.layout} personalDetails={page?.personalDetails} />
    </PageLayout>
  )
}

const pageObj = {
  id: 1,
  title: 'Home',
  slug: 'home',
  pageSettings: {
    showHeader: true,
    showFooter: true,
  },
  layout: [
    {
      id: '69706e2bb805215669e1b156',
      title: 'Heading Design Ideas for Project',
      subtitle:
        "Discover Pinterest's best ideas and inspiration for Heading design ideas for project. Get inspired and try out new things. 6k people searched",
      slug: null,
      style: 'style2',
      blockName: null,
      blockType: 'section-head',
    },
  ],
  updatedAt: '2026-01-21T09:14:31.587Z',
  createdAt: '2026-01-19T16:09:48.310Z',
  personalDetails: {
    id: 1,
    fullName: 'Anil Puri Goswami',
    jobTitle: 'Full Stack Developer',
    bio: null,
    profilePicture: {
      id: 2,
      alt: 'profile',
      updatedAt: '2026-01-19T16:23:06.523Z',
      createdAt: '2026-01-19T16:23:06.523Z',
      url: '/api/media/file/profile.jpg',
      thumbnailURL: null,
      filename: 'profile.jpg',
      mimeType: 'image/jpeg',
      filesize: 131308,
      width: 1024,
      height: 1024,
      focalX: 50,
      focalY: 50,
    },
    email: 'puria8387@gmail.com',
    phone: '9462308160',
    location: 'Jaipur, Rajasthan',
    resume: {
      id: 1,
      alt: 'Resume',
      updatedAt: '2026-01-19T16:22:01.398Z',
      createdAt: '2026-01-19T16:22:01.398Z',
      url: '/api/media/file/Anil%20Resume%203.5%2B.pdf',
      thumbnailURL: null,
      filename: 'Anil Resume 3.5+.pdf',
      mimeType: 'application/pdf',
      filesize: 90909,
      width: null,
      height: null,
      focalX: null,
      focalY: null,
    },
    updatedAt: '2026-01-19T16:23:43.645Z',
    createdAt: '2026-01-19T06:49:32.480Z',
  },
}
