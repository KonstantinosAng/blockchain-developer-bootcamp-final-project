import { ReactNode } from "react"
import { Jelly } from "@uiball/loaders"

type Props = {
  loading?: boolean
  children: ReactNode
}

export const LoadingWrapper = ({ loading, children }: Props) => {
  return loading ? (
    <div className="bg-basicBackground flex h-screen w-full items-center justify-center p-10 text-xl">
      <Jelly size={50} color="rgb(37 99 235)" />
    </div>
  ) : (
    children
  )
}
