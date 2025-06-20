// components/DriverDisplayV2.tsx
import React, { useState, useMemo } from "react";

interface GaugeProps {
	size: number; // diameter
	min: number;
	max: number;
	value: number;
	label: string;
	units: string;
	color?: string;
}

export const Gauge: React.FC<GaugeProps> = ({
	size,
	min,
	max,
	value,
	label,
	units,
	color = "#22c55e",
}) => {
	const radius = size / 2 - 10;
	const center = size / 2;
	const angleRange = 270; // degrees
	const startAngle = (360 - angleRange) / 2 + 90;

	// Calculate angle for current value
	const clamped = Math.min(Math.max(value, min), max);
	const percentage = (clamped - min) / (max - min);
	const angle = startAngle + percentage * angleRange;

	// Coordinates for needle end
	const theta = (angle * Math.PI) / 180;
	const x = center + radius * Math.cos(theta);
	const y = center + radius * Math.sin(theta);

	const dashArray = `${(angleRange * Math.PI * radius) / 360} ${
		Math.PI * radius * 2
	}`;

	return (
		<svg width={size} height={size} className="mx-4">
			{/* Background arc */}
			<circle
				cx={center}
				cy={center}
				r={radius}
				fill="none"
				stroke="#374151"
				strokeWidth={10}
				strokeDasharray={dashArray}
				strokeDashoffset={((angleRange / 2) * Math.PI * radius) / 360}
			/>
			{/* Active arc */}
			<circle
				cx={center}
				cy={center}
				r={radius}
				fill="none"
				stroke={color}
				strokeWidth={10}
				strokeDasharray={dashArray}
				strokeDashoffset={
					((angleRange / 2 - percentage * angleRange) *
						Math.PI *
						radius) /
					360
				}
			/>
			{/* Needle */}
			<line
				x1={center}
				y1={center}
				x2={x}
				y2={y}
				stroke="#f87171"
				strokeWidth={3}
			/>
			{/* Center knob */}
			<circle cx={center} cy={center} r={5} fill="#f87171" />
			{/* Label */}
			<text
				x={center}
				y={center + radius / 2}
				textAnchor="middle"
				className="text-white text-sm font-semibold"
			>
				{label}
			</text>
			{/* Value */}
			<text
				x={center}
				y={center + radius / 2 + 20}
				textAnchor="middle"
				className="text-white text-md font-bold"
			>
				{value.toFixed(0)} {units}
			</text>
		</svg>
	);
};

interface DriverDisplayV2Props {
	speedKph?: number | null;
	rpm?: number;
	engineMaxRpm?: number;
}

export const DriverDisplayV2: React.FC<DriverDisplayV2Props> = ({
	speedKph = 0,
	rpm = 0,
	engineMaxRpm = 8000,
}) => {
	// Convert speed to selected unit
	const [unit, setUnit] = useState<"kph" | "mph">("kph");
	const displaySpeed = useMemo(() => {
		const raw = speedKph || 0;
		return unit === "kph" ? raw : raw / 1.60934;
	}, [speedKph, unit]);

	// Handle unit toggle
	const toggleUnit = () => setUnit((u) => (u === "kph" ? "mph" : "kph"));

	return (
		<div className="flex flex-col items-center bg-gradient-to-b from-gray-900 to-black rounded-2xl shadow-2xl p-6">
			<div className="flex w-full justify-between items-center mb-4">
				<button
					onClick={toggleUnit}
					className="px-3 py-1 bg-gray-800 text-white rounded-lg"
				>
					Toggle to {unit === "kph" ? "mph" : "kph"}
				</button>
				<div className="text-white text-2xl font-extrabold">
					🏁 Forza Live 2.0
				</div>
			</div>
			<div className="flex items-center justify-center">
				<Gauge
					size={180}
					min={0}
					max={unit === "kph" ? 300 : 186}
					value={displaySpeed}
					label="Speed"
					units={unit}
					color="#10b981"
				/>
				<Gauge
					size={180}
					min={0}
					max={engineMaxRpm}
					value={rpm}
					label="RPM"
					units=""
					color="#f59e0b"
				/>
			</div>
		</div>
	);
};
