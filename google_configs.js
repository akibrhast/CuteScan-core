const {google} = require('googleapis');
const OAuth2Data = require('./credentials.json');

const CLIENT_ID = OAuth2Data.web.client_id;
const CLIENT_SECRET = OAuth2Data.web.client_secret;
const REDIRECT_URI = OAuth2Data.web.redirect_uris[0];
const scopes = 'https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/userinfo.profile';

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID, 
  CLIENT_SECRET, 
  REDIRECT_URI
);

const drive = google.drive({ 
    version: "v3",
    auth: oAuth2Client  
});

const auth_url = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: scopes 
});

module.exports = {
    oAuth2Client:oAuth2Client,
    scopes:scopes,
    drive:drive,
    auth_url:auth_url
}