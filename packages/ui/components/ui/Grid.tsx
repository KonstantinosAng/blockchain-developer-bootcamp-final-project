import React from "react"

interface Props {
  className?: string
  children?: JSX.Element | string
}

const Grid = ({ className, children, ...rest }: Props) => {
  return (
    <div className={`grid ${className ?? ""}`} {...rest}>
      {children}
    </div>
  )
}

export default Grid
