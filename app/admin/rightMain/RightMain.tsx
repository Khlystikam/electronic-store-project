export default async function RightMain({ children }: { children: React.ReactNode }) {
	return (
		<div className="right-main flex flex-col justify-start gap-5 w-[85%] min-w-50 h-full text-white bg-slate-900/50 rounded-2xl p-5 overflow-x-auto">
			{/* Здесь будет рендериться контент твоих page.tsx */}
			{children}
		</div>
	);
}
