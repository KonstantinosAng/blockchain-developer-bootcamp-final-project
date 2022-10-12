import { getNotificationErrorMessage, loaderSize } from "@constants"
import { useContractStore } from "@hooks/useContractStore"
import { useMetaMaskStore } from "@hooks/useMetaMaskStore"
import { ContractStoreStateProps } from "@stores/contractStore"
import { MetamaskStoreStateProps } from "@stores/metaMaskStore"
import formatValue from "@utils/formatValue"
import React from "react"
import toast from "react-hot-toast"
import { ArrowIcon, ArrowTurnDownIcon, Box, Button, CurrencyIcon, Flex, H10, H11, H7, LoadingWrapper, Star } from "ui"

interface Props {}

const AdminTools = (props: Props) => {
	const address = useMetaMaskStore((state: MetamaskStoreStateProps) => state.address)
	const lotteryOwner = useContractStore((state: ContractStoreStateProps) => state.lotteryOwner)
	const lotteryOwnerTotalCommission = useContractStore((state: ContractStoreStateProps) => state.lotteryOwnerTotalCommission)
	const drawWinningTicket = useContractStore((state: ContractStoreStateProps) => state.drawWinningTicket)
	const withdrawCommission = useContractStore((state: ContractStoreStateProps) => state.withdrawCommission)
	const restartLottery = useContractStore((state: ContractStoreStateProps) => state.restartLottery)
	const refundAll = useContractStore((state: ContractStoreStateProps) => state.refundAll)

	const handleDrawingTheWinningTicket = async () => {
		const notification = toast.loading("Drawing winning ticket...")

		try {
			await drawWinningTicket([{}])

			toast.success("A winner has been selected!", {
				id: notification,
			})
		} catch (err) {
			console.error(err)
			toast.error(getNotificationErrorMessage(), {
				id: notification,
			})
		}
	}

	const handleWithdrawingCommission = async () => {
		const notification = toast.loading("Withdrawing commission...")

		try {
			await withdrawCommission([{}])

			toast.success("Withdrawing commission was successful!", {
				id: notification,
			})
		} catch (err) {
			console.error(err)
			toast.error(getNotificationErrorMessage(), {
				id: notification,
			})
		}
	}

	const handleRestartingLottery = async () => {
		const notification = toast.loading("Restarting Lottery...")

		try {
			await restartLottery([{}])

			toast.success("Lottery has restarted successfully!", {
				id: notification,
			})
		} catch (err) {
			console.error(err)
			toast.error(getNotificationErrorMessage(), {
				id: notification,
			})
		}
	}

	const handleRefundAll = async () => {
		const notification = toast.loading("Refunding all tickets...")

		try {
			await refundAll([{}])

			toast.success("All tickets were refunded successfully!", {
				id: notification,
			})
		} catch (err) {
			console.error(err)
			toast.error(getNotificationErrorMessage(), {
				id: notification,
			})
		}
	}

	return address === lotteryOwner ? (
		<Flex className="mt-5 items-center justify-center">
			<Box className="w-full rounded-md bg-teal-600 bg-opacity-10 px-5 py-3 text-center text-slate-100 md:w-[calc(80%+20px)]">
				<H7 className="mb-2"> Admin Controls </H7>
				<LoadingWrapper size={loaderSize} loading={!lotteryOwnerTotalCommission}>
					<H10 className="mb-4">
						{`Total Commission to be withdrawn: ${lotteryOwnerTotalCommission ? formatValue(lotteryOwnerTotalCommission) : "-"}`}
					</H10>
				</LoadingWrapper>
				<Flex className="flex-col gap-y-2 gap-x-0 md:flex-row md:gap-x-4 md:gap-y-0">
					<LoadingWrapper size={loaderSize} loading={!drawWinningTicket}>
						<Button className="stats adminButton" onClick={handleDrawingTheWinningTicket}>
							<Star className="mb-2 h-6 md:mx-auto" />
							<H11>Draw winning ticket</H11>
						</Button>
					</LoadingWrapper>
					<LoadingWrapper size={loaderSize} loading={!withdrawCommission}>
						<Button className="stats adminButton" onClick={handleWithdrawingCommission}>
							<CurrencyIcon className="mb-2 h-6 md:mx-auto" />
							<H11>Withdraw Commission</H11>
						</Button>
					</LoadingWrapper>
					<LoadingWrapper size={loaderSize} loading={!restartLottery}>
						<Button className="stats adminButton" onClick={handleRestartingLottery}>
							<ArrowIcon className="mb-2 h-6 md:mx-auto" />
							<H11>Restart Lottery</H11>
						</Button>
					</LoadingWrapper>
					<LoadingWrapper size={loaderSize} loading={!refundAll}>
						<Button className="stats adminButton" onClick={handleRefundAll}>
							<ArrowTurnDownIcon className="mb-2 h-6 md:mx-auto" />
							<H11>Refund All</H11>
						</Button>
					</LoadingWrapper>
				</Flex>
			</Box>
		</Flex>
	) : null
}

export default AdminTools
