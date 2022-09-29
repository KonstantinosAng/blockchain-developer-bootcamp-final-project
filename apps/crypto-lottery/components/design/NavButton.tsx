import { ReactNode } from "react"
import { Button } from "ui"

interface Props {
	children: ReactNode
	isActive?: boolean
	onClick?: () => void
}

const NavButton = ({ isActive, onClick, children, ...rest }: Props): JSX.Element => {
	return (
		<Button onClick={onClick} className={`${isActive && "bg-teal-600"} rounded py-2 px-4 font-semibold text-slate-100 hover:bg-teal-500`} {...rest}>
			{children}
		</Button>
	)
}

export default NavButton
