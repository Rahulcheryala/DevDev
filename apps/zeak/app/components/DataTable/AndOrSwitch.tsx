'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@zeak/react'

interface AndOrSwitchProps {
  value: 'AND' | 'OR'
  onChange: (value: 'AND' | 'OR') => void
  className?: string
}

export default function AndOrSwitch({
  value,
  onChange,
  className
}: AndOrSwitchProps) {
  return (
    <div 
      className={cn(
        "flex h-12 rounded-zeak bg-white border overflow-hidden w-[144px] relative",
        className
      )}
    >
      <motion.div 
        className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500"
        initial={false}
        animate={{
          clipPath: value === 'AND' 
            ? 'inset(0 50% 0 0)' 
            : 'inset(0 0 0 50%)'
        }}
        transition={{
          type: "spring",
          stiffness: 800,
          damping: 40
        }}
      />
      <button
        onClick={() => onChange('AND')}
        className={cn(
          "relative flex-1 text-sm font-medium text-[11px] transition-colors duration-200",
          value === 'AND' ? "text-white" : "text-blue-500"
        )}
      >
        AND
      </button>
      <div className="w-[1px] bg-gray-200 self-stretch" />
      <button
        onClick={() => onChange('OR')}
        className={cn(
          "relative flex-1 text-sm font-medium transition-colors duration-200",
          value === 'OR' ? "text-white" : "text-blue-500"
        )}
      >
        OR
      </button>
    </div>
  )
}

