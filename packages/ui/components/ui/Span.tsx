import { ReactNode } from "react"
interface Props {
	children?: ReactNode
	className?: string
	onClick?: () => void
}

export const Span = ({ children, ...rest }: Props) => {
	return <span {...rest}>{children}</span>
}
