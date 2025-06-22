// app/page.tsx
"use client";

import { useEffect, useState } from "react";
import { DriverDisplay } from "./components/DriverDisplay";

interface Telemetry {
	speedKph?: number;
	speedMph?: number;
	currentEngineRpm?: number;
	gear?: number;
	engineMaxRpm?: number;
	[key: string]: unknown;
}

export default function Home() {
	const [telemetry, setTelemetry] = useState<Telemetry | null>(null);

	useEffect(() => {
		let isMounted = true;

		async function fetchTelemetry() {
			try {
				if (!process.env.NEXT_PUBLIC_TEST_API) {
					throw new Error("Telemetry API URL is not defined");
				}
				const res = await fetch(`${process.env.NEXT_PUBLIC_TEST_API}`);
				if (!res.ok) throw new Error(res.statusText);
				const data = (await res.json()) as Telemetry;
				if (isMounted) setTelemetry(data);
			} catch (err) {
				console.error("Failed to fetch telemetry:", err);
			}
		}

		fetchTelemetry();
		const interval = setInterval(fetchTelemetry, 100);
		return () => {
			isMounted = false;
			clearInterval(interval);
		};
	}, []);

	// extract only the fields our panel cares about
	const displayData = {
		speedKph: telemetry?.speedKph ?? undefined,
		speedMph: telemetry?.speedMph ?? undefined,
		rpm: telemetry?.currentEngineRpm ?? undefined,
		engineMaxRpm: telemetry?.engineMaxRpm ?? undefined,
		gear: telemetry?.gear ?? undefined,
	};

	return (
		<div className="h-screen w-full flex">
			<DriverDisplay {...displayData} />
		</div>
	);
}
