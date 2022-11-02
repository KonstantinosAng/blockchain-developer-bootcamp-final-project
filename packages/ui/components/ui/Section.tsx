import { ReactNode } from "react"

interface Props {
	children: ReactNode
	className?: string
	onClick?: () => void
}

export const Section = ({ children, ...rest }: Props) => {
	return <section {...rest}>{children}</section>
}
