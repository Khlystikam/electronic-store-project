// app/admin/layout.tsx
import LeftBar from "./leftbar/Leftbar";
import RightMain from "./rightMain/RightMain";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="flex h-screen w-full bg-slate-950 p-5 gap-5">
			{/* Левая панель */}
			<LeftBar />

			{/* Твоя правая часть, куда прилетят страницы */}
			<RightMain>{children}</RightMain>
		</div>
	);
}
