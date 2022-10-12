import { ReactElement, cloneElement, useEffect } from "react"
import { useAddress, useDisconnect, useMetamask } from "@thirdweb-dev/react"
import Login from "@pages/Login"
import { useMetaMaskStore } from "@hooks/useMetaMaskStore"
import { MetamaskStoreStateProps } from "@stores/metaMaskStore"

interface Props {
	children?: ReactElement
}

const MetaMaskProvider = ({ children }: Props) => {
	/* Store functions */
	const setLogin = useMetaMaskStore((state: MetamaskStoreStateProps) => state.setLogin)
	const setAddress = useMetaMaskStore((state: MetamaskStoreStateProps) => state.setAddress)
	const setDisconnect = useMetaMaskStore((state: MetamaskStoreStateProps) => state.setDisconnect)
	const setIsConnected = useMetaMaskStore((state: MetamaskStoreStateProps) => state.setIsConnected)

	/* Metamask Data */
	const login = useMetamask()
	const disconnect = useDisconnect()
	const address = useAddress()

	const clonedChildren = children ? cloneElement(children, { address }) : null

	/* Set Store */
	useEffect(() => {
		setLogin(login)
		setDisconnect(disconnect)
		setIsConnected(!!address)
		setAddress(address)
	}, [login, setLogin, disconnect, setDisconnect, address, setIsConnected, setAddress])

	return address ? clonedChildren : <Login login={login} />
}

export default MetaMaskProvider
