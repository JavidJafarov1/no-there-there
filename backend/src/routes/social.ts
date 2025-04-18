import { Router } from 'express';
import { TwitterApi } from 'twitter-api-v2';
import { socialAuthService } from '../services/socialAuth';
import { authenticateToken } from '../middleware/auth';

const router = Router();

// Twitter OAuth flow
router.get('/twitter/auth', authenticateToken, async (req, res) => {
  try {
    if (!process.env.TWITTER_API_KEY || !process.env.TWITTER_API_SECRET) {
      throw new Error('Twitter API credentials not configured');
    }

    const client = new TwitterApi({
      appKey: process.env.TWITTER_API_KEY as string,
      appSecret: process.env.TWITTER_API_SECRET as string,
    });

    const { url, oauth_token, oauth_token_secret } = await client.generateAuthLink(
      process.env.TWITTER_CALLBACK_URL || 'http://localhost:5173/twitter/callback'
    );

    // Store oauth_token_secret in session or temporary storage
    // For demo, we'll use a Map (in production, use Redis or a database)
    tokenSecrets.set(oauth_token, oauth_token_secret);

    res.json({ url });
  } catch (error) {
    console.error('Twitter auth error:', error);
    res.status(500).json({ 
      error: error instanceof Error ? error.message : 'Failed to generate Twitter auth URL' 
    });
  }
});

// Store for OAuth token secrets (use Redis or a database in production)
const tokenSecrets = new Map<string, string>();

router.get('/twitter/callback', authenticateToken, async (req, res) => {
  try {
    const { oauth_token, oauth_verifier } = req.query;
    if (!oauth_token || !oauth_verifier) {
      throw new Error('Missing OAuth parameters');
    }

    // Get the stored oauth_token_secret
    const oauth_token_secret = tokenSecrets.get(oauth_token as string);
    if (!oauth_token_secret) {
      throw new Error('Invalid OAuth token');
    }

    // Clean up the stored token
    tokenSecrets.delete(oauth_token as string);

    const result = await socialAuthService.verifyTwitter(
      oauth_token as string,
      oauth_verifier as string
    );
    res.json(result);
  } catch (error) {
    console.error('Twitter callback error:', error);
    res.status(500).json({ 
      error: error instanceof Error ? error.message : 'Twitter verification failed' 
    });
  }
});

// Discord OAuth flow
router.get('/discord/auth', authenticateToken, async (req, res) => {
  try {
    if (!process.env.DISCORD_CLIENT_ID) {
      throw new Error('Discord client ID not configured');
    }
    const DISCORD_REDIRECT_URI = encodeURIComponent(process.env.DISCORD_REDIRECT_URI || 'http://localhost:5173/discord/callback');
    const SCOPE = 'identify';
    
    const authLink = `https://discord.com/api/oauth2/authorize?client_id=${process.env.DISCORD_CLIENT_ID}&redirect_uri=${DISCORD_REDIRECT_URI}&response_type=code&scope=${SCOPE}`;
    res.json({ url: authLink });
  } catch (error) {
    console.error('Discord auth error:', error);
    res.status(500).json({ 
      error: error instanceof Error ? error.message : 'Failed to generate Discord auth URL' 
    });
  }
});

router.get('/discord/callback', authenticateToken, async (req, res) => {
  try {
    const { code } = req.query;
    if (!code) {
      throw new Error('No code provided');
    }
    const result = await socialAuthService.verifyDiscord(code as string);
    res.json(result);
  } catch (error) {
    console.error('Discord callback error:', error);
    res.status(500).json({ 
      error: error instanceof Error ? error.message : 'Discord verification failed' 
    });
  }
});

// GitHub OAuth flow
router.get('/github/auth', authenticateToken, async (req, res) => {
  try {
    if (!process.env.GITHUB_CLIENT_ID) {
      throw new Error('GitHub client ID not configured');
    }
    const GITHUB_REDIRECT_URI = encodeURIComponent(process.env.GITHUB_REDIRECT_URI || '');
    const authLink = `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&redirect_uri=${GITHUB_REDIRECT_URI}&scope=read:user`;
    res.json({ url: authLink });
  } catch (error) {
    console.error('GitHub auth error:', error);
    res.status(500).json({ 
      error: error instanceof Error ? error.message : 'Failed to generate GitHub auth URL' 
    });
  }
});

router.get('/github/callback', authenticateToken, async (req, res) => {
  try {
    const { code } = req.query;
    if (!code) {
      throw new Error('No code provided');
    }
    const result = await socialAuthService.verifyGithub(code as string);
    res.json(result);
  } catch (error) {
    console.error('GitHub callback error:', error);
    res.status(500).json({ 
      error: error instanceof Error ? error.message : 'GitHub verification failed' 
    });
  }
});

export default router; 