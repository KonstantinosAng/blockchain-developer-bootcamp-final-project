import { Ref } from "../Ref"
import { ToggleLayer } from "react-laag"
import { useState, ReactElement } from "react"
import ResizeObserver from "resize-observer-polyfill"
import { arrowHeight } from "./Arrow"
import LayerWrapper from "./LayerWrapper"
import getTooltipPlacement from "./utils/getTooltipPlacement"
import { Container, RenderLayerProps } from "react-laag/dist/ToggleLayer/types"

interface TooltipContentDataProps {
	label?: string
	value?: string
}

interface Props {
	className?: string
	content?: ReactElement
	fixed?: boolean
	offset?: number
	container?: Container
	hover?: boolean
	open?: boolean
	placement?: string
	closeOnOutsideClick?: boolean
	data: Array<TooltipContentDataProps>
	isRendered?: boolean
	children?: any
	arrowCustomStyle?: string
	onClick?: () => void
}

interface LayerProps extends RenderLayerProps {
	findDOMNode?: () => void
}

const Tooltip = ({
	className,
	content,
	fixed = true,
	offset,
	container,
	hover = true,
	open = false,
	placement = "top",
	closeOnOutsideClick = true,
	data,
	isRendered = true,
	arrowCustomStyle,
	children,
	...props
}: Props) => {
	const [show, setShow] = useState(false)
	const listeners = {
		onMouseEnter: () => setShow(true),
		onMouseLeave: () => setShow(false),
		onMouseOver: () => setShow(true),
	}
	const tooltipPlacement = getTooltipPlacement(placement)
	const config = {
		isOpen: hover ? show : open,
		placement: {
			autoAdjust: true,
			triggerOffset: (offset || 0) + arrowHeight,
			scrollOffset: 5,
			...tooltipPlacement,
		},
		ResizeObserver,
		container,
		fixed,
		closeOnOutsideClick,
		renderLayer: ({ findDOMNode, close, triggerRect, ...rest }: LayerProps) => (
			<LayerWrapper arrowCustomStyle={arrowCustomStyle} listeners={listeners} className={className} content={content} data={data} {...rest} />
		),
	}
	return isRendered ? (
		<ToggleLayer {...config}>
			{({ triggerRef }) => {
				if (typeof children === "function") {
					// Custom component; we're going to pass it a number of properties so
					// the component can decide how to control the tooltip
					return children({
						content,
						listeners,
						ref: triggerRef,
					})
				}
				// Add the hover listeners and ref automatically to keep it simple
				return (
					<Ref className="align-center pointer-events-auto z-10 flex w-fit" ref={triggerRef} {...listeners} {...props}>
						{children}
					</Ref>
				)
			}}
		</ToggleLayer>
	) : (
		children
	)
}

export default Tooltip
