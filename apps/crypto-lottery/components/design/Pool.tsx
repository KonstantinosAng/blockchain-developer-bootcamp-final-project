import React from "react"
import { Box, Flex, H12, H5, H9, LoadingWrapper } from "ui"
import CountDown from "./CountDown"
import { currency, loaderSize } from "@constants"
import { useContractStore } from "@hooks/useContractStore"
import { SmartContract } from "@thirdweb-dev/sdk"

interface Props {
	contract: SmartContract
}

const Pool = ({ contract, ...rest }: Props) => {
	const currentWinningReward = useContractStore((state: ContractStoreStateProps) => state.currentWinningReward)
	const remainingTickets = useContractStore((state: ContractStoreStateProps) => state.remainingTickets)

	return (
		<Box className="stats-container space-y-2" {...rest}>
			<H5 className="text-center text-slate-100"> The Next Draw </H5>
			<Flex className="flex-wrap justify-between gap-2 p-2 md:flex-nowrap">
				<Box className="stats">
					<H12> Total Pool </H12>
					<LoadingWrapper size={loaderSize} loading={!currentWinningReward}>
						<H9>{`${currentWinningReward ?? "-"} ${currency}`}</H9>
					</LoadingWrapper>
				</Box>
				<Box className="stats">
					<H12>Tickets Remaining</H12>
					<LoadingWrapper size={loaderSize} loading={!remainingTickets}>
						<H9>{remainingTickets ?? "-"}</H9>
					</LoadingWrapper>
				</Box>
			</Flex>
			<Flex className="justify-between p-2">
				<CountDown contract={contract} />
			</Flex>
		</Box>
	)
}

export default Pool
