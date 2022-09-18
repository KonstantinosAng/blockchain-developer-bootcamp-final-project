import React from "react"

interface Props {
  children?: JSX.Element | string
}

export const Box = ({ children, ...rest }: Props) => {
  return <div {...rest}>{children}</div>
}
