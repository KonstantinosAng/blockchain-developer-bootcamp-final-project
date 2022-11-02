import { forwardRef, ReactNode } from "react"

interface Props {
	children?: ReactNode
	className?: string
	onClick?: () => void
}

export const Ref = forwardRef<HTMLInputElement, Props>(({ children, ...props }, ref) => {
	return (
		<div ref={ref} {...props}>
			{children}
		</div>
	)
})

Ref.displayName = "Ref"
