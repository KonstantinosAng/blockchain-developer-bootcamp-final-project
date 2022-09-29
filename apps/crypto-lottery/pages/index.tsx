import { LoadingWrapper, Box, Flex } from "ui"
import HeaderBar from "@design/HeaderBar"
import { SmartContract } from "@thirdweb-dev/sdk"
import BuyTickets from "@design/BuyTickets"
import Pool from "@design/Pool"

interface HomeProps {
	contract: SmartContract
}

const Home = ({ contract }: HomeProps) => {
	return (
		<Flex className="bg-basicBackground min-h-screen flex-col">
			<LoadingWrapper loading={!contract}>
				<HeaderBar />
				<Box className="my-16 mx-5 items-start justify-center space-y-5 md:flex md:flex-row md:space-x-5 md:space-y-0">
					<Pool />
					<BuyTickets />
				</Box>
			</LoadingWrapper>
		</Flex>
	)
}

export default Home
