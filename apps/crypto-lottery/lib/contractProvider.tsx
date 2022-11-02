import { useContract, useContractWrite, useContractRead } from "@thirdweb-dev/react"
import { cloneElement, ReactElement, useEffect } from "react"
import { useContractStore } from "@hooks/useContractStore"
import formatValue from "@utils/formatValue"
import { useMetaMaskStore } from "@hooks/useMetaMaskStore"

interface Props {
	children?: ReactElement
	address?: string
}

const ContractProvider = ({ children, ...rest }: Props) => {
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
	const setWithdrawWinnings = useContractStore((state: ContractStoreStateProps) => state.setWithdrawWinnings)
	const setLastWinner = useContractStore((state: ContractStoreStateProps) => state.setLastWinner)
	const setLotteryOwner = useContractStore((state: ContractStoreStateProps) => state.setLotteryOwner)
	const setLotteryOwnerTotalCommission = useContractStore((state: ContractStoreStateProps) => state.setLotteryOwnerTotalCommission)
	const setDrawWinningTicket = useContractStore((state: ContractStoreStateProps) => state.setDrawWinningTicket)
	const setWithdrawCommission = useContractStore((state: ContractStoreStateProps) => state.setWithdrawCommission)
	const setRestartLottery = useContractStore((state: ContractStoreStateProps) => state.setRestartLottery)
	const setRefundAll = useContractStore((state: ContractStoreStateProps) => state.setRefundAll)

	/* Contract */
	const { contract } = useContract(process.env.NEXT_PUBLIC_LOTTERY_CONTRACT_ADDRESS)

	/* Contract Data */
	const { data: remainingTickets } = useContractRead(contract, "RemainingTickets")
	const { data: currentWinningReward } = useContractRead(contract, "CurrentWinningReward")
	const { data: ticketPrice } = useContractRead(contract, "ticketPrice")
	const { data: ticketCommission } = useContractRead(contract, "ticketCommission")
	const { data: expiration } = useContractRead(contract, "expiration")
	const { data: tickets } = useContractRead(contract, "getTickets")
	const { data: winnings } = useContractRead(contract, "getWinningsForAddress", address)
	const { data: lastWinner } = useContractRead(contract, "lastWinner")
	const { data: lotteryOwner } = useContractRead(contract, "lotteryOwner")
	const { data: lotteryOwnerTotalCommission } = useContractRead(contract, "lotteryOwnerTotalCommission")

	/* Contract Functions */
	const { mutateAsync: buyTickets } = useContractWrite(contract, "BuyTickets")
	const { mutateAsync: withdrawWinnings } = useContractWrite(contract, "WithdrawWinnings")
	const { mutateAsync: drawWinningTicket } = useContractWrite(contract, "DrawWinnerTicket")
	const { mutateAsync: withdrawCommission } = useContractWrite(contract, "WithdrawCommission")
	const { mutateAsync: restartLottery } = useContractWrite(contract, "restartLottery")
	const { mutateAsync: refundAll } = useContractWrite(contract, "RefundAll")

	// console.log({ contract })

	/* Set Store */
	useEffect(() => {
		setRemainingTickets(remainingTickets?.toNumber())
		setCurrentWinningReward(formatValue(currentWinningReward?.toString()))
		setTicketPrice(formatValue(ticketPrice?.toString()))
		setTicketCommission(formatValue(ticketCommission?.toString()))
		setExpiration(expiration?.toString())
		setBuyTickets(buyTickets)
		setLotteryTickets(tickets)
		setWinnings(winnings)
		setWithdrawWinnings(withdrawWinnings)
		setLastWinner(lastWinner)
		setLotteryOwner(lotteryOwner)
		setLotteryOwnerTotalCommission(lotteryOwnerTotalCommission)
		setDrawWinningTicket(drawWinningTicket)
		setWithdrawCommission(withdrawCommission)
		setRestartLottery(restartLottery)
		setRefundAll(refundAll)
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
		withdrawWinnings,
		setWithdrawWinnings,
		lastWinner,
		setLastWinner,
		lotteryOwner,
		setLotteryOwnerTotalCommission,
		lotteryOwnerTotalCommission,
		setDrawWinningTicket,
		drawWinningTicket,
		setWithdrawCommission,
		withdrawCommission,
		restartLottery,
		setRestartLottery,
		refundAll,
		setRefundAll,
		setLotteryOwner,
	])

	return children ? cloneElement(children, { contract, ...rest }) : null
}

export default ContractProvider
