import { useMetaMaskStore } from "@hooks/useMetaMaskStore"
import { useNFTFactoryStore } from "@hooks/useNFTFactoryStore"
import { useContract, useContractWrite, useContractRead } from "@thirdweb-dev/react"
import { cloneElement, ReactElement, useEffect } from "react"

interface Props {
	contract?: object
	children?: ReactElement
}

const NFTFactoryProvider = ({ children, ...rest }: Props) => {
	const address = useMetaMaskStore((state: MetamaskStoreStateProps) => state.address)

	/* Store functions */
	const setMint = useNFTFactoryStore((state: NFTFactoryStoreStateProps) => state.setMint)
	const setToggleIsMintEnabled = useNFTFactoryStore((state: NFTFactoryStoreStateProps) => state.setToggleIsMintEnabled)
	const setGetNFTSForAddress = useNFTFactoryStore((state: NFTFactoryStoreStateProps) => state.setGetNFTSForAddress)
	const setUserNFTS = useNFTFactoryStore((state: NFTFactoryStoreStateProps) => state.setUserNFTS)

	/* Contract */
	const { contract } = useContract(process.env.NEXT_PUBLIC_NFT_FACTORY_CONTRACT_ADDRESS)

	/* Contract Data */
	const { data: userNFTS } = useContractRead(contract, "getNFTSForAddress", address)

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
		setUserNFTS(userNFTS)
	}, [toggleIsMintEnabled, getNFTSForAddress, mint, setToggleIsMintEnabled, setGetNFTSForAddress, setMint, userNFTS, setUserNFTS])

	return children ? cloneElement(children, { ...rest }) : null
}

export default NFTFactoryProvider
