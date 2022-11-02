import { currency } from "@constants"
import { useContractStore } from "@hooks/useContractStore"
import formatValue from "@utils/formatValue"
import React from "react"
import { Flex, H12, LoadingWrapper, MarqueeBanner } from "ui"

interface Props {}

const Banner = (props: Props) => {
	const lastWinner = useContractStore((state: ContractStoreStateProps) => state.lastWinner)

	return (
		<MarqueeBanner className="mt-[120px]">
			<LoadingWrapper loading={!lastWinner}>
				<Flex className="gap-8 font-bold">
					<H12 className="">{`Last Winner: ${lastWinner?._lastWinnerAddress ?? "-"}`}</H12>
					<H12>{`Last Winnings: ${lastWinner?._lastWinnerWinnings ? formatValue(lastWinner?._lastWinnerWinnings) : "-"} ${currency}`}</H12>
				</Flex>
			</LoadingWrapper>
		</MarqueeBanner>
	)
}

export default Banner
