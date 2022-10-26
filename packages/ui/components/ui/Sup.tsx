import { ReactNode } from "react"
interface Props {
	children?: ReactNode
	className?: string
}

export const Sup = ({ children, ...rest }: Props) => {
	return <sup {...rest}>{children}</sup>
}
