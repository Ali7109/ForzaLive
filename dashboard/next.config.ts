import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	/* config options here */
	allowedDevOrigins: [
		"http://localhost:3000",
		"local-origin.dev",
		"*.local-origin.dev",
	],
};

export default nextConfig;
