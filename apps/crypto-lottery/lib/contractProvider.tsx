import { useContract, useContractData } from "@thirdweb-dev/react"
import { cloneElement, ReactElement, useEffect } from "react"
import { useContractStore } from "@hooks/useContractStore"
import { ContractStoreStateProps } from "@stores/contractStore"
import formatValue from "@utils/formatValue"

interface Props {
	children?: ReactElement
	address?: string
}

const ContractProvider = ({ children, address }: Props) => {
	const setRemainingTickets = useContractStore((state: ContractStoreStateProps) => state.setRemainingTickets)
	const setCurrentWinningReward = useContractStore((state: ContractStoreStateProps) => state.setCurrentWinningReward)
	const setTicketPrice = useContractStore((state: ContractStoreStateProps) => state.setTicketPrice)
	const setTicketCommission = useContractStore((state: ContractStoreStateProps) => state.setTicketCommission)
	const setExpiration = useContractStore((state: ContractStoreStateProps) => state.setExpiration)
	const setAddress = useContractStore((state: ContractStoreStateProps) => state.setAddress)

	const { contract } = useContract(process.env.NEXT_PUBLIC_LOTTERY_CONTRACT_ADDRESS)
	const { data: remainingTickets } = useContractData(contract, "RemainingTickets")
	const { data: currentWinningReward } = useContractData(contract, "CurrentWinningReward")
	const { data: ticketPrice } = useContractData(contract, "ticketPrice")
	const { data: ticketCommission } = useContractData(contract, "ticketCommission")
	const { data: expiration } = useContractData(contract, "expiration")

	useEffect(() => {
		setRemainingTickets(remainingTickets?.toNumber())
		setCurrentWinningReward(formatValue(currentWinningReward?.toString()))
		setTicketPrice(formatValue(ticketPrice?.toString()))
		setTicketCommission(formatValue(ticketCommission?.toString()))
		setExpiration(expiration?.toString())
		setAddress(address)
	}, [
		setTicketCommission,
		setExpiration,
		setAddress,
		setRemainingTickets,
		setCurrentWinningReward,
		setTicketPrice,
		remainingTickets,
		currentWinningReward,
		ticketPrice,
		ticketCommission,
		expiration,
		address,
	])

	return children ? cloneElement(children, { contract }) : null
}

export default ContractProvider