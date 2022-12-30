import { ReactElement, cloneElement, useEffect } from "react"
import { useAddress, useDisconnect, useMetamask, useCoinbaseWallet, useWalletConnect } from "@thirdweb-dev/react"
import Login from "@pages/Login"
import { useMetaMaskStore } from "@hooks/useMetaMaskStore"

interface Props {
	children?: ReactElement
}

const WalletProvider = ({ children, ...rest }: Props) => {
	/* Store functions */
	const setLogin = useMetaMaskStore((state: MetamaskStoreStateProps) => state.setLogin)
	const setAddress = useMetaMaskStore((state: MetamaskStoreStateProps) => state.setAddress)
	const setDisconnect = useMetaMaskStore((state: MetamaskStoreStateProps) => state.setDisconnect)
	const setIsConnected = useMetaMaskStore((state: MetamaskStoreStateProps) => state.setIsConnected)

	/* Metamask wallet Data */
	const loginMetamask = useMetamask()
	/* Coinbase wallet */
	const loginCoinbase = useCoinbaseWallet()
	/* Mobile wallet connect */
	const mobileWalletConnect = useWalletConnect()
	const disconnect = useDisconnect()
	const address = useAddress()

	const clonedChildren = children ? cloneElement(children, { ...rest }) : null

	/* Set Store */
	useEffect(() => {
		setLogin(loginMetamask)
		setDisconnect(disconnect)
		setIsConnected(!!address)
		setAddress(address)
	}, [loginMetamask, setLogin, disconnect, setDisconnect, address, setIsConnected, setAddress])

	return address ? clonedChildren : <Login loginMetamask={loginMetamask} loginCoinbase={loginCoinbase} mobileWalletConnect={mobileWalletConnect} />
}

export default WalletProvider
