import Image from "next/future/image"
import Profile from "ui/assets/lottery.png"
import { Flex, H4, H11, Button } from "ui"

interface Props {
	login?: () => void
}

const Login = ({ login }: Props) => {
	return (
		<Flex className="bg-basicBackground min-h-screen flex-col items-center justify-center">
			<Flex className="mb-10 flex flex-col items-center">
				<Image className="mb-10 h-56 w-56 rounded-full" src={Profile} alt="Profile" priority />
				<H4 className="mb-5 text-center text-6xl font-bold text-slate-100">Constantine&apos;s Crypto Lottery</H4>
				<H11 className="text-slate-100">Get started by logging in with your MetaMask</H11>
				<Button onClick={login} className="mt-10 rounded-lg bg-teal-600 px-8 py-5 text-lg font-bold text-slate-100 shadow-lg hover:bg-teal-500">
					Login with Metamask
				</Button>
			</Flex>
		</Flex>
	)
}

export default Login
