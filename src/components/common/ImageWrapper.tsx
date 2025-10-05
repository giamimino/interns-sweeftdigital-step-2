import { ImageWrapperProps } from '@/types/props'
import React from 'react'

export default function ImageWrapper({ title, img }:ImageWrapperProps) {
  return (
    <div className='p-2 border-1 basis-1/4 h-auto border-black 
    max-w-55 flex flex-col gap-2.5 rounded-sm items-center max-[800px]:basis-1/2'>
      <img src={img} alt="" className=' object-cover w-50 h-50 rounded-sm max-[800px]:max-w-45 max-[800px]:max-h-45' />
      <p className='text-center hover:text-yellow-400 cursor-pointer text-wrap'>
        {title}
      </p>
    </div>
  )
}
