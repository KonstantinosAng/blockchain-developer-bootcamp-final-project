import { Fragment, ReactNode } from "react"
import { Jelly } from "@uiball/loaders"

type Props = {
	loading?: boolean
	children: ReactNode
	size?: number
}

export const LoadingWrapper = ({ loading, children, size = 50 }: Props): JSX.Element => {
	return loading ? (
		<div className="flex w-full flex-1 items-center justify-center bg-transparent text-xl">
			<Jelly size={size} color="rgb(37 99 235)" />
		</div>
	) : (
		<Fragment>{children}</Fragment>
	)
}
