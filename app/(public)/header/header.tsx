import Link from "next/link";

export default function Header() {
	const itemsNavMenu = [
		{ id: 0, name: "Главная", link: "/" },
		{ id: 1, name: "О магазине", link: "/about" },
		{ id: 2, name: "Контакты", link: "/contacts" },
		{ id: 3, name: "Блог", link: "/blog" },
	];

	const itemsIconUsers = [
		{ id: 0, nameAlt: "favorites", linkImg: "https://dev-magick-api.ru/devtest-media/icons-header/favorites.png", link: "/" },
		{ id: 1, nameAlt: "cart", linkImg: "https://dev-magick-api.ru/devtest-media/icons-header/cart.png", link: "/" },
		{ id: 2, nameAlt: "user", linkImg: "https://dev-magick-api.ru/devtest-media/icons-header/user.png", link: "/" },
	];

	return (
		<header className="flex flex-col items-center w-full bg-white">
			<div className="header__wrapper flex justify-start w-full max-w-360 bg-white">
				<section className="header__box flex justify-between items-center w-full h-25">
					{/* блок лого */}
					<Link href="/" className="logo-block w-[10%]">
						<img src="https://dev-magick-api.ru/devtest-media/logo-vector.svg" alt="logo-cyber" className="w-[60%] cursor-pointer hover:scale-110 duration-300 ease-in-out" />
					</Link>
					{/* блок поиска */}
					<div className="search__wrapper w-[30%]">
						<input type="text" placeholder="iPhone 17 Pro Max ..." className="w-full h-15 p-5 rounded-lg bg-gray-200 outline-none focus:placeholder-transparent" />
					</div>
					{/* блок навигации */}
					<div className="navigation__wrapper flex flex-row items-center w-[35%]">
						<nav className="nav-box flex flex-row justify-around items-center w-full">
							{itemsNavMenu.map((itemLink) => (
								<Link key={itemLink.id} href={itemLink.link} className="text-base font-bold hover:text-mauve-600 hover:border-b hover:border-mauve-600 duration-150 ease-in-out">
									{itemLink.name}
								</Link>
							))}
						</nav>
					</div>
					<div className="menu-icon__header flex flex-row justify-between items-center w-[10%]">
						{itemsIconUsers.map((itemsIcon) => (
							<Link key={itemsIcon.id} rel="stylesheet" href={itemsIcon.link} className="favorites">
								<img src={itemsIcon.linkImg} alt={itemsIcon.nameAlt} className="cursor-pointer hover:scale-110 duration-300 ease-in-out" />
							</Link>
						))}
					</div>
				</section>
			</div>
		</header>
	);
}
