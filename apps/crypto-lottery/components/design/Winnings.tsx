import { currency, getNotificationErrorMessage } from "@constants"
import { useContractStore } from "@hooks/useContractStore"
import formatValue from "@utils/formatValue"
import { useEffect, useState } from "react"
import { Button, Flex, H10, H12, H9, WindowConfetti } from "ui"
import toast from "react-hot-toast"

interface Props {}

const Winnings = (props: Props) => {
	const winnings = useContractStore((state: ContractStoreStateProps) => state.winnings)
	const withdrawWinnings = useContractStore((state: ContractStoreStateProps) => state.withdrawWinnings)
	const [animation, setAnimation] = useState<boolean>(true)

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

	useEffect(() => {
		let timer: any
		if (animation) {
			timer = setTimeout(() => {
				setAnimation(false)
			}, 8000)
		}
		return () => clearTimeout(timer)
	}, [animation])

	useEffect(() => {
		if (winnings > 0) setAnimation(true)
		else setAnimation(false)
	}, [winnings])

	return winnings > 0 ? (
		<Flex className="mt-5 w-full items-center justify-center text-center text-slate-100">
			{animation && <WindowConfetti run={animation} className="!fixed" />}
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

export default Winnings
