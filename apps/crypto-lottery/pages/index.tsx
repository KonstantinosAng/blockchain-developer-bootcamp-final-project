import type { NextPage } from "next"
import { useState } from "react"
import { HeaderBar, Login, LoadingWrapper, Box, H5, H12, H9, H13, Flex, Input, Button, CountDown } from "ui"
import { useAddress, useDisconnect, useMetamask, useContract, useContractData } from "@thirdweb-dev/react"
import { ethers } from "ethers"
import { currency } from "../constants"

const Home: NextPage = () => {
	const address = useAddress()
	const disconnect = useDisconnect()
	const login = useMetamask()
	const [quantity, setQuantity] = useState<number>(1)

	const loaderSize = 25

	const { contract, isLoading } = useContract(process.env.NEXT_PUBLIC_LOTTERY_CONTRACT_ADDRESS)
	const { data: remainingTickets, isLoading: ticketsLoading } = useContractData(contract, "RemainingTickets")
	const { data: currentWinningReward, isLoading: currentWinningRewardLoading } = useContractData(contract, "CurrentWinningReward")
	const { data: ticketPrice, isLoading: ticketPriceLoading } = useContractData(contract, "ticketPrice")
	const { data: ticketCommission, isLoading: ticketCommissionLoading } = useContractData(contract, "ticketCommission")
	const { data: expiration, isLoading: expirationLoading } = useContractData(contract, "expiration")

	const formatValue = (value: string | number) => ethers.utils.formatEther(value)

	return address ? (
		<Flex className="bg-basicBackground min-h-screen flex-col">
			<LoadingWrapper loading={isLoading}>
				<HeaderBar address={address} disconnect={disconnect} />
				<Box className="m-5 items-start justify-center space-y-5 md:flex md:flex-row md:space-x-5 md:space-y-0">
					<Box className="stats-container">
						<H5 className="text-center text-white"> The Next Draw </H5>
						<Flex className="justify-between space-x-2 p-2">
							<Box className="stats">
								<H12> Total Pool </H12>
								<LoadingWrapper size={loaderSize} loading={currentWinningRewardLoading}>
									<H9>{`${currentWinningReward ? formatValue(currentWinningReward?.toString()) : "-"} ${currency}`}</H9>
								</LoadingWrapper>
							</Box>
							<Box className="stats">
								<H12>Tickets Remaining</H12>
								<LoadingWrapper size={loaderSize} loading={ticketsLoading}>
									<H9>{remainingTickets?.toNumber()}</H9>
								</LoadingWrapper>
							</Box>
						</Flex>
						<CountDown />
					</Box>
					<Box className="stats-container space-y-2">
						<Box className="stats-container">
							<Flex className="items-center justify-between pb-2 text-white">
								<H12>Price per ticket</H12>
								<LoadingWrapper size={loaderSize} loading={ticketPriceLoading}>
									<H9>{`${ticketPrice ? formatValue(ticketPrice?.toString()) : "-"} ${currency}`}</H9>
								</LoadingWrapper>
							</Flex>
							<Flex className="items-center space-x-2 rounded-md border border-slate-300 bg-blue-600 p-4 text-slate-100">
								<H9>TICKETS</H9>
								<Input
									className="flex w-full bg-transparent text-right outline-none"
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
									<H12>{ticketPrice ? Number(formatValue(ticketPrice?.toString())) * quantity : "-"}</H12>
								</Flex>
								<Flex className="items-center justify-between italic text-pink-300">
									<H13>Service fees</H13>
									<LoadingWrapper size={loaderSize} loading={ticketCommissionLoading}>
										<H13>{`${ticketCommission ? formatValue(ticketCommission?.toString()) : "-"} ${currency}`}</H13>
									</LoadingWrapper>
								</Flex>
								<Flex className="items-center justify-between italic text-pink-300">
									<H13>+ Network fees</H13>
									<H13>TBC</H13>
								</Flex>
							</Box>
							<LoadingWrapper size={loaderSize} loading={expirationLoading}>
								<Button
									disabled={expiration?.toString() < Date.now().toString() || remainingTickets?.toNumber() <= 0}
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
	) : (
		<Login login={login} />
	)
}

export default Home
