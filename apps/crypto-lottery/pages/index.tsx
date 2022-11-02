import { LoadingWrapper, Box, Flex, H13, Span, Sup, Section } from "ui"
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
				<Section className="mx-5">
					<Winnings />
					<AdminTools />
					<Box className="my-5 h-max items-start justify-center space-y-5 md:flex md:flex-row md:space-x-5 md:space-y-0">
						<Pool contract={contract} />
						<BuyTickets />
					</Box>
					<NFTSGallery contract={contract} />
				</Section>
				<Section className="p-5">
					<Flex className="items-center justify-center">
						<H13 className="mx-0 w-full rounded-lg bg-teal-600 bg-opacity-10 p-4 text-center font-bold text-emerald-600 shadow-lg drop-shadow-lg md:mx-5 md:w-auto">
							<Sup>*</Sup> Created with 💙 as the final project of the{" "}
							<Span
								className="cursor-pointer hover:text-emerald-500 hover:underline"
								onClick={() => window.open("https://consensys.net/academy/bootcamp/", "_blank")}
							>
								ConsenSys blockchain developer bootcamp
							</Span>
						</H13>
					</Flex>
				</Section>
			</LoadingWrapper>
		</Flex>
	)
}

export default Home
