import { ReactNode } from "react"

interface Props {
	children?: ReactNode | string
	className?: string
	onClick?: () => void
}

const common = "font-bold"

const H1 = ({ children, className, ...rest }: Props): JSX.Element => {
	return (
		<h1 className={`${className ?? ""} text-9xl ${common}`} {...rest}>
			{children}
		</h1>
	)
}

const H2 = ({ children, className, ...rest }: Props): JSX.Element => {
	return (
		<h2 className={`${className ?? ""} text-8xl ${common}`} {...rest}>
			{children}
		</h2>
	)
}

const H3 = ({ children, className, ...rest }: Props): JSX.Element => {
	return (
		<h3 className={`${className ?? ""} text-7xl ${common}`} {...rest}>
			{children}
		</h3>
	)
}

const H4 = ({ children, className, ...rest }: Props): JSX.Element => {
	return (
		<h4 className={`${className ?? ""} text-6xl ${common}`} {...rest}>
			{children}
		</h4>
	)
}

const H5 = ({ children, className, ...rest }: Props): JSX.Element => {
	return (
		<h5 className={`${className ?? ""} text-5xl ${common}`} {...rest}>
			{children}
		</h5>
	)
}

const H6 = ({ children, className, ...rest }: Props): JSX.Element => {
	return (
		<h6 className={`${className ?? ""} text-4xl ${common}`} {...rest}>
			{children}
		</h6>
	)
}

const H7 = ({ children, className, ...rest }: Props): JSX.Element => {
	return (
		<h6 className={`${className ?? ""} text-3xl ${common}`} {...rest}>
			{children}
		</h6>
	)
}

const H8 = ({ children, className, ...rest }: Props): JSX.Element => {
	return (
		<h6 className={`${className ?? ""} text-2xl ${common}`} {...rest}>
			{children}
		</h6>
	)
}

const H9 = ({ children, className, ...rest }: Props): JSX.Element => {
	return (
		<h6 className={`${className ?? ""} text-xl ${common}`} {...rest}>
			{children}
		</h6>
	)
}

const H10 = ({ children, className, ...rest }: Props): JSX.Element => {
	return (
		<h6 className={`${className ?? ""} text-lg ${common}`} {...rest}>
			{children}
		</h6>
	)
}

const H11 = ({ children, className, ...rest }: Props): JSX.Element => {
	return (
		<h6 className={`${className ?? ""} text-base`} {...rest}>
			{children}
		</h6>
	)
}

const H12 = ({ children, className, ...rest }: Props): JSX.Element => {
	return (
		<h6 className={`${className ?? ""} text-sm`} {...rest}>
			{children}
		</h6>
	)
}

const H13 = ({ children, className, ...rest }: Props): JSX.Element => {
	return (
		<h6 className={`${className ?? ""} text-xs`} {...rest}>
			{children}
		</h6>
	)
}

export { H1, H2, H3, H4, H5, H6, H7, H8, H9, H10, H11, H12, H13 }
