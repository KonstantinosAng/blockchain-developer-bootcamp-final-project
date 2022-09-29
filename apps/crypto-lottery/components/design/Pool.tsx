import React from "react"
import { Box, Flex, H12, H5, H9, LoadingWrapper } from "ui"
import CountDown from "./CountDown"
import { currency, loaderSize } from "@constants"
import { useContractStore } from "@hooks/useContractStore"
import { ContractStoreStateProps } from "@stores/contractStore"

interface Props {}

const Pool = ({ ...rest }: Props) => {
	const currentWinningReward = useContractStore((state: ContractStoreStateProps) => state.currentWinningReward)
	const remainingTickets = useContractStore((state: ContractStoreStateProps) => state.remainingTickets)

	return (
		<Box className="stats-container" {...rest}>
			<H5 className="text-center text-slate-100"> The Next Draw </H5>
			<Flex className="justify-between space-x-2 p-2">
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
			<CountDown />
		</Box>
	)
}

export default Pool
