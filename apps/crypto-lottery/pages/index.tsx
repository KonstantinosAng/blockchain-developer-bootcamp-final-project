import type { NextPage } from "next"
import { useState } from "react"
import { HeaderBar, LoadingWrapper, Box, H5, H12, H9, H13, Flex, Input, Button, CountDown } from "ui"
import { useDisconnect } from "@thirdweb-dev/react"
import { currency, loaderSize } from "../constants"
import { SmartContract } from "@thirdweb-dev/sdk"
import Label from "ui/components/ui/Label"
import { useContractStore } from "../hooks/useContractStore"
import { ContractStoreStateProps } from "../stores/contractStore"

interface HomeProps {
	contract: SmartContract
}

const Home: NextPage = ({ contract }: HomeProps) => {
	const disconnect = useDisconnect()
	const [quantity, setQuantity] = useState<number>(1)
	const remainingTickets = useContractStore((state: ContractStoreStateProps) => state.remainingTickets)
	const currentWinningReward = useContractStore((state: ContractStoreStateProps) => state.currentWinningReward)
	const ticketPrice = useContractStore((state: ContractStoreStateProps) => state.ticketPrice)
	const ticketCommission = useContractStore((state: ContractStoreStateProps) => state.ticketCommission)
	const expiration = useContractStore((state: ContractStoreStateProps) => state.expiration)
	const address = useContractStore((state: ContractStoreStateProps) => state.address)

	return (
		<Flex className="bg-basicBackground min-h-screen flex-col">
			<LoadingWrapper loading={!contract}>
				<HeaderBar address={address} disconnect={disconnect} />
				<Box className="m-5 items-start justify-center space-y-5 md:flex md:flex-row md:space-x-5 md:space-y-0">
					<Box className="stats-container">
						<H5 className="text-center text-white"> The Next Draw </H5>
						<Flex className="justify-between space-x-2 p-2">
							<Box className="stats">
								<H12> Total Pool </H12>
								<LoadingWrapper size={loaderSize} loading={!currentWinningReward}>
									<H9>{`${currentWinningReward ?? "-"} ${currency}`}</H9>
								</LoadingWrapper>
							</Box>
							<Box className="stats">
								<H12>Tickets Remaining</H12>
								<LoadingWrapper size={loaderSize} loading={!remainingTickets}>
									<H9>{remainingTickets ?? "-"}</H9>
								</LoadingWrapper>
							</Box>
						</Flex>
						<CountDown />
					</Box>
					<Box className="stats-container space-y-2">
						<Box className="stats-container">
							<Flex className="items-center justify-between pb-2 text-white">
								<H12>Price per ticket</H12>
								<LoadingWrapper size={loaderSize} loading={!ticketPrice}>
									<H9>{`${ticketPrice ?? "-"} ${currency}`}</H9>
								</LoadingWrapper>
							</Flex>
							<Flex className="items-center space-x-2 rounded-md border border-slate-300 bg-blue-600 p-4 text-slate-100">
								<Label name="quantity">
									<H9>TICKETS</H9>
								</Label>
								<Input
									name="quantity"
									className="input-quantity flex w-full bg-transparent text-right outline-none"
									type="number"
									min={1}
									max={10}
									value={quantity}
									onChange={e => setQuantity(Number(e.target.value))}
								/>
							</Flex>
							<Box className="mt-5 space-y-2">
								<Flex className="items-center justify-between italic text-pink-300">
									<H12 className="font-extrabold">Total cost of tickets</H12>
									<LoadingWrapper size={loaderSize} loading={!ticketPrice}>
										<H12>{ticketPrice ? Number(ticketPrice) * quantity : "-"}</H12>
									</LoadingWrapper>
								</Flex>
								<Flex className="items-center justify-between italic text-pink-300">
									<H13>Service fees</H13>
									<LoadingWrapper size={loaderSize} loading={!ticketCommission}>
										<H13>{`${ticketCommission ?? "-"} ${currency}`}</H13>
									</LoadingWrapper>
								</Flex>
								<Flex className="items-center justify-between italic text-pink-300">
									<H13>+ Network fees</H13>
									<H13>TBC</H13>
								</Flex>
							</Box>
							<LoadingWrapper size={loaderSize} loading={!expiration || !remainingTickets}>
								<Button
									disabled={expiration < Date.now().toString() || remainingTickets <= 0}
									className="mt-5 w-full rounded-md bg-gradient-to-br from-orange-500 to-emerald-600 px-10 py-5 font-semibold text-white shadow-xl disabled:cursor-not-allowed disabled:from-gray-600 disabled:to-gray-600 disabled:text-gray-100"
								>
									Buy tickets
								</Button>
							</LoadingWrapper>
						</Box>
					</Box>
				</Box>
			</LoadingWrapper>
		</Flex>
	)
}

export default Home
