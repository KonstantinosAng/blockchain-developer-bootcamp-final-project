import { ReactNode } from "react"

interface Props {
	children?: ReactNode | string
	className?: string
}

export const Box = ({ children, ...rest }: Props): JSX.Element => {
	return <div {...rest}>{children}</div>
}
