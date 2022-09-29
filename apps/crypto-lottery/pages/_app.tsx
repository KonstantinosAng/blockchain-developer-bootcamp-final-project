import "../../../packages/tailwindcss-config/styles/global.css"
import Head from "next/head"
import favicon from "ui/assets/ethereum.png"
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react"
import { StoreProvider, useHydrate } from "@lib/store"
import ContractProvider from "@lib/contractProvider"
import MetaMaskProvider from "@lib/MetaMaskProvider"
import stores from "@stores/index"

function MyApp({ Component, pageProps }: any) {
	const createdStores = useHydrate(pageProps?.initialZustandState, stores)
	return (
		<main>
			<Head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<meta name="theme-color" content="#000000" media="(prefers-color-scheme: dark)" />
				<meta content="#000000" name="msapplication-TileColor" />
				<meta name="msapplication-TileImage" content="/public/favicon.ico" />
				<meta name="apple-mobile-web-app-status-bar" content="#90cdf4" />
				<meta httpEquiv="X-UA-Compatible" content="IE=edge" />
				<meta name="keywords" content="Keywords" />
				<meta name="application-name" content="Portfolio" />
				<meta name="description" content="Konstantinos Angelopoulos Portfolio" />
				{/* <link rel="manifest" href="/manifest.webmanifest" /> */}
				<link rel="shortcut icon" type="image/x-icon" href={favicon.src} />
				<link rel="apple-touch-icon" href={favicon.src} />
				<link rel="icon" href="/ethereum.png" />
				<title>Crypto Lottery</title>
			</Head>
			<ThirdwebProvider desiredChainId={ChainId.Mumbai}>
				<StoreProvider stores={createdStores}>
					<MetaMaskProvider>
						<ContractProvider>
							<Component {...pageProps} />
						</ContractProvider>
					</MetaMaskProvider>
				</StoreProvider>
			</ThirdwebProvider>
		</main>
	)
}

export default MyApp
