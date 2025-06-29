# Forza Live Telemetry Dashboard

A real-time dashboard that displays Forza Motorsport telemetry data through a live interface using REST polling or WebSockets. The backend server receives and parses UDP data from Forza, while the frontend updates live with RPM, speed, gear information, and more telemetry metrics.

## Features

- **Real-time telemetry display** - Live updates of car performance data
- **Multiple connection methods** - Support for both REST polling and WebSockets
- **Comprehensive metrics** - RPM, speed, gear position, and more
- **Modern UI** - Built with Next.js for a responsive dashboard experience

## Prerequisites

Before running this project, you'll need to have Node.js installed on your system.

### Installing Node.js

If you don't have Node.js installed:

1. Visit [nodejs.org](https://nodejs.org/)
2. Download the LTS version for your operating system
3. Follow the installation instructions for your platform
4. Verify installation by running:
   ```bash
   node --version
   npm --version
   ```

## Getting Started

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd <repository-directory>
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3. Environment Setup

Create a `.env.local` file in the root directory and configure any necessary environment variables:

```env
# ADD YOUR SERVER.JS SERVER URL HERE
NEXT_PUBLIC_TEST_API=http://localhost:3001
```

### 4. Start the Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the dashboard.

### 5. Configure Forza Telemetry

1. Launch Forza Motorsport/Horizon
2. Go to Settings → HUD and Gameplay
3. Enable "Data Out" 
4. Set the IP address to your computer's local IP
5. Set the port to match your backend server configuration
6. Start a race or drive to begin receiving telemetry data

## Project Structure

```
└── dashbaord/src/app/page.tsx # This file has the code to connect to your server
└── README.md          # This file

```

## Available Scripts

- `npm run dev` - Start development server

## Technologies Used

- **Next.js** - React framework for production
- **React** - Frontend library
- **WebSockets** - Real-time communication
- **REST API** - Alternative polling method

## Troubleshooting

### Common Issues

**Dashboard not receiving data:**
- Ensure Forza's Data Out feature is enabled
- Verify the IP address and port configuration
- Check that the backend server is running
- Confirm firewall settings allow UDP traffic

**Connection errors:**
- Verify the backend server URL in environment variables
- Check network connectivity between frontend and backend
- Ensure WebSocket connections are not blocked

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
