import { ReactNode } from "react"
import Marquee from "react-fast-marquee"

type Props = {
	className?: string
	children?: ReactNode
}

export const MarqueeBanner = ({ className, children, ...rest }: Props) => {
	return (
		<Marquee className={`bg-teal-600 bg-opacity-10 p-2 text-slate-100 ${className}`} gradient={false} speed={100} {...rest}>
			{children}
		</Marquee>
	)
}
