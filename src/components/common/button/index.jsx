import React from 'react'

export const Button = (props) => {
  const { children, onClick, style } = props
  return (
    <div style={style}>
      <button className='button-primary' onClick={onClick}>
        {children}
      </button>
    </div>
  )
}
