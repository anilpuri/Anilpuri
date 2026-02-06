'use client'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import { motion } from 'framer-motion'
import Link from 'next/link'

const BackToLink = ({ label = '', link = '' }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="pt-25"
    >
      <div className="container-custom">
        <Link href={link} className="cursor-pointer">
          <Button
            variant="ghost"
            className="mb-8 text-slate-500 cursor-pointer hover:text-primary pl-0 hover:bg-transparent"
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> {label}
          </Button>
        </Link>
      </div>
    </motion.div>
  )
}

export default BackToLink
