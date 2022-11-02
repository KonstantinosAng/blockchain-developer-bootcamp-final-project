import React from "react"
import { Box, H6 } from "ui"

interface Props {
	number?: number
}

const NumberLabel = ({ number, ...rest }: Props) => {
	return (
		<Box className="absolute -bottom-1 right-2 text-amber-500" {...rest}>
			<H6 className="islandMoments">{number !== undefined && number !== null ? `${number + 1}.` : `1.`}</H6>
		</Box>
	)
}

export default NumberLabel
