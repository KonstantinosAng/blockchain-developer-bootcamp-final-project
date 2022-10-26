import { useNFTFactoryStore } from "@hooks/useNFTFactoryStore"
import { NFTFactoryStoreStateProps } from "@stores/nftFactoryStore"
import { useContract, useContractWrite, useContractRead } from "@thirdweb-dev/react"
import { cloneElement, ReactElement, useEffect } from "react"

interface Props {
	contract?: object
	children?: ReactElement
}

const NFTFactoryProvider = ({ children, ...rest }: Props) => {
	/* Store functions */
	const setMint = useNFTFactoryStore((state: NFTFactoryStoreStateProps) => state.setMint)
	const setToggleIsMintEnabled = useNFTFactoryStore((state: NFTFactoryStoreStateProps) => state.setToggleIsMintEnabled)
	const setGetNFTSForAddress = useNFTFactoryStore((state: NFTFactoryStoreStateProps) => state.setGetNFTSForAddress)

	/* Contract */
	const { contract } = useContract(process.env.NEXT_PUBLIC_NFT_FACTORY_CONTRACT_ADDRESS)

	/* Contract Data */
	const { data: nfts } = useContractRead(contract, "nfts")

	/* Contract Functions */
	const { mutateAsync: toggleIsMintEnabled } = useContractWrite(contract, "toggleIsMintEnabled")
	const { mutateAsync: getNFTSForAddress } = useContractWrite(contract, "getNFTSForAddress")
	const { mutateAsync: mint } = useContractWrite(contract, "mint")

	// console.log({ contract })

	/* Set Store */
	useEffect(() => {
		setToggleIsMintEnabled(toggleIsMintEnabled)
		setGetNFTSForAddress(getNFTSForAddress)
		setMint(mint)
	}, [toggleIsMintEnabled, getNFTSForAddress, mint, setToggleIsMintEnabled, setGetNFTSForAddress, setMint])

	return children ? cloneElement(children, { ...rest }) : null
}

export default NFTFactoryProvider
