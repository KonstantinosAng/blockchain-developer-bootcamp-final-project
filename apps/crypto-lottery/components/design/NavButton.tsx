import { ReactNode } from "react"
import { Button } from "ui"

interface Props {
	children: ReactNode
	isActive?: boolean
	onClick?: () => void
	className?: string
}

const NavButton = ({ isActive, onClick, className, children, ...rest }: Props): JSX.Element => {
	return (
		<Button
			onClick={onClick}
			className={`${isActive && "bg-teal-600"} 450:py-2 450:px-4 rounded px-3 py-1 font-semibold text-slate-100 hover:bg-teal-500 ${className}`}
			{...rest}
		>
			{children}
		</Button>
	)
}

export default NavButton
