import { BsBag } from "react-icons/bs"
import { CiLogout } from "react-icons/ci"

export default function Header({ handleToggleIsSidebarOpen, cartItemsCount }) {
	function handleOpenSidebarButtonClick() {
		handleToggleIsSidebarOpen(true)
	}

	function handleLogout() {
		window.localStorage.clear()
	}

	return (
		<header className={"fixed bg-white py-4 shadow-md w-full z-10 lg:px-8 transition-all"}>
			<div className="container mx-auto flex items-center justify-between h-full">
				<div>
					<div className="w-[40px]">
						<h1 style={{ fontFamily: '"Satisfy", cursive', fontSize: "1.5rem" }}>Fakecommerce</h1>
					</div>
				</div>

				<div className="flex gap-6">
					<div onClick={handleOpenSidebarButtonClick} className="cursor-pointer flex relative">
						<BsBag className="text-2xl" />
						<div className="bg-red-500 absolute -right-2 -bottom-2 text-[12px] w-[18px] h-[18px] text-white rounded-full flex justify-center items-center">{cartItemsCount}</div>
					</div>
					<div onClick={handleLogout} className="cursor-pointer flex relative">
						<CiLogout className="text-3xl" />
					</div>
				</div>
			</div>
		</header>
	)
}
