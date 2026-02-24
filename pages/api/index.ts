// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = string;

type OpenAIResponse = {
  output_text?: string;
  output?: Array<{
    content?: Array<{
      type?: string;
      text?: string;
    }>;
  }>;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    res.status(500).send("Missing OPENAI_API_KEY");
    return;
  }

  const query = req.query.q as string;
  if (!query || query.trim() === "") {
    res.status(400).send("Missing query");
    return;
  }

  try {
    const openAIResponse = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4.1-mini",
        input: query,
      }),
    });

    if (!openAIResponse.ok) {
      res.status(openAIResponse.status).send("OpenAI API request failed");
      return;
    }

    const payload = (await openAIResponse.json()) as OpenAIResponse;
    const text =
      payload.output_text ??
      payload.output
        ?.flatMap((item) => item.content ?? [])
        .filter((contentItem) => contentItem.type === "output_text")
        .map((contentItem) => contentItem.text ?? "")
        .join("")
        .trim() ??
      "";

    res.status(200).send(text);
  } catch {
    res.status(500).send("Failed to process query");
  }
}
