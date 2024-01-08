import express from "express";

import gsm from "./gsm";

const router = express.Router();

export default (): express.Router => {
  gsm(router);
  return router;
};
