import React from "react";

interface RevMeterProps {
	rpmPerc: string;
	styling?: string;
}

const RevMeter = ({ rpmPerc, styling }: RevMeterProps) => {
	return (
		<section
			className={
				"w-full bg-gray-800 shadow-inner flex items-center " +
				(styling || "")
			}
		>
			<span
				className={
					"h-full transition-all text-red-700 " +
					(parseFloat(rpmPerc) > 70
						? parseFloat(rpmPerc) > 80
							? "bg-red-500"
							: "bg-yellow-500"
						: " bg-green-400")
				}
				style={{ width: `${rpmPerc}%` }}
			></span>
		</section>
	);
};

export default RevMeter;
