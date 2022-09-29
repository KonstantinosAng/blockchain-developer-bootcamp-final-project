import { ReactElement, cloneElement, useEffect } from "react"
import { useAddress, useDisconnect, useMetamask } from "@thirdweb-dev/react"
import Login from "@pages/Login"
import { useMetaMaskStore } from "@hooks/useMetaMaskStore"
import { MetamaskStoreStateProps } from "@stores/metaMaskStore"

interface Props {
	children?: ReactElement
}

const MetaMaskProvider = ({ children }: Props) => {
	const login = useMetamask()
	const disconnect = useDisconnect()
	const setLogin = useMetaMaskStore((state: MetamaskStoreStateProps) => state.setLogin)
	const setDisconnect = useMetaMaskStore((state: MetamaskStoreStateProps) => state.setDisconnect)
	const address = useAddress()

	const clonedChildren = children ? cloneElement(children, { address }) : null

	useEffect(() => {
		setLogin(login)
		setDisconnect(disconnect)
	}, [login, setLogin, disconnect, setDisconnect])

	return address ? clonedChildren : <Login login={login} />
}

export default MetaMaskProvider
