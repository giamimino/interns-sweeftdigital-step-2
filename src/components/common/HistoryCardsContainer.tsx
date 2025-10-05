import { Children } from '@/types/globa'
import React from 'react'

export default function HistoryCardsContainer({children}: Children) {
  return (
    <div className='flex flex-col gap-2.5'>{children}</div>
  )
}
