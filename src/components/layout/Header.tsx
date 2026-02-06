'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { Menu, X, Download } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'

export default function Header({ createdAt, globalType, logo, navItems, updatesAt, resume }) {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = (navItems || []).map((item) => ({
    key: item.id,
    name: item.label,
    href: item.url,
    newTab: item.newTab,
  }))

  const handleNavClick = (href: string) => {
    setIsOpen(false)

    if (href.startsWith('/#')) {
      const id = href.substring(2)

      if (pathname === '/') {
        const el = document.getElementById(id)
        if (el) el.scrollIntoView({ behavior: 'smooth' })
      } else {
        router.push(href)
      }
    }
  }

  const handleDownloadResume = () => {
    if (!resume?.url) return

    window.open(resume.url, '_blank', 'noopener,noreferrer')
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/80 backdrop-blur-lg shadow-sm border-b border-gray-100'
          : 'bg-transparent'
      }`}
    >
      <div className="container-custom flex items-center justify-between h-20">
        <Link href="/" className="cursor-pointer">
          {logo?.type == 'text' && (
            <span className="font-display font-bold text-2xl tracking-tighter text-slate-900">
              {logo?.text}
              {logo?.highlight && <span className="text-primary">{logo?.highlight}</span>}
            </span>
          )}
          {logo?.type === 'image' && logo?.image?.url && (
            <img
              src={logo.image.url}
              alt={logo.image.alt || 'Logo'}
              className="h-10 w-auto object-contain"
              loading="eager"
            />
          )}
          {logo?.type === 'url' && logo?.imageUrl && (
            <img
              src={logo.imageUrl}
              alt={logo.imageUrl || 'Logo'}
              className="h-10 w-auto object-contain"
              loading="eager"
            />
          )}
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => {
            const isActive =
              link.href === '/'
                ? pathname === '/'
                : pathname === link.href || pathname === link.href.split('#')[0]

            const isHashLink = link.href.startsWith('/#')

            return (
              <Link
                key={link.name}
                href={link.href}
                scroll={false}
                onClick={(e) => {
                  if (isHashLink) {
                    e.preventDefault()
                    handleNavClick(link.href)
                  }
                }}
              >
                <span
                  className={`nav-link cursor-pointer ${isActive ? 'text-primary font-bold' : ''}`}
                >
                  {link.name}
                </span>
              </Link>
            )
          })}

          {resume?.url && (
            <Button
              size="sm"
              onClick={handleDownloadResume}
              className="bg-primary cursor-pointer hover:bg-primary/90 text-white rounded-full px-6 font-medium shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all hover:-translate-y-0.5"
            >
              <Download className="w-4 h-4 mr-2" />
              Resume
            </Button>
          )}
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-slate-900 p-2">
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-gray-100 overflow-hidden"
          >
            <div className="container-custom py-6 flex flex-col space-y-4">
              {navLinks.map((link) => {
                const isHashLink = link.href.startsWith('/#')
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    scroll={false}
                    onClick={(e) => {
                      if (isHashLink) {
                        e.preventDefault()
                        handleNavClick(link.href)
                      } else {
                        setIsOpen(false)
                      }
                    }}
                  >
                    <span className="block text-lg font-medium text-slate-600 hover:text-primary py-2 cursor-pointer">
                      {link.name}
                    </span>
                  </Link>
                )
              })}

              <Button onClick={handleDownloadResume} className="w-full mt-4">
                Download Resume
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
