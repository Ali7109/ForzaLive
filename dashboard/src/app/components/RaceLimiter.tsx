import React from "react";
import RevMeter from "./RevMeter";

interface RaceLimiterProps {
	displayRpm: string;
	rpmPerc: string;
}

const RaceLimiter = ({ displayRpm, rpmPerc }: RaceLimiterProps) => {
	return (
		<div className="flex relative w-full min-h-3/12">
			<span className="z-2 w-full flex h-full font-bold text-3xl absolute justify-center items-center text-white/90">
				{displayRpm}
			</span>
			<span
				className="absolute w-full h-full bg-black"
				style={{
					clipPath: "ellipse(51% 100% at 50% -20%)", // makes it start tighter at center but still go full width
				}}
			></span>
			<RevMeter rpmPerc={rpmPerc} styling={"justify-end"} />
			<RevMeter rpmPerc={rpmPerc} />
		</div>
	);
};

export default RaceLimiter;
