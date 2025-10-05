import { Children } from '@/types/globa'
import React, { DetailedHTMLProps, HTMLAttributes } from 'react'

export default function ImagesContainer({ children, ...rest}:Children & DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>) {
  return (
    <div className='flex flex-wrap gap-2.5 justify-center' {...rest}>{children}</div>
  )
}
