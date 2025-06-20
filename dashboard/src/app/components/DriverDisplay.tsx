// components/DriverDisplay.tsx
import React, { useState, useMemo } from "react";

interface DriverDisplayProps {
	speedKph?: number;
	speedMph?: number;
	rpm?: number;
	engineMaxRpm?: number;
	gear?: number;
}

export const DriverDisplay: React.FC<DriverDisplayProps> = ({
	speedKph = null,
	speedMph = null,
	rpm = 0,
	engineMaxRpm = 0,
	gear = 0,
}) => {
	const [unit, setUnit] = useState<"kph" | "mph">("kph");

	// Calculate displayed speed value
	const displaySpeed = useMemo(() => {
		if (speedKph == null || speedMph == null) return "—";
		const value = unit === "kph" ? speedKph : speedMph;
		return `${value.toFixed(1)}`;
	}, [speedKph, speedMph, unit]);

	// Format RPM display
	const displayRpm = useMemo(
		() => (rpm != null ? rpm.toFixed(0) : "—"),
		[rpm]
	);

	const rpmPerc = useMemo(() => {
		console.log("Calculating RPM percentage");

		const percentage = (rpm / engineMaxRpm) * 100;
		// convert to a whole number string
		if (isNaN(percentage) || !isFinite(percentage)) return "0%";
		if (percentage < 0) return "0";
		if (percentage > 100) return "100";
		const perc = percentage.toFixed(0);
		console.log(perc);
		return perc;
	}, [rpm, engineMaxRpm]);
	return (
		<div className="flex gauge-number flex-col items-center justify-evenly w-full mx-auto p-6 bg-gradient-to-b from-gray-900 to-black shadow-2xl">
			<header className="w-full py-2 mb-4 bg-gradient-to-r from-green-400 to-black rounded-xl shadow-lg text-center">
				<h1 className="text-white opacity-50 text-2xl font-extrabold tracking-wide">
					🏁 Forza Live
				</h1>
			</header>

			<section className="w-full h-2/4 mb-4 backdrop-blur-lg rounded-xl py-6 shadow-inner flex flex-col items-center justify-center">
				{/* Speed display moved below toggle */}
				<span className="text-white/90 text-8xl font-bold mt-4">
					{gear === 0 ? "R" : gear}
				</span>
				<span className="text-white/90 text-3xl font-bold mt-4">
					{displaySpeed}
				</span>
				{/* Unit toggle moved above speed */}
				<div className="mt-2 flex gap-4">
					{(["kph", "mph"] as const).map((u) => (
						<button
							key={u}
							onClick={() => setUnit(u)}
							className={`transition border-2 border-transparent font-bold hover:cursor-pointer px-3 py-1 rounded ${
								unit === u
									? "text-green-400 border-b-green-400 "
									: "text-gray-500 hover:bg-white/90"
							}`}
						>
							{u}
						</button>
					))}
				</div>
			</section>

			<section className="w-full bg-gray-800 rounded-lg shadow-inner flex items-center relative">
				<span className="w-full absolute text-center text-white/90">
					{displayRpm}
				</span>
				<span
					className={
						"transition-all ease-linear text-red-700 rounded-l-lg " +
						(parseFloat(rpmPerc) > 70
							? parseFloat(rpmPerc) > 80
								? "bg-red-500"
								: "bg-yellow-500"
							: " bg-green-400")
					}
					style={{ width: `${rpmPerc}%` }}
				>
					.
				</span>
			</section>
		</div>
	);
};
