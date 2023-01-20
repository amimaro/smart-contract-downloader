// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getContractSourceCode } from "../../../common/lib/explorers";

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
  }

  const [network, contractAddress] = data;

  try {
    const result = await getContractSourceCode(network, contractAddress);
    res.status(200).json(result.data);
  } catch (e) {
    res.status(400).json(e);
  }
}
