import { cn } from '@zeak/react';
import React from 'react'

type DetailsSectionProps = {
  title: string;
  items: { title: string; value: string | number | boolean | null | React.ReactNode }[];
  className?: string;
}

const DetailsSection: React.FC<DetailsSectionProps> = ({ title, items, className }: DetailsSectionProps): JSX.Element => {
  return <section className='flex'>
    <div className={cn('w-[30%] p-6 bg-[#D5E0ED] rounded-[12px] rounded-r-none', className)}>
      <p className='text-secondary-tertiary text-[26px]'>{title}</p>
    </div>
    <div className='flex-1 px-10 py-6 pr-6 rounded-[12px] bg-white rounded-l-none'>
      <div className='grid grid-cols-[1fr_1fr] gap-x-10 gap-y-6'>
        {items.filter(item => item.value).map((item) => (<div key={item.title}>
          <p className='text-sm text-secondary-tertiary font-medium'>{item.title}</p>
          <div className='text-[16px] text-text-dark mt-1 font-medium'>{item.value}</div>
        </div>))}
      </div>
    </div>
  </section>
}

export default DetailsSection;