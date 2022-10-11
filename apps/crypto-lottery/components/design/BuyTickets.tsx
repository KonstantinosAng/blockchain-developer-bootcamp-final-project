import { useEffect, useState } from "react"
import { Box, Button, Flex, H12, H9, Input, LoadingWrapper, Label, H11, H10 } from "ui"
import Ticket from "ui/assets/tickets.png"
import { currency, loaderSize } from "@constants"
import { useContractStore } from "@hooks/useContractStore"
import { ContractStoreStateProps } from "@stores/contractStore"
import toast from "react-hot-toast"
import { parseValue } from "@utils/formatValue"
import Image from "next/future/image"

interface Props {}

const BuyTickets = ({ ...rest }: Props) => {
	const [quantity, setQuantity] = useState<number>(1)
	const ticketPrice = useContractStore((state: ContractStoreStateProps) => state.ticketPrice)
	const expiration = useContractStore((state: ContractStoreStateProps) => state.expiration)
	const remainingTickets = useContractStore((state: ContractStoreStateProps) => state.remainingTickets)
	const ticketCommission = useContractStore((state: ContractStoreStateProps) => state.ticketCommission)
	const buyTickets = useContractStore((state: ContractStoreStateProps) => state.buyTickets)
	const lotteryTickets = useContractStore((state: ContractStoreStateProps) => state.lotteryTickets)
	const address = useContractStore((state: ContractStoreStateProps) => state.address)

	const [userTickets, setUserTickets] = useState<number>(0)

	const handleBuyTickets = async () => {
		if (!ticketPrice) return
		if (quantity < 1) return

		const notification = toast.loading("Buying your ticket...")

		try {
			await buyTickets([
				{
					value: parseValue(ticketPrice, quantity),
				},
			])

			toast.success("Tickets purchased successfully!", {
				id: notification,
			})
		} catch (err) {
			console.error(err)
			toast.error("Something went wrong! 😭", {
				id: notification,
			})
		}
	}

	useEffect(() => {
		if (!lotteryTickets) return

		const totalTickets: string[] = lotteryTickets

		const numOfUserTickets = totalTickets.reduce((total, ticketAddress) => (ticketAddress === address ? total + 1 : total), 0)
		setUserTickets(numOfUserTickets)
	}, [lotteryTickets, address])

	return (
		<Box className="stats-container space-y-8" {...rest}>
			<Box className="stats">
				<Flex className="items-center justify-between pb-2 text-slate-100 md:gap-3">
					<H10>Price per ticket</H10>
					<LoadingWrapper size={loaderSize} loading={!ticketPrice}>
						<H10>{`${ticketPrice ?? "-"} ${currency}`}</H10>
					</LoadingWrapper>
				</Flex>
				<Flex className="items-center space-x-2 rounded-lg border-4 border-slate-300 bg-teal-600 p-4 text-slate-100">
					<Label name="quantity">
						<H9>TICKETS</H9>
					</Label>
					<Input
						name="quantity"
						className="input-quantity flex w-full bg-transparent text-right text-2xl outline-none"
						type="number"
						min={1}
						max={10}
						value={quantity}
						onChange={e => setQuantity(Number(e.target.value))}
					/>
				</Flex>
				<LoadingWrapper size={loaderSize} loading={!expiration || !remainingTickets}>
					<Button
						disabled={expiration < Date.now().toString() || remainingTickets <= 0 || quantity < 1}
						className="mt-5 w-full rounded-md bg-sky-600 px-10 py-5 text-lg font-semibold text-slate-100 shadow-xl hover:bg-sky-500 disabled:cursor-not-allowed disabled:bg-gray-700"
						onClick={() => handleBuyTickets()}
					>
						{`Buy ${quantity ?? ""} ${quantity === 1 ? "ticket" : "tickets"} for ${Number(ticketPrice) * quantity} ${currency}`}
					</Button>
					{quantity < 1 && (
						<Flex className="mt-3 items-center justify-center text-center text-rose-500">
							<H12>Tickets must be greater than or equal to 1!</H12>
						</Flex>
					)}
				</LoadingWrapper>
			</Box>
			<Box className="space-y-2 italic text-teal-500">
				<Flex className="items-center justify-between">
					<H11 className="font-bold">Total cost of tickets</H11>
					<LoadingWrapper size={loaderSize} loading={!ticketPrice}>
						<H11 className="font-bold">{ticketPrice ? Number(ticketPrice) * quantity : "-"}</H11>
					</LoadingWrapper>
				</Flex>
				<Flex className="items-center justify-between">
					<H12>Service fees</H12>
					<LoadingWrapper size={loaderSize} loading={!ticketCommission}>
						<H12>{`${ticketCommission ?? "-"} ${currency}`}</H12>
					</LoadingWrapper>
				</Flex>
				<Flex className="items-center justify-between">
					<H12>+ Network fees</H12>
					<H12>TBC</H12>
				</Flex>
			</Box>
			{!!userTickets && (
				<LoadingWrapper size={loaderSize} loading={!address}>
					<Box className="stats">
						<H11>{`You have ${userTickets} ${userTickets > 1 ? "tickets" : "ticket"} in this draw`}</H11>
						<Flex className="m-0 mt-2 flex max-h-60 flex-wrap items-center justify-start gap-2 overflow-y-hidden">
							{Array(userTickets)
								.fill("")
								.map((_, index) => (
									<p
										key={index}
										className="flex flex-shrink-0 items-center justify-center rounded-lg bg-teal-600 bg-opacity-30 p-2 text-xs italic text-emerald-300"
									>
										<Image src={Ticket} className="rounded-full" width={36} height={36} alt="ticket" />
									</p>
								))}
						</Flex>
					</Box>
				</LoadingWrapper>
			)}
		</Box>
	)
}

export default BuyTickets
