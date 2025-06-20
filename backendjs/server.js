// server.js
import dgram from "dgram";
import http from "http";
import { WebSocketServer } from "ws";

const UDP_PORT = 5500;
const HTTP_PORT = 8080;

let latestTelemetry = null;

const udpServer = dgram.createSocket("udp4");
udpServer.on("message", (msg) => {
	try {
		// … your Sled parsing …
		const isRaceOn = msg.readInt32LE(0);
		const timestampMS = msg.readUInt32LE(4);
		const engineMaxRpm = msg.readFloatLE(8);
		const engineIdleRpm = msg.readFloatLE(12);
		const currentEngineRpm = msg.readFloatLE(16);
		const accelX = msg.readFloatLE(20);
		const accelY = msg.readFloatLE(24);
		const accelZ = msg.readFloatLE(28);
		const velX = msg.readFloatLE(32);
		const velY = msg.readFloatLE(36);
		const velZ = msg.readFloatLE(40);
		const speedMps = Math.hypot(velX, velY, velZ);
		const speedKph = speedMps * 3.6;
		const speedMph = speedMps * 2.23694; // direct m/s → mph
		const gear = msg.readUInt8(319);

		const telemetry = {
			isRaceOn,
			timestampMS,
			timestampS: +(timestampMS / 1000).toFixed(3),
			engineMaxRpm,
			engineIdleRpm,
			currentEngineRpm,
			accelX,
			accelY,
			accelZ,
			velX,
			velY,
			velZ,
			speedMps,
			speedKph,
			speedMph,
			gear,
		};

		latestTelemetry = telemetry;
		console.log("📡 Received telemetry:", telemetry);
		// broadcast to WebSocket clients
		wss.clients.forEach((c) => {
			if (c.readyState === c.OPEN) c.send(JSON.stringify(telemetry));
		});
	} catch (e) {
		console.error("Parse error:", e);
	}
});
udpServer.bind(UDP_PORT, () => console.log(`🟢 UDP listening on ${UDP_PORT}`));

// ——— HTTP + WebSocket server with CORS ———
const server = http.createServer((req, res) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS");
	res.setHeader("Access-Control-Allow-Headers", "Content-Type");

	if (req.method === "OPTIONS") {
		// preflight
		res.writeHead(204);
		return res.end();
	}

	if (req.method === "GET" && req.url === "/telemetry") {
		res.writeHead(200, { "Content-Type": "application/json" });
		return res.end(JSON.stringify(latestTelemetry));
	}

	res.writeHead(404);
	res.end();
});

const wss = new WebSocketServer({ server });
wss.on("connection", (ws, req) => {
	console.log(`🖧 WS client connected: ${req.socket.remoteAddress}`);
	if (latestTelemetry) ws.send(JSON.stringify(latestTelemetry));
	ws.on("close", () => console.log("🛑 WS client disconnected"));
});

server.listen(HTTP_PORT, () =>
	console.log(`🌐 HTTP & WS listening on ${HTTP_PORT}`)
);
