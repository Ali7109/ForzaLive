# ForzaLive

This project utilizes Forza Horizon 5's Telemetry Data Output feature and has code to setup your very own server to listen to incoming UDP packets.

In simpler words, you can see data from your own Forza game session **LIVE!** From race data, to car information. The `Server.js` file under the `backendjs/` directory showcases some of the metrics I was able to decode from the ByteData.

## Repository Structure

This repo consists of 3 directories:

- **`backendjs/`** - Server code (this can be run locally to setup your own UDP server from FORZA!)
- **`dashboard/`** - Example use case for the server code for some inspiration

## Understanding the UDP Data

### Encoded Data and Their Offsets

| Offset | Size | Name | Type | Description |
|--------|------|------|------|-------------|
| 0 | 4 bytes | `isRaceOn` | int32 (signed) | Flag indicating whether a race is in progress. 1 for active race, 0 otherwise. |
| 4 | 4 bytes | `timestampMS` | uint32 (unsigned) | Timestamp of the telemetry data in milliseconds since game start. |
| 8 | 4 bytes | `engineMaxRpm` | float32 (little-endian) | The maximum revolutions per minute the engine can reach. |
| 12 | 4 bytes | `engineIdleRpm` | float32 (little-endian) | The revolutions per minute at engine idle. |
| 16 | 4 bytes | `currentEngineRpm` | float32 (little-endian) | The current engine RPM at the moment this packet was sent. |
| 20 | 4 bytes | `accelX` | float32 | Acceleration in the X direction (vehicle forward/backward). |
| 24 | 4 bytes | `accelY` | float32 | Acceleration in the Y direction (vehicle vertical axis). |
| 28 | 4 bytes | `accelZ` | float32 | Acceleration in the Z direction (vehicle lateral axis, left/right). |
| 32 | 4 bytes | `velX` | float32 | Velocity in X direction (m/s). |
| 36 | 4 bytes | `velY` | float32 | Velocity in Y direction (m/s). |
| 40 | 4 bytes | `velZ` | float32 | Velocity in Z direction (m/s). |
| 319 | 1 byte | `gear` | uint8 | Current gear number. Likely encoded as: 0 for reverse, 1 for neutral, 2+ for gears. |

### Derived Values

```javascript
speedMps = Math.sqrt(velX² + velY² + velZ²)  // Magnitude of velocity vector
speedKph = speedMps * 3.6                    // Convert m/s to km/h
speedMph = speedMps * 2.23694                // Convert m/s to mph
```
