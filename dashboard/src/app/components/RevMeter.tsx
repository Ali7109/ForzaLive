import React from "react";
import { motion } from "motion/react";

interface RevMeterProps {
	rpmPerc: string;
	styling?: string;
}

const RevMeter = ({ rpmPerc, styling }: RevMeterProps) => {
	return (
		<motion.section
			layout
			className={
				"w-full bg-gray-800 shadow-inner flex items-center " +
				(styling || "")
			}
		>
			<span
				className={
					"h-full transition-all ease-linear text-red-700 " +
					(parseFloat(rpmPerc) > 70
						? parseFloat(rpmPerc) > 80
							? "bg-red-500"
							: "bg-yellow-500"
						: " bg-green-400")
				}
				style={{ width: `${parseFloat(rpmPerc) + 5}%` }}
			></span>
		</motion.section>
	);
};

export default RevMeter;
