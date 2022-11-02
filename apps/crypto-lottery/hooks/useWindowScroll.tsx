import { useState, useEffect, useCallback } from "react"

const useWindowScroll = () => {
	const getScroll = useCallback(() => {
		if (typeof window === "object") {
			return {
				x: window.scrollX,
				y: window.scrollY,
			}
		}
		return { x: 0, y: 0 }
	}, [])

	const [scroll, setScroll] = useState(getScroll)

	useEffect(() => {
		const handleScroll = () => {
			setScroll(getScroll())
		}

		window.addEventListener("scroll", handleScroll)

		return () => {
			window.removeEventListener("scroll", handleScroll)
		}
	}, [getScroll])

	return scroll
}

export default useWindowScroll
