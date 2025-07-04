# ConnectVerse - AI Live Matching Platform

ConnectVerse is a modern, real-time dashboard application designed for managing and monitoring live matching events. It provides a comprehensive suite of tools for event organizers to track participant engagement, manage meetings, and analyze event success through a sleek, intuitive interface.

🌐 Live Demo:
👉 https://ganconnectverse.netlify.app/

 
## ✨ Features

- **Real-Time KPI Dashboard**: At-a-glance view of key performance indicators like participant numbers, matches, and satisfaction rates.
- **Event Management**: Tools to create and manage events.
- **Matching Tracker**: Real-time tracking of AI-powered matches between participants.
- **Meeting Monitoring**: Monitor scheduled and ongoing meetings.
- **Participant Management**: View and manage event participants.
- **Reporting**: Generate detailed reports on event activities and outcomes.
- **AI Matching Settings**: Configure and fine-tune the AI matching algorithms.

## 🚀 Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (with App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **UI**: [React](https://react.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Component Library**: [ShadCN UI](https://ui.shadcn.com/)
- **AI Integration**: [Genkit](https://firebase.google.com/docs/genkit)
- **Charting**: [Recharts](https://recharts.org/)

## 🛠️ Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- [Node.js](https://nodejs.org/) (version 20 or later recommended)
- [npm](https://www.npmjs.com/) or a compatible package manager

### Installation

1. Navigate to the project directory in your terminal.
2. Install the dependencies:
    ```bash
    npm install
    ```

### Running the Application

To start the development server, run:

```bash
npm run dev
```

This will start the Next.js application, typically on `http://localhost:9002`.

To run the Genkit development server for AI flows, open a separate terminal and run:

```bash
npm run genkit:dev
```

## 📜 Available Scripts

In the project directory, you can run:

- `npm run dev`: Runs the app in development mode with Turbopack.
- `npm run build`: Builds the app for production.
- `npm run start`: Starts a Next.js production server.
- `npm run lint`: Runs ESLint to check for code quality issues.
- `npm run typecheck`: Runs the TypeScript compiler to check for type errors.
- `npm run genkit:dev`: Starts the Genkit development server.
- `npm run genkit:watch`: Starts the Genkit development server in watch mode.

