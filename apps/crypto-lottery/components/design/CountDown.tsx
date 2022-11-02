import { SmartContract } from "@thirdweb-dev/sdk"
import React from "react"
import { Box, Flex, H10, H12, H5, H9, LoadingWrapper } from "ui"
import Countdown from "react-countdown"
import { useContractStore } from "@hooks/useContractStore"
import { loaderSize } from "@constants"

interface Props {
	contract: SmartContract
}

interface TimerProps {
	hours: number
	minutes: number
	seconds: number
	completed: boolean
}

const CountDown = ({ contract, ...rest }: Props) => {
	const expiration = useContractStore((state: ContractStoreStateProps) => state.expiration)

	const renderer = ({ hours, minutes, seconds, completed }: TimerProps) => {
		if (completed) {
			return (
				<Box className="w-full">
					<H9 className="text-center text-white motion-safe:animate-bounce">Ticket Sales have now CLOSED for this draw</H9>
					<Flex className="w-full flex-wrap justify-evenly gap-x-2 md:flex-nowrap">
						<Box className="flex-1">
							<H5 className="countdown motion-safe:animate-pulse">{hours ?? 0}</H5>
							<H12 className="countdown-label">hours</H12>
						</Box>
						<Box className="flex-1">
							<H5 className="countdown motion-safe:animate-pulse">{minutes ?? 0}</H5>
							<H12 className="countdown-label">minutes</H12>
						</Box>
						<Box className="flex-1">
							<H5 className="countdown motion-safe:animate-pulse">{seconds ?? 0}</H5>
							<H12 className="countdown-label">seconds</H12>
						</Box>
					</Flex>
				</Box>
			)
		} else {
			return (
				<>
					<H10 className="mb-4 italic text-white">Time Remaining</H10>
					<Flex className="w-full flex-wrap justify-evenly gap-x-2 md:flex-nowrap">
						<Box className="flex-1">
							<H5 className="countdown">{hours ?? 0}</H5>
							<H12 className="countdown-label">hours</H12>
						</Box>
						<Box className="flex-1">
							<H5 className="countdown">{minutes ?? 0}</H5>
							<H12 className="countdown-label">minutes</H12>
						</Box>
						<Box className="flex-1">
							<H5 className="countdown">{seconds ?? 0}</H5>
							<H12 className="countdown-label">seconds</H12>
						</Box>
					</Flex>
				</>
			)
		}
	}

	return (
		<Box className="w-full" {...rest}>
			<LoadingWrapper size={loaderSize} loading={expiration === undefined ? true : false}>
				<Countdown date={new Date(expiration * 1000)} renderer={renderer} />
			</LoadingWrapper>
		</Box>
	)
}

export default CountDown
