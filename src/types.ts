import { OAuth2Client } from "google-auth-library";
import express from "express";

export type MyContext = {
  req: express.Request<any, Record<string, any>>;
  res: express.Response<any, Record<string, any>>;
  googleClient: OAuth2Client;
};
