import React from "react"
import { ArrowUturnDownIcon } from "@heroicons/react/24/solid"

interface Props {
	className?: string
	onClick?: () => void
}

export const ArrowTurnDownIcon = ({ ...rest }: Props) => {
	return <ArrowUturnDownIcon {...rest} />
}
