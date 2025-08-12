'use strict';

const { google } = require('googleapis');
const calendar = google.calendar({ version: 'v3' });
const SCOPES = ['https://www.googleapis.com/auth/calendar.events.public.readonly'];

const { CALENDAR_ID, CLIENT_ID, CLIENT_SECRET } = process.env;
const redirect_uri = 'https://meet-dgdmf59xb-dans-projects-4b9e2996.vercel.app/';

// OAuth2 Client
const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  redirect_uri
);

// 🔐 In-memory token store (replace with DB or session in production)
let tokenStore = {
  access_token: null,
  refresh_token: null,
  expiry_date: null
};

// 🌐 Generate Google OAuth2 Auth URL
module.exports.getAuthURL = async () => {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',      // necessary for refresh_token
    prompt: 'consent',           // forces Google to return refresh_token
    scope: SCOPES
  });

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    },
    body: JSON.stringify({ authUrl })
  };
};

// 🔁 Exchange code for access + refresh token
module.exports.getAccessToken = async (event) => {
  const code = decodeURIComponent(event.pathParameters.code);

  try {
    const { tokens } = await oAuth2Client.getToken(code);
    oAuth2Client.setCredentials(tokens);

    // Save tokens to memory (or replace with DB)
    tokenStore = {
      access_token: tokens.access_token,
      refresh_token: tokens.refresh_token || tokenStore.refresh_token, // Google only sends refresh_token once
      expiry_date: tokens.expiry_date
    };

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
      },
      body: JSON.stringify(tokens)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message || error })
    };
  }
};

// 📆 Fetch Calendar Events using cached or refreshed token
module.exports.getCalendarEvents = async () => {
  try {
    // Set stored credentials
    oAuth2Client.setCredentials({
      access_token: tokenStore.access_token,
      refresh_token: tokenStore.refresh_token,
      expiry_date: tokenStore.expiry_date
    });

    // 🔄 Check if token is expired and refresh if needed
    const now = Date.now();
    if (tokenStore.expiry_date && now >= tokenStore.expiry_date) {
      const { credentials } = await oAuth2Client.refreshAccessToken();
      oAuth2Client.setCredentials(credentials);

      // Update stored token
      tokenStore = {
        access_token: credentials.access_token,
        refresh_token: credentials.refresh_token || tokenStore.refresh_token,
        expiry_date: credentials.expiry_date
      };
    }

    // ✅ Fetch calendar events
    const response = await calendar.events.list({
      calendarId: CALENDAR_ID,
      auth: oAuth2Client,
      timeMin: new Date().toISOString(),
      singleEvents: true,
      orderBy: 'startTime',
      maxResults: 2
    });

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
      },
      body: JSON.stringify(response.data)
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
      },
      body: JSON.stringify({
        message: 'Failed to fetch calendar events',
        error: error.message || error
      })
    };
  }
};
