// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
import { NETWORKS } from "../../../networks";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | any>
) {
  const data: string[] = req.query.slug as string[];
  if (data.length !== 2) {
    res.status(400).json({ message: "Invalid request" });
    return;
  }

  const [chainId, contractAddress] = data;
  if (!(Number(chainId) in NETWORKS)) {
    res.status(400).json({ message: "Unsupported network" });
    return;
  }

  const endpoint = `https://api.etherscan.io/v2/api?module=contract&chainid=${chainId}&action=getsourcecode&address=${contractAddress}&apikey=${process.env.APIKEY_ETHERSCAN}`;
  if (!endpoint) {
    res.status(500).json({ message: "API key not configured" });
    return;
  }

  try {
    const result = await axios.get(endpoint);
    res.status(200).json(result.data);
  } catch (e) {
    res.status(400).json(e);
  }
}
