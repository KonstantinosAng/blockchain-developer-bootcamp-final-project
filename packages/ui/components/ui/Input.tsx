interface Props {
	className?: string
	type?: string
	min?: number
	max?: number
	value?: number
	name?: string
	onChange?: (event: Event) => void
	onClick?: () => void
}

interface Event {
	target: Value
}

interface Value {
	value: string
}

const Input = ({ ...rest }: Props) => {
	return <input {...rest} />
}

export { Input }
