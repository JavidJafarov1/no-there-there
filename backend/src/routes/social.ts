import { Router } from 'express';
import { socialAuthService } from '../services/socialAuth';
import { authenticateToken } from '../middleware/auth';

const router = Router();

// Twitter OAuth flow
router.get('/twitter/auth', authenticateToken, async (req, res) => {
  try {
    const authLink = `https://api.twitter.com/oauth/authenticate?oauth_token=${process.env.TWITTER_API_KEY}`;
    res.json({ url: authLink });
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate Twitter auth URL' });
  }
});

router.get('/twitter/callback', authenticateToken, async (req, res) => {
  try {
    const { oauth_token, oauth_verifier } = req.query;
    const result = await socialAuthService.verifyTwitter(
      oauth_token as string,
      oauth_verifier as string
    );
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Twitter verification failed' });
  }
});

// Discord OAuth flow
router.get('/discord/auth', authenticateToken, async (req, res) => {
  try {
    const DISCORD_CLIENT_ID = process.env.DISCORD_CLIENT_ID;
    const DISCORD_REDIRECT_URI = process.env.DISCORD_REDIRECT_URI;
    const authLink = `https://discord.com/api/oauth2/authorize?client_id=${DISCORD_CLIENT_ID}&redirect_uri=${DISCORD_REDIRECT_URI}&response_type=code&scope=identify`;
    res.json({ url: authLink });
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate Discord auth URL' });
  }
});

router.get('/discord/callback', authenticateToken, async (req, res) => {
  try {
    const { code } = req.query;
    const result = await socialAuthService.verifyDiscord(code as string);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Discord verification failed' });
  }
});

// GitHub OAuth flow
router.get('/github/auth', authenticateToken, async (req, res) => {
  try {
    const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
    const GITHUB_REDIRECT_URI = process.env.GITHUB_REDIRECT_URI;
    const authLink = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&redirect_uri=${GITHUB_REDIRECT_URI}&scope=read:user`;
    res.json({ url: authLink });
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate GitHub auth URL' });
  }
});

router.get('/github/callback', authenticateToken, async (req, res) => {
  try {
    const { code } = req.query;
    const result = await socialAuthService.verifyGithub(code as string);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'GitHub verification failed' });
  }
});

export default router; 