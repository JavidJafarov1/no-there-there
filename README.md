# Web3 Social Authentication Platform

A modern Web3 application that combines blockchain wallet authentication with traditional social login methods. Built with React, TypeScript, and Express.js.

## Features

- 🔐 Web3 Wallet Authentication (MetaMask and other wallets)
- 🌐 Social Media Authentication
  - Discord Integration
  - Twitter Integration
  - GitHub Integration
- ⚡ Modern Tech Stack
  - Frontend: React + TypeScript + Vite
  - Backend: Express.js + TypeScript
  - UI: Chakra UI
  - Web3: RainbowKit + wagmi
- 🔒 Secure Authentication Flow
- 🎨 Responsive Design

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- MetaMask or another Web3 wallet
- Social media accounts for testing (Discord, Twitter, GitHub)

## Project Structure

```
.
├── frontend/               # React frontend application
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── hooks/        # Custom React hooks
│   │   ├── services/     # API services
│   │   └── types/        # TypeScript type definitions
│   └── package.json
│
└── backend/               # Express.js backend application
    ├── src/
    │   ├── controllers/  # Route controllers
    │   ├── middleware/   # Express middleware
    │   ├── routes/       # API routes
    │   ├── services/     # Business logic
    │   └── types/        # TypeScript type definitions
    └── package.json
```

## Getting Started

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the backend directory:
   ```env
   PORT=5000
   NODE_ENV=development
   JWT_SECRET=your-super-secret-key-change-this-in-production
   CORS_ORIGIN=http://localhost:5173

   # Discord API Keys
   DISCORD_CLIENT_ID=your-discord-client-id
   DISCORD_CLIENT_SECRET=your-discord-client-secret
   DISCORD_BOT_TOKEN=your-discord-bot-token
   DISCORD_REDIRECT_URI=http://localhost:5173/discord/callback

   # Twitter API Keys
   TWITTER_API_KEY=your-twitter-api-key
   TWITTER_API_SECRET=your-twitter-api-secret
   TWITTER_ACCESS_TOKEN=your-twitter-access-token
   TWITTER_ACCESS_SECRET=your-twitter-access-secret
   TWITTER_CALLBACK_URL=http://localhost:5173/twitter/callback

   # GitHub API Keys
   GITHUB_CLIENT_ID=your-github-client-id
   GITHUB_CLIENT_SECRET=your-github-client-secret
   GITHUB_ACCESS_TOKEN=your-github-access-token
   GITHUB_REDIRECT_URI=http://localhost:5173/github/callback

   # Ethereum API Keys
   RPC_URL=https://eth-mainnet.g.alchemy.com/v2/your-api-key
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

## Social Authentication Setup

### Discord Setup
1. Go to [Discord Developer Portal](https://discord.com/developers/applications)
2. Create a new application or select existing one
3. Go to OAuth2 settings
4. Add redirect URI: `http://localhost:5173/discord/callback`
5. Copy Client ID and Client Secret to your `.env` file

### Twitter Setup
1. Go to [Twitter Developer Portal](https://developer.twitter.com/en/portal/dashboard)
2. Create a new app or select existing one
3. Set up OAuth 1.0a settings
4. Add callback URL: `http://localhost:5173/twitter/callback`
5. Copy API keys and tokens to your `.env` file

### GitHub Setup
1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Create a new OAuth App or select existing one
3. Add callback URL: `http://localhost:5173/github/callback`
4. Copy Client ID and Client Secret to your `.env` file

## Available Scripts

### Backend

- `npm run dev` - Start development server with hot-reload
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm test` - Run tests

### Frontend

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run test` - Run tests

## Security Considerations

- Never commit your `.env` file
- Use environment variables for sensitive data
- Implement rate limiting in production
- Use HTTPS in production
- Keep dependencies updated
- Implement proper error handling
- Use secure session management

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [RainbowKit](https://www.rainbowkit.com/)
- [wagmi](https://wagmi.sh/)
- [Chakra UI](https://chakra-ui.com/)
- [Vite](https://vitejs.dev/)
- [Express.js](https://expressjs.com/)
