import Body from './body/Body'
import Filter from './filter/Filter'
import React from 'react'

function Home() {
  return (
    <div className='flex gap-2' >
      <div className='max-[570px]:hidden'>
      <Filter/>
      </div>
      <Body/>
      
    </div>
  )
}

export default Home
