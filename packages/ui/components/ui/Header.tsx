import Image from "next/future/image"
import Logo from "../../assets/winner.png"
import { NavButton } from "./NavButton"
import { Bars3BottomRightIcon } from "@heroicons/react/24/solid"

interface Props {
  address?: string
  disconnect?: () => void
}

export const Header = ({ address, disconnect, ...rest }: Props) => {
  return (
    <header className="grid grid-cols-2 items-center justify-between p-5 md:grid-cols-5" {...rest}>
      <div className="flex items-center space-x-2">
        <Image src={Logo} className="rounded-full" width={80} height={80} alt="" priority />
        <div>
          <h1 className="text-lg font-bold text-pink-600">SAD</h1>
          <p className="truncate text-xs text-sky-600">
            User: {address?.substring(0, 5)}...{address?.substring(address?.length, address?.length - 5)}
          </p>
        </div>
      </div>
      <div className="hidden items-center justify-center rounded-md md:col-span-3 md:flex">
        <div className="bg-headerBackground space-x-2 p-4">
          <NavButton isActive title="Buy Tickets" />
          <NavButton title="Logout" onClick={disconnect} />
        </div>
      </div>
      <div className="ml-auto flex flex-col text-right">
        <Bars3BottomRightIcon className="mx-auto h-8 w-8 cursor-pointer text-white" />
        <span className="md:hidden">
          <NavButton title="Logout" onClick={disconnect} />
        </span>
      </div>
    </header>
  )
}
