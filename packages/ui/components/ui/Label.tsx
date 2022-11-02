import { ReactNode } from "react"

interface Props {
	children: ReactNode
	name?: string
	onClick?: () => void
}

const Label = ({ children, name }: Props) => {
	return <label htmlFor={name}>{children}</label>
}

export { Label }
