import { useMetaMaskStore } from "./useMetaMaskStore"
import { db, setDoc, doc, getDoc } from "@firebase"

const useFirebaseDb = () => {
	const address = useMetaMaskStore((state: MetamaskStoreStateProps) => state.address)

	const setUserUID = async (userAddress: string, uid: number) => {
		await setDoc(doc(db, "users", userAddress), {
			uid,
			userAddress,
		}).catch(error => console.error(error))
	}

	const getUserUID = async (userAddress: string) => {
		if (!userAddress) return null
		const docSnapshot = await getDoc(doc(db, "users", userAddress))
		if (!docSnapshot.exists()) return null
		return docSnapshot.data()
	}

	return { setUserUID, getUserUID }
}

export default useFirebaseDb
