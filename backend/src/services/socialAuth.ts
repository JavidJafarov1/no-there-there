import { OAuth2Client } from 'google-auth-library';
import { TwitterApi } from 'twitter-api-v2';
import { Client } from '@octokit/rest';
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v10';

// Initialize OAuth clients
const twitterClient = new TwitterApi({
  appKey: process.env.TWITTER_API_KEY || '',
  appSecret: process.env.TWITTER_API_SECRET || '',
  accessToken: process.env.TWITTER_ACCESS_TOKEN,
  accessSecret: process.env.TWITTER_ACCESS_SECRET,
});

const discordRest = new REST({ version: '10' }).setToken(process.env.DISCORD_BOT_TOKEN || '');

const githubClient = new Client({
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
  async verifyTwitter(oauthToken: string, oauthVerifier: string): Promise<SocialVerificationResult> {
    try {
      const { client: loggedClient } = await twitterClient.login(oauthVerifier);
      const currentUser = await loggedClient.currentUser();
      
      return {
        platform: 'Twitter',
        success: true,
        userId: currentUser.id_str,
        username: currentUser.screen_name,
      };
    } catch (error) {
      console.error('Twitter verification error:', error);
      return {
        platform: 'Twitter',
        success: false,
        userId: '',
        username: '',
        error: 'Failed to verify Twitter account',
      };
    }
  },

  async verifyDiscord(code: string): Promise<SocialVerificationResult> {
    try {
      const userData = await discordRest.get(Routes.user('@me'));
      
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
        error: 'Failed to verify Discord account',
      };
    }
  },

  async verifyGithub(code: string): Promise<SocialVerificationResult> {
    try {
      const { data: user } = await githubClient.users.getAuthenticated();
      
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
        error: 'Failed to verify GitHub account',
      };
    }
  },
}; 