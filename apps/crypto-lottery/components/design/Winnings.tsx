import { currency, getNotificationErrorMessage } from "@constants"
import { useContractStore } from "@hooks/useContractStore"
import formatValue from "@utils/formatValue"
import { memo, useCallback, useEffect } from "react"
import { Button, Flex, H10, H12, H9, WindowConfetti } from "ui"
import toast from "react-hot-toast"
import { useUiStore } from "@hooks/useUiStore"

interface Props {}

const Winnings = (props: Props) => {
	const winnings = useContractStore((state: ContractStoreStateProps) => state.winnings)
	const withdrawWinnings = useContractStore((state: ContractStoreStateProps) => state.withdrawWinnings)
	const setWinner = useUiStore((state: UiStoreStateProps) => state.setWinner)
	const setWinnings = useUiStore((state: UiStoreStateProps) => state.setWinnings)
	const winner = useUiStore((state: UiStoreStateProps) => state.winner)
	const storeWinnings = useUiStore((state: UiStoreStateProps) => state.winnings)

	const handleWithdrawWinnings = async () => {
		const notification = toast.loading("Withdraw winnings...")

		try {
			await withdrawWinnings([{}])
			toast.success("Winnings withdrawn successfully!", {
				id: notification,
			})
		} catch (error) {
			toast.error(getNotificationErrorMessage(), {
				id: notification,
			})
			console.error("error withdrawing", { error })
		}
	}

	const handleAnimation = useCallback(() => {
		setWinner(true)
		setWinnings(formatValue(winnings?.toString()))
		const timer = setTimeout(() => {
			setWinner(false)
		}, 10000)
		return timer
	}, [winnings, setWinnings, setWinner])

	useEffect(() => {
		let timer: ReturnType<typeof setTimeout>
		if (winnings > 0 && formatValue(winnings?.toString()) !== storeWinnings) {
			const timer = handleAnimation()
		}
	}, [winnings, setWinner, handleAnimation, storeWinnings])

	return winnings > 0 ? (
		<Flex className="mt-5 w-full items-center justify-center text-center text-slate-100">
			{winner && <WindowConfetti run={winner} className="!fixed" />}
			<Button
				className="w-full rounded-md bg-sky-600 px-6 py-4 shadow-lg drop-shadow-lg motion-safe:animate-pulse md:w-[calc(80%+20px)]"
				onClick={handleWithdrawWinnings}
			>
				<H10 className="mb-2">Winner Winner Chicken Dinner!</H10>
				<H12 className="mb-5">{`Total Winnings: ${formatValue(winnings.toString())} ${currency}`}</H12>
				<H9>Click here to withdraw</H9>
			</Button>
		</Flex>
	) : null
}

export default memo(Winnings)
