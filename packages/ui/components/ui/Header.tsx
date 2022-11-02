import { ReactNode } from "react"

type Props = {
	children: ReactNode
	className?: string
	onClick?: () => void
}

const Header = ({ children, ...rest }: Props) => {
	return <header {...rest}>{children}</header>
}

export { Header }
