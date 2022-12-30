import { ReactNode, useEffect, useRef } from "react"
import { useWindowSize } from "react-use"
import VanillaTilt from "vanilla-tilt"
import { Ref } from "./Ref"

interface Props {
	children?: ReactNode
	maxTilt?: number
	tiltSpeed?: number
	glare?: boolean
	maxGlare?: number
	className?: string
}

export const Tilt = ({ children, maxTilt = 5, tiltSpeed = 10, glare = false, maxGlare = 0.5, ...rest }: Props) => {
	const childRef = useRef<any>()
	const { width } = useWindowSize()

	useEffect(() => {
		if (childRef?.current) {
			if (width >= 640) {
				VanillaTilt.init(childRef.current, {
					max: maxTilt,
					speed: tiltSpeed,
					glare,
					"max-glare": maxGlare,
				})
			} else {
				if ("vanillaTilt" in childRef.current) {
					childRef.current?.vanillaTilt?.destroy()
				}
			}
		}
	}, [childRef, width, maxTilt, tiltSpeed, glare, maxGlare])

	return (
		<Ref ref={childRef} {...rest}>
			{children}
		</Ref>
	)
}
