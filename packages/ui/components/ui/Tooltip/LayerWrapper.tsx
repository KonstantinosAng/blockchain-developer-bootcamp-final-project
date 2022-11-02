import { ReactElement } from "react"
import { Transition } from "react-transition-group"
import Arrow from "./Arrow"
import TooltipContent from "./TooltipContent"

interface TooltipContentDataProps {
	label?: string
	value?: string
}

interface Props {
	isOpen?: boolean
	layerProps?: object
	layerSide?: string
	arrowStyle?: object
	listeners?: object
	className?: string
	data?: Array<TooltipContentDataProps>
	content?: ReactElement
	arrowCustomStyle?: string
	onClick?: () => void
	findDOMNode?: () => void
}

const LayerWrapper = ({
	isOpen,
	layerProps,
	layerSide,
	arrowStyle,
	listeners,
	className,
	data,
	content,
	findDOMNode,
	arrowCustomStyle,
	...rest
}: Props) => {
	// We need a slight enter delay to ensure the CSS transition runs from the
	// intended start position
	const enter = 0
	const exit = 50
	return (
		<Transition in={isOpen} timeout={{ enter, exit }} unmountOnExit>
			{(transition: string) => (
				<div className={`tooltip ${layerSide} ${className} ${transition === "entered" && "visible"} z-10`} {...layerProps} {...listeners} {...rest}>
					<div>{data ? <TooltipContent data={data} /> : <div>{content}</div>}</div>
					<Arrow style={arrowStyle} side={layerSide} arrowCustomStyle={arrowCustomStyle} />
				</div>
			)}
		</Transition>
	)
}

export default LayerWrapper
