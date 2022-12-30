import { useState, useEffect, useCallback, useTransition } from "react"

export const useWindowSize = () => {
	const getSize = useCallback(() => {
		if (typeof window === "object") {
			return {
				width: window.innerWidth,
				height: window.innerHeight,
			}
		}
		return {
			width: 0,
			height: 0,
		}
	}, [])

	const [isPending, setTransition] = useTransition()
	const [windowSize, setWindowSize] = useState(() => getSize())

	useEffect(() => {
		function handleResize() {
			setTransition(() => setWindowSize(getSize()))
		}
		window.addEventListener("resize", handleResize)

		return () => {
			window.removeEventListener("resize", handleResize)
		}
	}, [getSize])

	return windowSize
}
