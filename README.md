# Plaibook Homepage

Marketing site for [Plaibook](https://plaibook.tech) — call center analytics and automated lead recovery for pest control and home service businesses.

## Tech Stack

- **Next.js 16** (standalone output)
- **React 19** / TypeScript
- **Tailwind CSS 4**
- **Framer Motion** for animations
- **Recharts** for data visualization

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
npm start
```

## Project Structure

```
src/
├── app/
│   ├── (marketing)/   # Landing page, case study
│   ├── (legal)/       # Legal pages
│   └── api/           # API routes
├── components/
│   ├── marketing/     # Page sections (Hero, HowItWorks, Proof, etc.)
│   ├── mockups/       # Interactive product demos and mock data
│   └── ui/            # Shared UI components
└── lib/               # Constants and utilities
```

## Deploy

Deploys a standalone Next.js bundle to EC2 via SSH + PM2:

```bash
./deploy.sh
```

Defaults: host `34.238.113.27`, port `8012`, service name `plaibook-homepage`. Override with flags:

```bash
./deploy.sh -k ~/path/to/key.pem -h <ip> -p <port> -s <service-name>
```

Requires a `.pem` key at `~/Documents/keys/production.pem` by default.
