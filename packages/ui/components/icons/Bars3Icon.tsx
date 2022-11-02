import React from "react"
import { Bars3BottomRightIcon } from "@heroicons/react/24/solid"

interface Props {
	className?: string
	onClick?: () => void
}

export const Bars3Icon = ({ ...rest }: Props) => {
	return <Bars3BottomRightIcon {...rest} />
}
