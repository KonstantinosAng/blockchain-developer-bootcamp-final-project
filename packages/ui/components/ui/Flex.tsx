import React from "react"

interface Props {
  className?: string
  children?: JSX.Element | string
}

const Flex = ({ className, children, ...rest }: Props) => {
  return (
    <div className={`flex ${className ?? ""}`} {...rest}>
      {children}
    </div>
  )
}

export default Flex
