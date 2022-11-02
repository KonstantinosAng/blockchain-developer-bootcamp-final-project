import React from "react"
import { DocumentChartBarIcon } from "@heroicons/react/24/solid"

interface Props {
	className?: string
	onClick?: () => void
}

export const DocumentIcon = ({ ...rest }: Props) => {
	return <DocumentChartBarIcon {...rest} />
}
