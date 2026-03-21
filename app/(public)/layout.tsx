// app/page.tsx
import Header from "./header/header";
import SliderAnimation from "./slider/sliderAnimation";
import HomePageCatalog from "./page";

export default function HomePage() {
	return (
		<div>
			<Header />
			<SliderAnimation />
			<HomePageCatalog />
		</div>
	);
}
