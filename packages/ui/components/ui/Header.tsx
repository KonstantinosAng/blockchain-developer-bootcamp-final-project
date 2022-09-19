import { ReactNode } from "react"

type Props = {
	children: ReactNode
	className?: string
}

const Header = ({ children, ...rest }: Props) => {
	return <header {...rest}>{children}</header>
}

export { Header }
