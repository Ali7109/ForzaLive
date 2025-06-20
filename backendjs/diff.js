// diffGear.js
import dgram from "dgram";

const UDP_PORT = 5500;
let prevBuf = null;

const udp = dgram.createSocket("udp4");

udp.on("listening", () => {
	const addr = udp.address();
	console.log(`🟢 Listening for UDP packets on ${addr.address}:${addr.port}`);
});

udp.on("message", (msg, rinfo) => {
	if (prevBuf) {
		const diffs = [];
		for (let i = 0; i < msg.length; i++) {
			if (prevBuf[i] === 8 && msg[i] === 8) {
				diffs.push({ offset: i, before: prevBuf[i], after: msg[i] });
			}
		}
		// 309 166 273
		// 245 319

		if (diffs.length) {
			console.log(
				`⚡︎ buffer diffs at ${new Date().toLocaleTimeString()}:`,
				diffs
			);
		}
	}
	prevBuf = Buffer.from(msg);
});

udp.bind(UDP_PORT);
