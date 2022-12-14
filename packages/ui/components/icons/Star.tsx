import React from "react"
import { StarIcon } from "@heroicons/react/24/solid"

interface Props {
	className?: string
	onClick?: () => void
}

export const Star = ({ ...rest }: Props) => {
	return <StarIcon {...rest} />
}
