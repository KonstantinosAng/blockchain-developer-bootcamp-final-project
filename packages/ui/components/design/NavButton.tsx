import { ReactNode } from "react"
import { Button } from "../ui/Button"

interface Props {
	children: ReactNode
	isActive?: boolean
	onClick?: () => void
}

export const NavButton = ({ isActive, onClick, children, ...rest }: Props): JSX.Element => {
	return (
		<Button onClick={onClick} className={`${isActive && "bg-blue-600"} rounded py-2 px-4 font-bold text-white hover:bg-blue-500`} {...rest}>
			{children}
		</Button>
	)
}
