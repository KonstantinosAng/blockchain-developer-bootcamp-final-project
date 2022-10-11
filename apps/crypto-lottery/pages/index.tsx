import { LoadingWrapper, Box, Flex, H13 } from "ui"
import HeaderBar from "@design/HeaderBar"
import { SmartContract } from "@thirdweb-dev/sdk"
import BuyTickets from "@design/BuyTickets"
import Pool from "@design/Pool"

interface HomeProps {
	contract: SmartContract
}

const Home = ({ contract }: HomeProps) => {
	return (
		<Flex className="bg-basicBackground relative min-h-screen flex-col">
			<LoadingWrapper loading={!contract}>
				<HeaderBar />
				<Box className="my-16 mx-5 h-max items-start justify-center space-y-5 md:flex md:flex-row md:space-x-5 md:space-y-0">
					<Pool contract={contract} />
					<BuyTickets />
				</Box>
			</LoadingWrapper>
			<H13 className="absolute bottom-3 left-3 font-bold text-emerald-600">
				<sup>*</sup> Created as the final project of the
				<span className="cursor-pointer hover:underline" onClick={() => window.open("https://consensys.net/academy/bootcamp/", "_blank")}>
					{" "}
					ConsenSys blockchain developer bootcamp
				</span>
			</H13>
		</Flex>
	)
}

export default Home
