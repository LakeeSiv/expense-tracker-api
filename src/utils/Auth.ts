import { OAuth2Client } from "google-auth-library";

export const googleAuth = async (client: OAuth2Client, token: string) => {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.GOOGLE_CLIENT_ID,
  });
  const payload = ticket.getPayload();

  return payload ? payload : undefined;
};
