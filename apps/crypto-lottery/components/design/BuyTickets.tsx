import { useState } from "react"
import { Box, Button, Flex, H12, H13, H9, Input, LoadingWrapper, Label, H11, H10 } from "ui"
import { currency, loaderSize } from "@constants"
import { useContractStore } from "@hooks/useContractStore"
import { ContractStoreStateProps } from "@stores/contractStore"

type Props = {}

const BuyTickets = ({ ...rest }: Props) => {
	const [quantity, setQuantity] = useState<number>(1)
	const ticketPrice = useContractStore((state: ContractStoreStateProps) => state.ticketPrice)
	const expiration = useContractStore((state: ContractStoreStateProps) => state.expiration)
	const remainingTickets = useContractStore((state: ContractStoreStateProps) => state.remainingTickets)
	const ticketCommission = useContractStore((state: ContractStoreStateProps) => state.ticketCommission)

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
						disabled={expiration < Date.now().toString() || remainingTickets <= 0}
						className="mt-5 w-full rounded-md bg-sky-600 px-10 py-5 text-lg font-semibold text-slate-100 shadow-xl hover:bg-sky-500 disabled:cursor-not-allowed disabled:bg-gray-700"
					>
						Buy tickets
					</Button>
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
		</Box>
	)
}

export default BuyTickets
