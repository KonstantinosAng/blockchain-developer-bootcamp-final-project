import { useNFTFactoryStore } from "@hooks/useNFTFactoryStore"
import { NFTFactoryStoreStateProps } from "@stores/nftFactoryStore"
import { useContract, useContractCall, useContractData } from "@thirdweb-dev/react"
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
	const { data: nfts } = useContractData(contract, "nfts")

	/* Contract Functions */
	const { mutateAsync: toggleIsMintEnabled } = useContractCall(contract, "toggleIsMintEnabled")
	const { mutateAsync: getNFTSForAddress } = useContractCall(contract, "getNFTSForAddress")
	const { mutateAsync: mint } = useContractCall(contract, "mint")

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
