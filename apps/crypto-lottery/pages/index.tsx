import type { NextPage } from "next"
import { Header, Login, LoadingWrapper } from "ui"
import { useAddress, useDisconnect, useMetamask, useContract } from "@thirdweb-dev/react"

const Home: NextPage = () => {
  const address = useAddress()
  const disconnect = useDisconnect()
  const login = useMetamask()

  const { contract, isLoading } = useContract(process.env.NEXT_PUBLIC_LOTTERY_CONTRACT_ADDRESS)

  return address ? (
    <LoadingWrapper loading={isLoading}>
      <div className="bg- bg-basicBackground flex min-h-screen flex-col">
        <Header address={address} disconnect={disconnect} />
      </div>
    </LoadingWrapper>
  ) : (
    <Login login={login} />
  )
}

export default Home
