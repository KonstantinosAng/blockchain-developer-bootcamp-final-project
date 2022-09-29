import React from "react"
import { Box } from "ui"

interface Props {}

const CountDown = ({ ...rest }: Props) => {
	return (
		<Box className="stats-container space-y-8" {...rest}>
			Countdown
		</Box>
	)
}

export default CountDown
