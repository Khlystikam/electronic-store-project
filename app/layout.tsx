import Header from "./(public)/header/header";
import SliderAnimation from "./(public)/slider/sliderAnimation";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="ru">
			<body>
				<Header />
				<SliderAnimation />
				{children}
			</body>
		</html>
	);
}
