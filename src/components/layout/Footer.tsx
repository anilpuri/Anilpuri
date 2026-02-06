import SocialIcons from '../ui/social-icons'

export default function Footer({
  socialAccounts,
  createdAt,
  globalType,
  logo,
  navItems,
  updatesAt,
  quote,
  personalDetails,
}) {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-slate-50 border-t border-slate-200 py-12 mt-16">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            {logo?.type == 'text' && (
              <h3 className="font-display font-bold text-2xl tracking-tighter text-slate-900">
                {logo?.text}
                {logo?.highlight && <span className="text-primary">{logo?.highlight}</span>}
              </h3>
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
            {quote && <p className="text-slate-500 mt-2 text-sm">{quote}</p>}
          </div>

          <div className="flex space-x-6">
            {(socialAccounts || []).map((item, index) => {
              return (
                <a
                  key={index}
                  href={item?.profileLink}
                  target="_blank"
                  className="hover:text-primary transition-colors"
                >
                  {!item?.enableIcon ? item?.name : <SocialIcons icon={item?.icon} />}
                </a>
              )
            })}
          </div>
        </div>

        <div className="border-t border-slate-200 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-slate-500">
          <p>
            © {currentYear} {personalDetails?.fullName}. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            {/* <span className="hover:text-slate-800 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-800 cursor-pointer">Terms of Service</span> */}
          </div>
        </div>
      </div>
    </footer>
  )
}
