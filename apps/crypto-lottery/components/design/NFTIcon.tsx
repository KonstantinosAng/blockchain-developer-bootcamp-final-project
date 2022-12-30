import { getAvatarURL } from "@constants"
import { useMetaMaskStore } from "@hooks/useMetaMaskStore"
import Image from "next/image"
import React from "react"
import { Box, DocumentIcon, Tilt, Tooltip } from "ui"
import NumberLabel from "./NumberLabel"

type Props = {
	nft: NFT
	key?: string
	number?: number
}

const NFTIcon = ({ nft, number, ...rest }: Props) => {
	const address = useMetaMaskStore((state: MetamaskStoreStateProps) => state.address)
	return (
		<Tilt maxTilt={25} className="rounded-lg">
			<Box className="shine cursor-eth shadow-lg drop-shadow-lg" {...rest}>
				<NumberLabel number={number} />
				<Box className="absolute top-1 left-1 z-10">
					<Tooltip data={[{ label: "Redirect to IPFS Metadata" }]} placement="top">
						<DocumentIcon
							className="h-5 w-5 cursor-pointer text-amber-500 hover:text-amber-600"
							onClick={() => window.open(nft?.metaDataURL, "_blank")}
						/>
					</Tooltip>
				</Box>
				<Image
					src={getAvatarURL(`${address}${Number(nft?.uid)}`)}
					className="min-h-[80px] min-w-[80px] rounded-full"
					width={80}
					height={80}
					alt="user logo"
					priority
				/>
			</Box>
		</Tilt>
	)
}

export default NFTIcon
