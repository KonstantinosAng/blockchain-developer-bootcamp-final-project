import { ReactNode, useMemo, createContext, useContext } from "react"
import create from "zustand"
import { persist, devtools } from "zustand/middleware"

interface StoreProviderProps {
	children: ReactNode
	stores: null
}

let store: { getState?: () => {} } | undefined

function initStore(name: string, storeState: any, isPersist: boolean) {
	return isPersist
		? create(
				devtools(
					persist(storeState, {
						name,
					}),
				),
		  )
		: create(
				devtools(storeState, {
					name,
				}),
		  )
}

export const initializeStore = (preloadedState: object, stores = {}) => {
	let _store = store
	// After navigating to a page with an initial Zustand state, merge that state
	// with the current state in the store, and create a new store
	if (!_store) {
		const storeKeys = Object.keys(stores)
		_store = storeKeys.reduce(
			(acc: object, k: string) => ({
				...acc,
				...{
					[k]: initStore(
						stores[k]?.storeName,
						stores[k]?.storeState({
							...store?.getState(),
							...preloadedState,
						}),
						stores[k]?.persist,
					),
				},
			}),
			{},
		)
	}

	// For SSG and SSR always create a new store
	if (typeof window === "undefined") return _store

	// Create the store once in the client
	if (!store) store = _store

	return _store
}

export const useHydrate = (initialState: object, stores: object) => {
	const state = typeof initialState === "string" ? JSON.parse(initialState) : initialState
	return useMemo(() => initializeStore(state, stores), [state, stores])
}

export const StoreContext = createContext(null)

export const StoreProvider = ({ children, stores }: StoreProviderProps) => {
	return <StoreContext.Provider value={stores}>{children}</StoreContext.Provider>
}

export const useStore = (storeName: string, selector: Function, eqFn?: Function) => {
	const createdStores = useContext(StoreContext)
	return createdStores[storeName](selector, eqFn)
}
