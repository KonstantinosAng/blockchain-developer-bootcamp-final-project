import Image from "next/future/image"
import Logo from "ui/assets/winner.png"
import { NavButton } from "./NavButton"
import { Bars3BottomRightIcon } from "@heroicons/react/24/solid"
import { Flex } from "../ui/Flex"
import { Box } from "../ui/Box"
import { Header } from "../ui/Header"
import { H10, H13 } from "../ui/Headings"

interface Props {
	address?: string
	disconnect?: () => void
}

export const HeaderBar = ({ address, disconnect, ...rest }: Props): JSX.Element => {
	return (
		<Header className="grid grid-cols-2 items-center justify-between p-5 md:grid-cols-5" {...rest}>
			<Flex className="items-center space-x-2">
				<Image src={Logo} className="rounded-full" width={80} height={80} alt="" priority />
				<Box>
					<H10 className="text-pink-600">ConsenSys</H10>
					<H13 className="truncate text-sky-600">
						User: {address?.substring(0, 5)}...{address?.substring(address?.length, address?.length - 5)}
					</H13>
				</Box>
			</Flex>
			<Box className=" hidden items-center justify-center md:col-span-3 md:flex">
				<Box className="bg-headerBackground space-x-2 rounded-md p-4 ">
					<NavButton isActive>Buy Tickets</NavButton>
					<NavButton onClick={disconnect}>Logout</NavButton>
				</Box>
			</Box>
			<Flex className="ml-auto flex-col text-right">
				<Bars3BottomRightIcon className="mx-auto h-8 w-8 cursor-pointer text-white" />
				<span className="md:hidden">
					<NavButton onClick={disconnect}>Logout</NavButton>
				</span>
			</Flex>
		</Header>
	)
}
