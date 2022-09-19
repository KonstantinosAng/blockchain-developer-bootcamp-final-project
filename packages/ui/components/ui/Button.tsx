import { ReactNode } from "react"

interface Props {
	children?: ReactNode
	className?: string
	disabled?: boolean
	type?: "submit" | "reset" | "button"
	onClick?: () => void
}

const Button = ({ children, className, type = "button", ...rest }: Props) => {
	return (
		<button className={className} type={type} {...rest}>
			{children}
		</button>
	)
}

export { Button }
