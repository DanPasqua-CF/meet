'use strict';

const { google } = require('googleapis');
const calendar = google.calendar({ version: "v3" });
const SCOPES = ["https://www.googleapis.com/auth/calendar.events.public.readonly"];
const { CALENDAR_ID, CLIENT_ID, CLIENT_SECRET } = process.env;
const redirect_uri = [
  "https://meet-mu.vercel.app"
];

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  redirect_uri
);

let tokenStore = {
  access_token: null,
  refresh_token: null,
  expiry_date: null
};

module.exports.getAuthURL = async () => {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    prompt: "consent",
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

module.exports.getAccessToken = async (event) => {
  const code = decodeURIComponent(`${event.pathParameters.code}`);

  try {
    const { tokens } = await oAuth2Client.getToken(code);
    oAuth2Client.setCredentials(tokens);

    tokenStore = {
      access_token: tokens.access_token,
      refresh_token: tokens.refresh_token || tokenStore.refresh_token,
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
  }
  catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message || error })
    }
  }
}

module.exports.getCalendarEvents = async (event) => {
  const access_token = decodeURIComponent(`${event.pathParameters.access_token}`);

  oAuth2Client.setCredentials({ access_token });

  return new Promise((resolve, reject) => {
    calendar.events.list(
      {
        calendarId: CALENDAR_ID,
        auth: oAuth2Client,
        timeMin: new Date().toISOString(),
        singleEvents: true,
        orderBy: "startTime",
        maxResults: 50
      },
      (error, response) => {
        if (error) {
          console.error('Calendar API error:', error);
          reject(error);
        }
        return resolve(response)
      }
    );
  })
  .then((results) => {
    const events = results.data.items || [];
    console.log('Fetched events:', events.length);
    
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
      },
      body: JSON.stringify({ events })
    };
  })
  .catch((error) => {
    console.error('Fetch calendar error:', error);

    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
      },
      body: JSON.stringify({
        message: "Failed to fetch calendar events",
        error: error.message || error
      })
    }
  });
}
