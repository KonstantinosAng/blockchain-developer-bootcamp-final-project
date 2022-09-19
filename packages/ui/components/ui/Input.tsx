interface Props {
	className?: string
	type?: string
	min?: number
	max?: number
	value?: number
	onChange?: (event: Event) => void
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
