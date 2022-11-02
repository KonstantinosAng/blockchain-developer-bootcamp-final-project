import Image from "next/future/image"
import { Flex, Box, Header, H10, H13, Bars3Icon } from "ui"
import NavButton from "@design/NavButton"
import { useDisconnect } from "@thirdweb-dev/react"
import { useMetaMaskStore } from "@hooks/useMetaMaskStore"
import { getAvatarURL } from "@constants"
import { useEffect, useState } from "react"
import useWindowScroll from "@hooks/useWindowScroll"

interface Props {}

const HeaderBar = ({ ...rest }: Props): JSX.Element => {
	const disconnect = useDisconnect()
	const address = useMetaMaskStore((state: MetamaskStoreStateProps) => state.address)
	const [scroll, setScroll] = useState(false)
	const { y } = useWindowScroll()

	useEffect(() => {
		if (y > 8) {
			setScroll(true)
		} else {
			setScroll(false)
		}
	}, [y])

	return (
		<Header
			className={`450:p-5 fixed top-0 grid w-full grid-cols-5 items-center justify-between px-2 py-5 transition-all duration-500 ${
				scroll
					? "bg-basicBackground top-2 right-5 left-5 z-10 w-auto rounded-xl bg-opacity-40 py-2 pl-1 pr-5 shadow-xl drop-shadow-xl backdrop-blur-md"
					: ""
			}`}
			{...rest}
		>
			<Flex className="300:col-span-4 col-span-3 w-full items-center justify-start space-x-2 md:col-span-2">
				<Image
					src={getAvatarURL(address)}
					className="450:w-16 -mt-4 w-14 rounded-full object-contain md:w-20"
					width={80}
					height={80}
					alt="user logo"
					priority
				/>
				<Box>
					<H10 className="text-teal-600">ConsenSys Casino</H10>
					<H13 className="truncate text-pink-600">
						User: {address?.substring(0, 5)}...{address?.substring(address?.length, address?.length - 5)}
					</H13>
				</Box>
			</Flex>
			<Box className="hidden items-center justify-center md:flex">
				<Flex className="gap-x-2 whitespace-nowrap rounded-md bg-teal-600 bg-opacity-10 p-4 shadow-lg drop-shadow-lg">
					<NavButton isActive>Buy Tickets</NavButton>
					<NavButton onClick={disconnect}>Logout</NavButton>
				</Flex>
			</Box>
			<Flex className="ml-auto flex-col gap-2 text-right md:col-span-2">
				<Bars3Icon className="mx-auto hidden h-8 w-8 text-slate-100 md:block" />
				<span className="rounded-md bg-teal-600 md:hidden md:bg-transparent">
					<NavButton onClick={disconnect}>Logout</NavButton>
				</span>
			</Flex>
		</Header>
	)
}

export default HeaderBar
