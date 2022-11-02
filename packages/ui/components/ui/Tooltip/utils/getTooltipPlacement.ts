import { anchor } from "react-laag"
export const left = { anchor: anchor.LEFT_CENTER }
export const right = { anchor: anchor.RIGHT_CENTER }
export const top = { anchor: anchor.TOP_CENTER }
export const bottom = { anchor: anchor.BOTTOM_CENTER }

const getTooltipPlacement = (placement: string) => {
	switch (placement) {
		case "top":
			return top
		case "bottom":
			return bottom
		case "right":
			return right
		default:
			return top
	}
}

export default getTooltipPlacement
