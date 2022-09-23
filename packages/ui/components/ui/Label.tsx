import { ReactNode } from "react"

interface Props {
	children: ReactNode
	name?: string
}

const Label = ({ children, name }: Props) => {
	return <label htmlFor={name}>{children}</label>
}

export default Label
