import { getAvatarURL } from "@constants"
import { useMetaMaskStore } from "@hooks/useMetaMaskStore"
import { useNFTFactoryStore } from "@hooks/useNFTFactoryStore"
import { MetamaskStoreStateProps } from "@stores/metaMaskStore"
import { NFTFactoryStoreStateProps, NFT } from "@stores/nftFactoryStore"
import { SmartContract } from "@thirdweb-dev/sdk"
import Image from "next/image"
import React from "react"
import { Box, Flex, H9, LoadingWrapper } from "ui"

interface Props {
	contract: SmartContract
}

const NFTSGallery = ({ contract }: Props) => {
	const userNFTs = useNFTFactoryStore((state: NFTFactoryStoreStateProps) => state.userNFTs)
	const address = useMetaMaskStore((state: MetamaskStoreStateProps) => state.address)

	return userNFTs?.length ? (
		<Flex className="mt-5 items-center justify-center">
			<Box className="w-full rounded-md bg-teal-600 bg-opacity-10 px-5 py-3 text-slate-100 md:w-[calc(80%+20px)]">
				<LoadingWrapper loading={!contract}>
					<H9>Your NFT&apos;s Gallery</H9>
					{userNFTs?.map((nft: NFT) => (
						<Image
							key={`${address}-${Number(nft?.uid)}`}
							src={getAvatarURL(`${address}${Number(nft?.uid)}`)}
							className="rounded-full"
							width={80}
							height={80}
							alt="user logo"
							priority
						/>
					))}
				</LoadingWrapper>
			</Box>
		</Flex>
	) : null
}

export default NFTSGallery
