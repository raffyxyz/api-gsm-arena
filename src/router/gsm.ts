import express from "express";

import { search, info } from "../controllers/gsm";

export default (router: express.Router) => {
  router.get("/gsm/search", search);
  router.get("/gsm/info/:id", info);
};
