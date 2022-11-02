import React from "react"
import { ArrowPathIcon } from "@heroicons/react/24/solid"

interface Props {
	className?: string
	onClick?: () => void
}

export const ArrowIcon = ({ ...rest }: Props) => {
	return <ArrowPathIcon {...rest} />
}
