import { getAvatarURL, getNotificationErrorMessage, loaderSize } from "@constants"
import { useContractStore } from "@hooks/useContractStore"
import useFirebaseDb from "@hooks/useFirebaseDb"
import useIPFSUpload from "@hooks/useIPFS"
import { useMetaMaskStore } from "@hooks/useMetaMaskStore"
import { useNFTFactoryStore } from "@hooks/useNFTFactoryStore"
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
	const mint = useNFTFactoryStore((state: NFTFactoryStoreStateProps) => state.mint)
	const { getUserUID, setUserUID } = useFirebaseDb()
	const { uploadFile } = useIPFSUpload()

	const createWinningNFT = async (winnerAddress: string) => {
		const notification = toast.loading("Creating the winning NFT...")

		try {
			/* Get user UID */
			const userFirebaseData = await getUserUID(winnerAddress)
			/* Create NFT metadata */
			const metadata = {
				name: winnerAddress,
				description: `${userFirebaseData?.uid ?? 0}. ConsenSys Lottery Winner ${winnerAddress}`,
				image: getAvatarURL(`${winnerAddress}${userFirebaseData?.uid}`),
			}

			// const file = new File([new Blob([JSON.stringify(metadata)], { type: "application/json" })], `${winnerAddress}${userFirebaseData?.uid}.json`)

			/* Upload json with nft metadata */
			const uploadedFileURL = await uploadFile(metadata)

			/* Update user uid */
			setUserUID(winnerAddress, userFirebaseData?.uid + 1)

			/* Create NFT */
			const data = await mint([winnerAddress, uploadedFileURL])

			toast.success("The winning NFT has been created!", {
				id: notification,
			})
		} catch (e) {
			console.error(e)
			toast.error(getNotificationErrorMessage(), {
				id: notification,
			})
		}
	}

	const handleDrawingTheWinningTicket = async () => {
		const notification = toast.loading("Drawing winning ticket...")

		try {
			const winningAddress = await drawWinningTicket([{}])

			await createWinningNFT(winningAddress?.receipt?.from)

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
							<Star className="mb-2 h-8 md:mx-auto md:h-10" />
							<H11>Draw winning ticket</H11>
						</Button>
					</LoadingWrapper>
					<LoadingWrapper size={loaderSize} loading={!withdrawCommission}>
						<Button className="stats adminButton" onClick={handleWithdrawingCommission}>
							<CurrencyIcon className="mb-2 h-8 md:mx-auto md:h-10" />
							<H11>Withdraw Commission</H11>
						</Button>
					</LoadingWrapper>
					<LoadingWrapper size={loaderSize} loading={!restartLottery}>
						<Button className="stats adminButton" onClick={handleRestartingLottery}>
							<ArrowIcon className="mb-2 h-8 md:mx-auto md:h-10" />
							<H11>Restart Lottery</H11>
						</Button>
					</LoadingWrapper>
					<LoadingWrapper size={loaderSize} loading={!refundAll}>
						<Button className="stats adminButton" onClick={handleRefundAll}>
							<ArrowTurnDownIcon className="mb-2 h-8 md:mx-auto md:h-10" />
							<H11>Refund All</H11>
						</Button>
					</LoadingWrapper>
				</Flex>
			</Box>
		</Flex>
	) : null
}

export default AdminTools
