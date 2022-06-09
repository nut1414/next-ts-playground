import React from 'react'

type ButtonProps = {
  color?: String,
  textColor?: String,
  className?: String,
  activeColor?: String,
  hoverColor?: String,
  onClick?: () => void,
  children: React.ReactNode
}

const ButtonBox = ({ color = '#1f80ca',
                      textColor = '#ffffff',
                      className,
                      activeColor = '#777',
                      hoverColor,
                      onClick,
                      children }: ButtonProps) => {
  return (
     <button onClick={onClick} className={`bg-[${color}] text-[${textColor}] active:bg-[${activeColor}] text-center align-middle drop-shadow-md p-2 ${className}`}>
       {children}
     </button>
  )
}

export default ButtonBox