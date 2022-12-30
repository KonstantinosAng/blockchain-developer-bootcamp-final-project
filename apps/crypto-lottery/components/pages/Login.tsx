import Image from "next/future/image"
import Profile from "ui/assets/lottery.png"
import Metamask from "ui/assets/metamask.webp"
import Coinbase from "ui/assets/coinbase.png"
import { Flex, H4, H11, Button, Mobile, Tooltip } from "ui"

interface Props {
	loginMetamask?: () => void
	loginCoinbase?: () => void
	mobileWalletConnect?: () => void
}

const Login = ({ loginMetamask, loginCoinbase, mobileWalletConnect }: Props) => {
	return (
		<Flex className="bg-basicBackground min-h-screen flex-col items-center justify-center">
			<Flex className="m-5 flex flex-col items-center gap-y-10 text-center">
				<Image className="300:h-56 300:w-56 h-44 w-44 rounded-full" src={Profile} alt="Profile" priority />
				<Flex className="flex-col gap-1">
					<H4 className="300:text-4xl mb-5 text-center text-3xl font-bold text-slate-100 sm:text-6xl">Constantine&apos;s Crypto Lottery</H4>
					<H11 className="text-slate-100">Get started by connecting your wallet</H11>
				</Flex>
				<Flex className="300:flex-row flex-col gap-5">
					<Tooltip data={[{ label: "Metamask" }]}>
						<Button onClick={loginMetamask} className="loginButton">
							<Image src={Metamask} alt="Metamask wallet" priority className="300:h-10 300:w-10 h-16 w-16" />
						</Button>
					</Tooltip>
					<Tooltip data={[{ label: "Coinbase" }]} className="!bg-sky-500" arrowCustomStyle="group !bg-sky-500">
						<Button onClick={loginCoinbase} className="loginButton bg-sky-600 hover:bg-sky-500 group-hover:bg-sky-500">
							<Image src={Coinbase} alt="Coinbase wallet" priority className="300:h-10 300:w-10 h-16 w-16" />
						</Button>
					</Tooltip>
					<Tooltip data={[{ label: "Mobile" }]} className="!bg-violet-500" arrowCustomStyle="group !bg-violet-500 !border-violet-500">
						<Button onClick={mobileWalletConnect} className="loginButton bg-violet-600 hover:bg-violet-500">
							<Mobile className="300:h-10 300:w-10 h-16 w-16" />
						</Button>
					</Tooltip>
				</Flex>
			</Flex>
		</Flex>
	)
}

export default Login
