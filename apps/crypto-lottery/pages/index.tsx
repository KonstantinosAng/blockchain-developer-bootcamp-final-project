import { LoadingWrapper, Box, Flex, H13, Span, Sup } from "ui"
import HeaderBar from "@design/HeaderBar"
import { SmartContract } from "@thirdweb-dev/sdk"
import BuyTickets from "@design/BuyTickets"
import Pool from "@design/Pool"
import Winnings from "@design/Winnings"
import Banner from "@design/Banner"
import AdminTools from "@design/AdminTools"
import NFTSGallery from "@design/NFTSGallery"

interface HomeProps {
	contract: SmartContract
}

const Home = ({ contract }: HomeProps) => {
	return (
		<Flex className="bg-basicBackground relative min-h-screen flex-col overflow-x-hidden">
			<LoadingWrapper loading={!contract}>
				<HeaderBar />
				<Banner />
				<Box className="mx-5">
					<Winnings />
					<AdminTools />
					<Box className="my-5 h-max items-start justify-center space-y-5 md:flex md:flex-row md:space-x-5 md:space-y-0">
						<Pool contract={contract} />
						<BuyTickets />
					</Box>
					<NFTSGallery contract={contract} />
					{/* <H13 className="ml-3 mb-3 block font-bold text-emerald-600 md:absolute md:top-3 md:left-3">
						<Sup>*</Sup> Created as the final project of the{" "}
						<Span
							className="cursor-pointer hover:text-emerald-500 hover:underline"
							onClick={() => window.open("https://consensys.net/academy/bootcamp/", "_blank")}
						>
							ConsenSys blockchain developer bootcamp
						</Span>
					</H13> */}
				</Box>
			</LoadingWrapper>
		</Flex>
	)
}

export default Home
