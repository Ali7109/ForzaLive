// diffGear.js
import dgram from "dgram";

const UDP_PORT = 5500;
const TARGET_VALUE = 7;
const STABLE_DURATION_MS = 10_000; // 10 seconds
const FRAME_INTERVAL_MS = 50; // Approx 20 packets per second (adjust if needed)
const REQUIRED_COUNT = STABLE_DURATION_MS / FRAME_INTERVAL_MS;

const offsetMap = new Map(); // offset -> { count, lastSeen }

const udp = dgram.createSocket("udp4");

udp.on("listening", () => {
	const addr = udp.address();
	console.log(`🟢 Listening for UDP packets on ${addr.address}:${addr.port}`);
});

udp.on("message", (msg, rinfo) => {
	const now = Date.now();

	// Track which offsets are currently still == TARGET_VALUE
	const currentlyMatchingOffsets = new Set();

	for (let offset = 0; offset <= msg.length - 4; offset++) {
		const value = msg.readInt32LE(offset);

		if (value === TARGET_VALUE) {
			currentlyMatchingOffsets.add(offset);

			const entry = offsetMap.get(offset) || { count: 0, lastSeen: 0 };
			const timeSinceLast = now - entry.lastSeen;

			// Optional: if a frame was missed for too long, reset
			if (timeSinceLast > FRAME_INTERVAL_MS * 2) {
				entry.count = 0;
			}

			entry.count += 1;
			entry.lastSeen = now;
			offsetMap.set(offset, entry);

			if (entry.count === REQUIRED_COUNT) {
				console.log(
					`✅ Offset ${offset} has held value ${TARGET_VALUE} for ${
						STABLE_DURATION_MS / 1000
					}s!`
				);
			}
		}
	}

	// Reset any offsets that were 7 before but not anymore
	for (const offset of offsetMap.keys()) {
		if (!currentlyMatchingOffsets.has(offset)) {
			offsetMap.set(offset, { count: 0, lastSeen: now });
		}
	}
});

udp.bind(UDP_PORT);
