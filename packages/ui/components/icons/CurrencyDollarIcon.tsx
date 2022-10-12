import React from "react"
import { CurrencyDollarIcon } from "@heroicons/react/24/solid"

interface Props {
	className?: string
}

export const CurrencyIcon = ({ ...rest }: Props) => {
	return <CurrencyDollarIcon {...rest} />
}
