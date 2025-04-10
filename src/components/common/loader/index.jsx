import React from 'react'
import './style.css'

export const Loader = ({ loading, children }) => {
  const loader = (
    <div className='loader component' key='loader'>
      <span>LOADING</span>
      <div className='loader__dots'>
        <span className='loader__dots__dot' />
        <span className='loader__dots__dot' />
        <span className='loader__dots__dot' />
        <span className='loader__dots__dot' />
      </div>
    </div>
  )
  return <div className='loader-container'>{loading ? loader : children}</div>
}
