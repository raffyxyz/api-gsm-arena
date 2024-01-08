import express from "express";

import { scrapeSearch } from "../parser/gsm-parser";

export const search = async (req: express.Request, res: express.Response) => {
  try {
    const result = await scrapeSearch();
    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};
