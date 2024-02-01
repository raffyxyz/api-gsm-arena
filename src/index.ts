import express from "express";
import http from "http";
import cors from "cors";

import router from "./router";

const app = express();

app.use(
  cors({
    credentials: true,
  })
);

const server = http.createServer(app);

server.listen(8080, () => {
  console.log("Server running on http://localhost:8080/");
});

app.get("/", (req: express.Request, res: express.Response) => {
  res
    .status(200)
    .send(
      `Welcome to gsm arena api 🎉 ${
        process.env.NODE_ENV === "DEMO"
          ? "This is a demo of the api for testing and development."
          : ""
      }`
    );
});

app.use("/", router());
