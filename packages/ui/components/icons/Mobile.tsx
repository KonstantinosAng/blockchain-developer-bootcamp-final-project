import { DevicePhoneMobileIcon } from "@heroicons/react/24/solid"

interface Props {
	className?: string
	onClick?: () => void
}

const Mobile = ({ ...rest }: Props) => {
	return <DevicePhoneMobileIcon {...rest} />
}

export { Mobile }
