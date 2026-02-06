import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { getHeader, getFooter } from '@/lib/payload'
import { Toaster } from '@/components/ui/toaster'
import { TooltipProvider } from '@/components/ui/tooltip'
export default async function PageLayout({
  page,
  children,
}: {
  page: any
  children: React.ReactNode
}) {
  const [header, footer] = await Promise.all([getHeader(), getFooter()])
  // const [header, footer] = [headerObj, footerObj]

  return (
    <TooltipProvider>
      <Toaster />
      {page.pageSettings?.showHeader && (
        <Header {...header} resume={page?.personalDetails?.resume} />
      )}

      <main className="min-h-screen bg-white">{children}</main>

      {page.pageSettings?.showFooter && (
        <Footer {...footer} personalDetails={page?.personalDetails} />
      )}
    </TooltipProvider>
  )
}

const headerObj = {
  id: 1,
  logo: {
    type: 'text',
    text: 'AP',
    highlight: '.',
    image: {
      id: 3,
      alt: 'Header logo',
      updatedAt: '2026-01-19T16:46:11.692Z',
      createdAt: '2026-01-19T16:46:11.692Z',
      url: '/api/media/file/mark.svg',
      thumbnailURL: null,
      filename: 'mark.svg',
      mimeType: 'image/svg+xml',
      filesize: 1057,
      width: 47,
      height: 40,
      focalX: null,
      focalY: null,
    },
    imageUrl: 'https://picsum.photos/300/150',
  },
  navItems: [
    {
      id: '696dd3554d1820e156f1d599',
      label: 'Home',
      url: '/',
      newTab: false,
    },
    {
      id: '696dd3644d1820e156f1d59b',
      label: 'About',
      url: '/about',
      newTab: false,
    },
    {
      id: '696dd3784d1820e156f1d59d',
      label: 'Projects',
      url: '#projects',
      newTab: false,
    },
    {
      id: '696dd3894d1820e156f1d59f',
      label: 'Skills',
      url: '#skills',
      newTab: false,
    },
    {
      id: '696dd39a4d1820e156f1d5a1',
      label: 'Experience',
      url: '#experience',
      newTab: false,
    },
    {
      id: '696dd3ae4d1820e156f1d5a3',
      label: 'Contact',
      url: '#contact',
      newTab: false,
    },
  ],
  updatedAt: '2026-01-19T16:50:26.185Z',
  createdAt: '2026-01-19T06:46:34.740Z',
  globalType: 'header',
}

const footerObj = {
  id: 1,
  logo: {
    type: 'text',
    text: 'Anil Puri Goswami',
    highlight: '.',
    image: null,
    imageUrl: null,
  },
  navItems: [],
  quote: 'Building digital experiences with passion and precision.',
  socialAccounts: [
    {
      id: 1,
      name: 'Github',
      profileLink: 'https://github.com/anilpuri',
      icon: {
        type: 'lib',
        lib: {
          library: 'lucide',
          name: 'github',
        },
        url: null,
        image: null,
        background: {
          enabled: false,
          color: null,
          shape: 'rounded',
        },
      },
      order: 0,
      isActive: true,
      note: null,
      updatedAt: '2026-01-19T17:20:28.673Z',
      createdAt: '2026-01-19T17:02:01.533Z',
    },
    {
      id: 2,
      name: 'Linkedin',
      profileLink: 'https://linkedin.com/in/anil-puri-goswami',
      icon: {
        type: 'lib',
        lib: {
          library: 'lucide',
          name: 'linkedin',
        },
        url: null,
        image: null,
        background: {
          enabled: false,
          color: null,
          shape: 'rounded',
        },
      },
      order: 1,
      isActive: true,
      note: null,
      updatedAt: '2026-01-19T17:20:30.796Z',
      createdAt: '2026-01-19T17:03:53.959Z',
    },
    {
      id: 3,
      name: 'Mail',
      profileLink: 'https://mailto:someone@example.com',
      icon: {
        type: 'lib',
        lib: {
          library: 'lucide',
          name: 'mail',
        },
        url: null,
        image: null,
        background: {
          enabled: false,
          color: null,
          shape: 'rounded',
        },
      },
      order: 2,
      isActive: true,
      note: null,
      updatedAt: '2026-01-19T17:18:36.889Z',
      createdAt: '2026-01-19T17:05:40.888Z',
    },
  ],
  updatedAt: '2026-01-19T17:07:55.129Z',
  createdAt: '2026-01-19T06:50:34.431Z',
  globalType: 'footer',
}
