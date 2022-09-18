interface Props {
  title: string
  isActive?: boolean
  onClick?: () => void
}

export const NavButton = ({ title, isActive, onClick, ...rest }: Props) => {
  return (
    <button onClick={onClick} className={`${isActive && "bg-blue-600"} rounded py-2 px-4 font-bold text-white hover:bg-blue-500`} {...rest}>
      {title}
    </button>
  )
}
