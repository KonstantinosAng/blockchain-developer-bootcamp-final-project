import { useMetaMaskStore } from "@hooks/useMetaMaskStore"
import { useNFTFactoryStore } from "@hooks/useNFTFactoryStore"
import { SmartContract } from "@thirdweb-dev/sdk"
import React from "react"
import { Box, Flex, H9, LoadingWrapper, Span, Tooltip } from "ui"
import NavButton from "./NavButton"
import NFTIcon from "./NFTIcon"

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
					<Flex className="300:flex-row mb-2 flex-col items-center justify-between">
						<H9 className="flex-1">Your NFT&apos;s Gallery</H9>
						<Tooltip data={[{ label: "Redirect to Opensea Testnet to see your account's NFTs" }]} placement="top">
							<NavButton className="py-1 px-4" isActive onClick={() => window.open(`https://testnets.opensea.io/${address}`, "_blank")}>
								Opensea
							</NavButton>
						</Tooltip>
					</Flex>
					<Flex className="scrollbar-thin max-h-[380px] flex-wrap items-center justify-start gap-2 overflow-y-auto overflow-x-visible">
						{userNFTs?.map((nft: NFT, idx: number) => (
							<NFTIcon nft={nft} number={idx} key={`${address}-${Number(nft?.uid)}`} />
						))}
					</Flex>
				</LoadingWrapper>
			</Box>
		</Flex>
	) : null
}

export default NFTSGallery
