import { Children } from '@/types/globa'
import React from 'react'

export default function ImagesContainer({ children }:Children) {
  return (
    <div className='flex flex-wrap gap-2.5 justify-center'>{children}</div>
  )
}
