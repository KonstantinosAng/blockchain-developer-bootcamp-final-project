export const arrowHeight = 10

interface Props {
	style?: object
	side?: string
	arrowCustomStyle?: string
	onClick?: () => void
}

const Arrow = ({ style, side, arrowCustomStyle, ...rest }: Props) => {
	return <div className={`arrow ${side} bg-slate-800 ${arrowCustomStyle}`} style={style} {...rest} />
}

export default Arrow
