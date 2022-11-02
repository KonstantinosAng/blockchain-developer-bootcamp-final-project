import { ReactNode } from "react"

interface Props {
	className?: string
	children?: ReactNode | string
	onClick?: () => void
}

export const Grid = ({ className, children, ...rest }: Props) => {
	return (
		<div className={`grid ${className ?? ""}`} {...rest}>
			{children}
		</div>
	)
}
