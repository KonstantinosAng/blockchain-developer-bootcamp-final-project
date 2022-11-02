import { H11 } from "../Headings"

interface TooltipContentDataProps {
	label?: string
	value?: string
}

interface Props {
	data: Array<TooltipContentDataProps>
	onClick?: () => void
}

const TooltipContent: React.FC<Props> = ({ data, ...rest }) => {
	return data?.length ? (
		<>
			{data.map(({ label, value }: TooltipContentDataProps, idx: number) => (
				<div key={`${label}-${value}-${idx}`} className="tooltipContent font-bold" {...rest}>
					<H11>{label}</H11>
					<H11>{value}</H11>
				</div>
			))}
		</>
	) : (
		<></>
	)
}

export default TooltipContent
