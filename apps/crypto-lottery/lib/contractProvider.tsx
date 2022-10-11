import { useContract, useContractData, useContractCall } from "@thirdweb-dev/react"
import { cloneElement, ReactElement, useEffect } from "react"
import { useContractStore } from "@hooks/useContractStore"
import { ContractStoreStateProps } from "@stores/contractStore"
import formatValue from "@utils/formatValue"
import { useMetaMaskStore } from "@hooks/useMetaMaskStore"
import { MetamaskStoreStateProps } from "@stores/metaMaskStore"

interface Props {
	children?: ReactElement
}

const ContractProvider = ({ children }: Props) => {
	/* Store functions */
	const address = useMetaMaskStore((state: MetamaskStoreStateProps) => state.address)
	const setRemainingTickets = useContractStore((state: ContractStoreStateProps) => state.setRemainingTickets)
	const setCurrentWinningReward = useContractStore((state: ContractStoreStateProps) => state.setCurrentWinningReward)
	const setTicketPrice = useContractStore((state: ContractStoreStateProps) => state.setTicketPrice)
	const setTicketCommission = useContractStore((state: ContractStoreStateProps) => state.setTicketCommission)
	const setExpiration = useContractStore((state: ContractStoreStateProps) => state.setExpiration)
	const setBuyTickets = useContractStore((state: ContractStoreStateProps) => state.setBuyTickets)
	const setLotteryTickets = useContractStore((state: ContractStoreStateProps) => state.setLotteryTickets)
	const setWinnings = useContractStore((state: ContractStoreStateProps) => state.setWinnings)

	/* Contract */
	const { contract } = useContract(process.env.NEXT_PUBLIC_LOTTERY_CONTRACT_ADDRESS)

	/* Contract Data */
	const { data: remainingTickets } = useContractData(contract, "RemainingTickets")
	const { data: currentWinningReward } = useContractData(contract, "CurrentWinningReward")
	const { data: ticketPrice } = useContractData(contract, "ticketPrice")
	const { data: ticketCommission } = useContractData(contract, "ticketCommission")
	const { data: expiration } = useContractData(contract, "expiration")
	const { data: tickets } = useContractData(contract, "getTickets")
	const { data: winnings } = useContractData(contract, "getWinningsForAddress", address)
	// console.log(winnings)
	/* Contract Functions */
	const { mutateAsync: buyTickets } = useContractCall(contract, "BuyTickets")

	useEffect(() => {
		setRemainingTickets(remainingTickets?.toNumber())
		setCurrentWinningReward(formatValue(currentWinningReward?.toString()))
		setTicketPrice(formatValue(ticketPrice?.toString()))
		setTicketCommission(formatValue(ticketCommission?.toString()))
		setExpiration(expiration?.toString())
		setBuyTickets(buyTickets)
		setLotteryTickets(tickets)
		setWinnings(winnings)
	}, [
		setTicketCommission,
		setExpiration,
		setRemainingTickets,
		setCurrentWinningReward,
		setTicketPrice,
		setBuyTickets,
		remainingTickets,
		currentWinningReward,
		ticketPrice,
		ticketCommission,
		expiration,
		address,
		buyTickets,
		tickets,
		setLotteryTickets,
		winnings,
		setWinnings,
	])

	return children ? cloneElement(children, { contract }) : null
}

export default ContractProvider
