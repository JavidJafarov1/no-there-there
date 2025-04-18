import { OAuth2Client } from 'google-auth-library';
import { TwitterApi } from 'twitter-api-v2';
import { Octokit } from '@octokit/rest';
import { REST } from '@discordjs/rest';
import { APIUser } from 'discord-api-types/v10';
import axios from 'axios';

// Type definitions for API responses
interface DiscordTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
  error?: string;
}

interface DiscordUserResponse extends APIUser {
  message?: string;
}

interface GithubTokenResponse {
  access_token: string;
  token_type: string;
  scope: string;
  error?: string;
  error_description?: string;
}

// Initialize OAuth clients that don't require immediate validation
const discordRest = new REST({ version: '10' }).setToken(process.env.DISCORD_BOT_TOKEN || '');

const githubClient = new Octokit({
  auth: process.env.GITHUB_ACCESS_TOKEN,
});

export interface SocialVerificationResult {
  platform: string;
  success: boolean;
  userId: string;
  username: string;
  error?: string;
}

export const socialAuthService = {
  async verifyTwitter(oauth_token: string, oauth_verifier: string): Promise<SocialVerificationResult> {
    if (!process.env.TWITTER_API_KEY || !process.env.TWITTER_API_SECRET) {
      throw new Error('Twitter API credentials not configured');
    }

    try {
      const client = new TwitterApi({
        appKey: process.env.TWITTER_API_KEY,
        appSecret: process.env.TWITTER_API_SECRET,
      });

      // Login with OAuth 1.0a tokens
      const { client: loggedClient, accessToken, accessSecret } = await client.login(oauth_verifier);

      // Get the user's data
      const user = await loggedClient.v2.me();

      return {
        platform: 'Twitter',
        success: true,
        userId: user.data.id,
        username: user.data.username,
      };
    } catch (error) {
      console.error('Twitter verification error:', error);
      return {
        platform: 'Twitter',
        success: false,
        userId: '',
        username: '',
        error: error instanceof Error ? error.message : 'Failed to verify Twitter account',
      };
    }
  },

  async verifyDiscord(code: string): Promise<SocialVerificationResult> {
    try {
      if (!process.env.DISCORD_CLIENT_ID || !process.env.DISCORD_CLIENT_SECRET) {
        throw new Error('Discord API credentials not configured');
      }

      // Exchange code for access token
      const params = new URLSearchParams({
        client_id: process.env.DISCORD_CLIENT_ID,
        client_secret: process.env.DISCORD_CLIENT_SECRET,
        code,
        grant_type: 'authorization_code',
        redirect_uri: process.env.DISCORD_REDIRECT_URI || '',
        scope: 'identify',
      });

      const tokenResponse = await fetch('https://discord.com/api/oauth2/token', {
        method: 'POST',
        body: params,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      const tokens = await tokenResponse.json() as DiscordTokenResponse;

      if (!tokenResponse.ok || tokens.error) {
        throw new Error(tokens.error || 'Failed to get access token');
      }

      // Get user data with access token
      const userResponse = await fetch('https://discord.com/api/users/@me', {
        headers: {
          Authorization: `Bearer ${tokens.access_token}`,
        },
      });

      const userData = await userResponse.json() as DiscordUserResponse;

      if (!userResponse.ok || userData.message) {
        throw new Error(userData.message || 'Failed to get user data');
      }

      return {
        platform: 'Discord',
        success: true,
        userId: userData.id,
        username: userData.username,
      };
    } catch (error) {
      console.error('Discord verification error:', error);
      return {
        platform: 'Discord',
        success: false,
        userId: '',
        username: '',
        error: error instanceof Error ? error.message : 'Failed to verify Discord account',
      };
    }
  },

  async verifyGithub(code: string): Promise<SocialVerificationResult> {
    try {
      if (!process.env.GITHUB_CLIENT_ID || !process.env.GITHUB_CLIENT_SECRET) {
        throw new Error('GitHub API credentials not configured');
      }

      // Exchange code for access token
      const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          client_id: process.env.GITHUB_CLIENT_ID,
          client_secret: process.env.GITHUB_CLIENT_SECRET,
          code,
        }),
      });

      const tokens = await tokenResponse.json() as GithubTokenResponse;

      if (tokens.error) {
        throw new Error(tokens.error_description || 'Failed to get access token');
      }

      // Create a new Octokit instance with the access token
      const octokit = new Octokit({ auth: tokens.access_token });
      const { data: user } = await octokit.users.getAuthenticated();

      return {
        platform: 'GitHub',
        success: true,
        userId: user.id.toString(),
        username: user.login,
      };
    } catch (error) {
      console.error('GitHub verification error:', error);
      return {
        platform: 'GitHub',
        success: false,
        userId: '',
        username: '',
        error: error instanceof Error ? error.message : 'Failed to verify GitHub account',
      };
    }
  },
}; 