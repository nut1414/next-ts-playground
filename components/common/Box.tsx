import React from 'react'

type BoxProps = {
  color?: string,
  textColor?: string,
  className?: string,
  children: React.ReactNode
}

const Box = ({ color = '#ffffff',
  textColor = '#000000',
  className,
  children }: BoxProps) => {
  return (
    <div className={`bg-[${color}] text-[${textColor}] p-5 drop-shadow-md  ${className}`}>
      {children}
    </div>
  )
}
export default Box