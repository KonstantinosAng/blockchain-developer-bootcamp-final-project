import React from "react"
import useWindowSize from "react-use/lib/useWindowSize"
import Confetti from "react-confetti"

interface Props {
	run?: boolean
	customWidth?: number
	customHeight?: number
	className?: string
	style?: object
	onClick?: () => void
}

export const WindowConfetti = ({ run, customWidth, customHeight, ...rest }: Props) => {
	const { width, height } = useWindowSize()
	return <Confetti run={run} numberOfPieces={400} width={customWidth ?? width} height={customHeight ?? height} {...rest} />
}
