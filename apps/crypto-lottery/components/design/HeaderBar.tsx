import Image from "next/future/image"
import Logo from "ui/assets/winner.png"
import { Flex, Box, Header, H10, H13 } from "ui"
import NavButton from "@design/NavButton"
import { Bars3BottomRightIcon } from "@heroicons/react/24/solid"
import { useDisconnect } from "@thirdweb-dev/react"
import { useContractStore } from "@hooks/useContractStore"
import { ContractStoreStateProps } from "@stores/contractStore"

interface Props {}

const HeaderBar = ({ ...rest }: Props): JSX.Element => {
	const disconnect = useDisconnect()
	const address = useContractStore((state: ContractStoreStateProps) => state.address)

	return (
		<Header className="grid grid-cols-2 items-center justify-between p-5 md:grid-cols-5" {...rest}>
			<Flex className="items-center space-x-2">
				<Image src={Logo} className="rounded-full" width={80} height={80} alt="" priority />
				<Box>
					<H10 className="text-teal-600">ConsenSys</H10>
					<H13 className="truncate text-pink-600">
						User: {address?.substring(0, 5)}...{address?.substring(address?.length, address?.length - 5)}
					</H13>
				</Box>
			</Flex>
			<Box className="hidden items-center justify-center md:col-span-3 md:flex">
				<Box className="space-x-2 rounded-md bg-teal-600 bg-opacity-10 p-4 shadow-lg drop-shadow-lg">
					<NavButton isActive>Buy Tickets</NavButton>
					<NavButton onClick={disconnect}>Logout</NavButton>
				</Box>
			</Box>
			<Flex className="ml-auto flex-col gap-2 text-right">
				<Bars3BottomRightIcon className="mx-auto h-8 w-8 cursor-pointer text-slate-100" />
				<span className="md:hidden">
					<NavButton onClick={disconnect}>Logout</NavButton>
				</span>
			</Flex>
		</Header>
	)
}

export default HeaderBar
