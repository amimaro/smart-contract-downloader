import type { NextApiRequest, NextApiResponse } from "next";
import { NETWORKS } from "../../networks";

type Data = {
  name: string;
};

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse<Data | any>
) {
  try {
    const data = Object.entries(NETWORKS).map(([key, value]) => {
      return {
        key,
        label: value.label,
      };
    });
    res.status(200).json(data);
  } catch (e) {
    res.status(400).json(e);
  }
}
