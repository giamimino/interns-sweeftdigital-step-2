import React from 'react'

export default function ImageLazy() {
  return (
    <div className='p-2 border-1 basis-1/4 h-fit border-black 
    max-w-55 flex flex-col gap-2.5 rounded-sm items-center'>
      <div className='bg-gray-600 animate-pulse w-50 h-50 rounded-sm'></div>
      <div className='text-center bg-gray-600 animate-pulse w-full h-5 cursor-pointer text-wrap'>
      </div>
    </div>
  )
}
