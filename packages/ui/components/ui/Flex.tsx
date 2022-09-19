import { ReactNode } from "react"

interface Props {
	className?: string
	children?: ReactNode | string
}

export const Flex = ({ className, children, ...rest }: Props) => {
	return (
		<div className={`flex ${className ?? ""}`} {...rest}>
			{children}
		</div>
	)
}
