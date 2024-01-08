import express from "express";

import { scrapeSearch, scrapeInfo } from "../parser/gsm-parser";
import { formatSearch } from "../helper";

export const search = async (req: express.Request, res: express.Response) => {
  const query = req.query.q;
  try {
    const result = await scrapeSearch(formatSearch(query as string));
    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const info = async (req: express.Request, res: express.Response) => {
  const { id } = req.params;
  try {
    const result = await scrapeInfo(id as string);

    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
  }
};
