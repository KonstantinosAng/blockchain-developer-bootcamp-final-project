import Image from "next/future/image"
import Profile from "../../assets/lottery.png"

interface Props {
	login?: () => void
}

export const Login = ({ login }: Props) => {
	return (
		<div className="bg-basicBackground flex min-h-screen flex-col items-center justify-center">
			<div className="mb-10 flex flex-col items-center">
				<Image className="mb-10 h-56 w-56 rounded-full" src={Profile} alt="Profile" priority />
				<h1 className="mb-5 text-center text-6xl font-bold text-white">Constantine&apos;s Crypto Lottery</h1>
				<h2 className="text-white">Get started by logging in with your MetaMask</h2>
				<button onClick={login} className="mt-10 rounded-lg bg-blue-600 px-8 py-5 text-lg font-bold text-gray-100 shadow-lg">
					Login with Metamask
				</button>
			</div>
		</div>
	)
}
