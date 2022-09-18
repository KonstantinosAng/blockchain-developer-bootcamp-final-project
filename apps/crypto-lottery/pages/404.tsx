import { useRouter } from "next/router"
import { useEffect, useState } from "react"

const NotFound = () => {
  const [path, setPath] = useState<string>("")
  const router = useRouter()

  useEffect(() => setPath(router?.asPath), [router])

  return (
    <div className="flex h-screen select-none flex-col items-center justify-center bg-slate-900 text-center">
      <h1 className="motion-safe:animate-glitch notFound relative text-[6.5rem] font-extrabold text-[rgba(30,144,255,.75)] sm:text-[10rem]">
        {" "}
        <span className="absolute top-0 left-0"> 404 </span> 404 <span className="absolute top-0 left-0"> 404 </span>{" "}
      </h1>
      <h1 className="text-2xl font-bold text-[rgba(30,144,255,.75)]">
        {" "}
        Sorry page <span>{path}</span> got lost 😯
      </h1>
      <button
        name="Go to home"
        className="mt-10 rounded-full bg-[rgba(30,144,255,.75)] py-2 px-10 text-xl font-bold hover:motion-safe:animate-bounce"
        onClick={() => router.push("/")}
      >
        Home
      </button>
    </div>
  )
}

export default NotFound
