// components/DriverDisplay.tsx
import React, { useState, useMemo } from "react";
import RaceLimiter from "./RaceLimiter";

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
		<div className="flex gauge-number flex-col items-center justify-evenly w-full mx-auto bg-gradient-to-b from-gray-900 to-black shadow-2xl">
			<header className="w-full min-h-1/12 py-2 mb-4  rounded-xl shadow-lg text-center">
				<h1 className="text-white opacity-50 text-2xl font-extrabold tracking-wide m-2">
					🏁 Forza Live
				</h1>
			</header>

			<section className="w-full min-h-7/12 mb-4 backdrop-blur-lg rounded-xl py-6 shadow-inner flex md:flex-col items-center justify-center">
				{/* Speed display moved below toggle */}
				<span
					className={
						" text-white/90 text-center text-[250px] px-24 md:h-3/4 md:-translate-y-20 font-bold mt-4 " +
						(gear === 1 ? " -translate-x-5" : "")
					}
				>
					{gear === 0 ? "R" : gear}{" "}
				</span>

				{/* Unit toggle moved above speed */}
				<div className="flex flex-col items-center justify-center min-w-[300px]">
					<span className="text-white/90 text-[50px] font-bold mt-4 w-full flex justify-center items-end text-center gap-4">
						{/* Digit Grid */}
						<span className="grid grid-flow-col auto-cols-fr gap-2 w-2/3 text-[50px] font-bold relative">
							{(() => {
								const [intPart, decimalPart] =
									displaySpeed.split(".");
								const paddedInt = intPart.padStart(3, "0");
								const fullString =
									decimalPart !== undefined
										? `${paddedInt}.${decimalPart}`
										: paddedInt;

								return fullString
									.split("")
									.map((char, idx, arr) => {
										const isLeadingZero =
											idx <
												paddedInt.length -
													intPart.length &&
											paddedInt[idx] === "0";

										return (
											<span
												key={idx}
												className={`flex items-center justify-center relative px-5 ${
													isLeadingZero
														? "text-white/10"
														: "text-white/90"
												}`}
											>
												{char}
												{idx < arr.length - 1 && (
													<span className="absolute right-[-6px] top-0 h-full w-px bg-white/10" />
												)}
											</span>
										);
									});
							})()}
						</span>
					</span>

					<div className="mt-2 flex gap-4">
						{(["kph", "mph"] as const).map((u) => (
							<button
								key={u}
								onClick={() => setUnit(u)}
								className={`transition-all border-2 border-transparent font-bold hover:cursor-pointer px-3 py-1 rounded ${
									unit === u
										? "text-green-400 border-b-green-400 "
										: "text-gray-500 hover:bg-white/90"
								}`}
							>
								{u}
							</button>
						))}
					</div>
				</div>
			</section>
			<RaceLimiter displayRpm={displayRpm} rpmPerc={rpmPerc} />
		</div>
	);
};
