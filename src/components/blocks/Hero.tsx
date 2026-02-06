'use client'
import { Button } from '@/components/ui/button'
import { detectColorType } from '@/lib/color/color-detector'
import { motion } from 'framer-motion'
import { DynamicIcon } from 'lucide-react/dynamic'
import { useRouter } from 'next/navigation'
import React from 'react'
import SocialIcons from '../ui/social-icons'

export default function Hero({
  showBadge = false,
  badgeText = '',
  headingText = '',
  introText = '',
  showSocialLinks = false,
  showHeroImage = false,
  heroImageKey = '',
  layout = 'image-right', // left or right
  floatingBadges = [],
  contentAlignment = 'left', // left or right
  primaryCTA,
  secondaryCTA,
  socialAccounts = [],
  personalDetails,
  ...others
}) {
  const router = useRouter()
  const handleSecondaryCTA = () => {
    if (secondaryCTA?.action === 'download-resume') {
      // Open resume in a new tab
      if (personalDetails?.resume?.url) {
        window.open(personalDetails.resume.url, '_blank')
      } else {
        alert('Resume not available')
      }
    } else if (secondaryCTA?.link) {
      router.push(secondaryCTA?.link)
    }
  }

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-slate-50/50">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl -z-10 translate-x-1/3 -translate-y-1/3"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-3xl -z-10 -translate-x-1/3 translate-y-1/3"></div>

      <div className="container-custom grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className={`relative z-10 
      ${layout === 'image-right' ? 'md:order-1' : 'md:order-2'}`}
        >
          {showBadge && badgeText && (
            <div className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-6">
              {badgeText}
            </div>
          )}
          {headingText && <HeroHeading headingText={headingText} />}
          {introText && <IntroText introText={introText} />}

          {showHeroImage && (
            <div className="md:hidden mb-10">
              <div className="relative w-full aspect-square max-w-[300px] mx-auto">
                <div className="w-full h-full rounded-3xl bg-white shadow-xl border border-slate-100 p-2 rotate-2">
                  <img
                    src={heroImageKey}
                    alt="Anil Puri Goswami"
                    className="w-full h-full object-cover rounded-2xl"
                  />
                </div>
                {Array.isArray(floatingBadges) && floatingBadges.length > 0 && (
                  <FloatingBadgesContainer floatingBadges={floatingBadges} />
                )}
              </div>
            </div>
          )}

          <div className="flex flex-wrap gap-4">
            {primaryCTA?.show && (
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-white rounded-full px-8 h-12 shadow-xl shadow-primary/25 hover:shadow-2xl hover:shadow-primary/30 transition-all hover:-translate-y-1"
                asChild
              >
                <a href={primaryCTA?.link}>{primaryCTA?.text}</a>
              </Button>
            )}
            {secondaryCTA?.show && (
              <Button
                variant="outline"
                size="lg"
                className="rounded-full cursor-pointer px-8 h-12 border-2 border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50 transition-all"
                onClick={handleSecondaryCTA}
              >
                {secondaryCTA?.icon && (
                  <DynamicIcon name={secondaryCTA?.icon} className="w-4 h-4 mr-2" />
                )}
                {secondaryCTA?.text}
              </Button>
            )}
          </div>

          {showSocialLinks && (
            <div className="mt-12 flex items-center gap-6 text-slate-400">
              {socialAccounts.map((socialAccount, i) => {
                return (
                  <a
                    key={i}
                    href={socialAccount?.profileLink}
                    target="_blank"
                    className="hover:text-primary transition-colors"
                  >
                    {!socialAccount?.enableIcon ? (
                      socialAccount?.name
                    ) : (
                      <SocialIcons icon={socialAccount?.icon} />
                    )}
                  </a>
                )
              })}
            </div>
          )}
        </motion.div>

        {showHeroImage && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className={`relative hidden md:block 
        ${layout === 'image-right' ? 'md:order-2' : 'md:order-1'}`}
          >
            <div className="relative z-10 w-full aspect-square max-w-md mx-auto">
              {/* Abstract tech visualization or profile image placeholder */}
              <div className="w-full h-full rounded-[2rem] bg-gradient-to-br from-slate-100 to-white shadow-2xl border border-white p-4 rotate-3 hover:rotate-0 transition-transform duration-500 ease-out">
                {/* Profile Image with descriptive comment */}
                {/* Unsplash image: Professional portrait of a developer or abstract tech */}
                <img
                  src={heroImageKey}
                  alt="Anil Puri Goswami"
                  className="w-full h-full object-cover rounded-[1.5rem]"
                />
              </div>

              {Array.isArray(floatingBadges) && floatingBadges.length > 0 && (
                <FloatingBadgesContainer floatingBadges={floatingBadges} />
              )}
              {/* Floating cards */}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  )
}

function HeroHeading({ headingText }) {
  return (
    <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold text-slate-900 leading-[1.1] mb-6">
      {headingText.split(/<mark>(.*?)<\/mark>/g).map((part, i) =>
        i % 2 === 1 ? (
          <span
            key={i}
            className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-indigo-600"
          >
            {part}
          </span>
        ) : (
          <React.Fragment key={i}>{part}</React.Fragment>
        ),
      )}
    </h1>
  )
}

function IntroText({ introText }) {
  return (
    <p className="text-xl text-slate-500 mb-8 max-w-lg leading-relaxed">
      {introText.split(/<b>(.*?)<\/b>/g).map((part, i) =>
        i % 2 === 1 ? (
          <strong className="text-slate-900" key={i}>
            {' '}
            {part}
          </strong>
        ) : (
          <React.Fragment key={i}>{part}</React.Fragment>
        ),
      )}
    </p>
  )
}

const positionClasses = {
  'top-left': 'top-8 left-0 -translate-x-1/2 -translate-y-1/2',
  'top-right': 'top-8 right-0 translate-x-1/2 -translate-y-1/2',
  'bottom-left': 'bottom-0 left-0 -translate-x-1/2 translate-y-1/2',
  'bottom-right': 'bottom-0 right-0 translate-x-1/2 translate-y-1/2',
  'middle-left': 'top-1/2 left-0 -translate-y-1/2 -translate-x-1/2',
  'middle-right': 'top-1/2 right-0 -translate-y-1/2 translate-x-1/2',
  'bottom-middle': 'bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2',
  'top-middle': 'top-0 left-1/2 -translate-x-1/2 -translate-y-1/2',
}

const FloatingBadge = ({
  title,
  value,
  icon,
  position = 'bottom-left',
  animateY = [0, -10, 0],
  duration = 4,
}) => {
  if (!positionClasses[position]) return null // fallback
  const fallbackBg = 'blue-100'
  const fallbackIconColor = 'white'

  const iconStyle = icon?.style?.enabled ? icon?.style : false
  const bgColor = detectColorType(iconStyle?.['bg-color'] ?? fallbackBg)?.css
  const iconColor = detectColorType(iconStyle?.['color'] ?? fallbackIconColor)?.css
  const bgShapeClass =
    iconStyle?.shape === 'circle'
      ? 'rounded-full'
      : iconStyle?.shape === 'square'
        ? 'rounded-none'
        : iconStyle?.shape === 'rounded'
          ? 'rounded'
          : 'rounded'
  return (
    <motion.div
      animate={{ y: animateY }}
      transition={{ repeat: Infinity, duration, ease: 'easeInOut' }}
      className={`absolute bg-white p-4 rounded-xl shadow-xl border border-slate-100 flex items-center gap-3 z-20 ${positionClasses[position]}`}
    >
      {icon && icon?.lib?.library == 'lucide' && icon?.lib?.name && (
        <div className={`bg-green-100 p-2  ${bgShapeClass}`} style={{ backgroundColor: bgColor }}>
          <DynamicIcon name={icon?.lib?.name} className="w-5 h-5" style={{ color: iconColor }} />
        </div>
      )}
      <div>
        <p className="text-xs text-slate-500 font-medium">{title}</p>
        <p className="text-sm font-bold text-slate-900">{value}</p>
      </div>
    </motion.div>
  )
}

// Example usage with an array
const FloatingBadgesContainer = ({ floatingBadges }) => {
  return (
    <>
      {floatingBadges.map((badge, index) => {
        if (!badge?.show) return null
        return (
          <FloatingBadge
            key={index}
            title={badge?.title}
            value={badge?.value}
            icon={badge?.enableIcon ? badge?.icon : null}
            position={badge.position}
            animateY={[0, -10, 0]}
            duration={4}
          />
        )
      })}
    </>
  )
}
