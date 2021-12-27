import "reflect-metadata";
import { createConnection, getConnectionOptions } from "typeorm";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { OAuth2Client } from "google-auth-library";
import Resolvers from "./resolvers";

(async () => {
  const app = express();
  const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

  const options = await getConnectionOptions("dev-pg");
  await createConnection({ ...options, name: "default" });

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: Resolvers,
      validate: true,
      dateScalarMode: "isoDate",
    }),
    context: ({ req, res }) => ({ req, res, googleClient }),
  });

  apolloServer.applyMiddleware({ app, cors: false });
  const port = process.env.PORT || 5000;
  app.listen(port, () => {
    console.log(`server started at http://localhost:${port}/graphql`);
  });
})();
