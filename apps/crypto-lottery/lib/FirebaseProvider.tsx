import { useMetaMaskStore } from "@hooks/useMetaMaskStore"
import { MetamaskStoreStateProps } from "@stores/metaMaskStore"
import { ReactElement, cloneElement, useEffect } from "react"
import { db, onSnapshot, doc } from "@firebase"
import useFirebaseDb from "@hooks/useFirebaseDb"

interface Props {
	contract?: object
	children?: ReactElement
}

const FirebaseProvider = ({ children, ...rest }: Props) => {
	const address = useMetaMaskStore((state: MetamaskStoreStateProps) => state.address)
	const { setUserUID } = useFirebaseDb()

	/* Initialize User in firebase db */
	useEffect(() => {
		let cleanUp = () => {}
		if (address) {
			cleanUp = onSnapshot(doc(db, "users", address), snapshot => {
				if (!snapshot?.exists()) {
					setUserUID(address, 1)
				}
			})
		}
		return () => cleanUp()
	}, [address, setUserUID])

	return children ? cloneElement(children, { ...rest }) : null
}

export default FirebaseProvider
