import express from "express";

import { search } from "../controllers/gsm";

export default (router: express.Router) => {
  router.get("/search", search);
};
