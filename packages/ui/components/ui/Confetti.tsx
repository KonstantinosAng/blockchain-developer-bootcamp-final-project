import React from "react"
import useWindowSize from "react-use/lib/useWindowSize"
import Confetti from "react-confetti"

interface Props {
	run?: boolean
}

export const WindowConfetti = ({ run, ...rest }: Props) => {
	const { width, height } = useWindowSize()
	return <Confetti run={run} numberOfPieces={400} width={width} height={height} {...rest} />
}
