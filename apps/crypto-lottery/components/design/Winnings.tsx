import { currency } from "@constants"
import { useContractStore } from "@hooks/useContractStore"
import { ContractStoreStateProps } from "@stores/contractStore"
import formatValue from "@utils/formatValue"
import { useEffect, useState } from "react"
import { Button, Flex, H10, H12, H9, WindowConfetti } from "ui"

interface Props {}

const Winnings = (props: Props) => {
	const winnings = useContractStore((state: ContractStoreStateProps) => state.winnings)
	const [animation, setAnimation] = useState<boolean>(true)

	const handleWithdrawWinnings = () => {}

	useEffect(() => {
		const timer = setTimeout(() => {
			setAnimation(false)
		}, 6000)
		return () => clearTimeout(timer)
	}, [])

	return winnings > 0 ? (
		<Flex className="w-full items-center justify-center text-center text-slate-100">
			{animation && <WindowConfetti run={animation} />}
			<Button className="flex-1 rounded-md bg-sky-600 px-6 py-4 motion-safe:animate-pulse md:flex-none" onClick={handleWithdrawWinnings}>
				<H10 className="mb-2">Winner Winner Chicken Dinner!</H10>
				<H12 className="mb-5">{`Total Winnings: ${formatValue(winnings.toString())} ${currency}`}</H12>
				<H9>Click here to withdraw</H9>
			</Button>
		</Flex>
	) : null
}

export default Winnings
