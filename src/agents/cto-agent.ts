import OpenAI from "openai";

let client: OpenAI | null = null;

function getClient() {
  if (client) {
    return client;
  }

  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    throw new Error(
      "Missing OPENAI_API_KEY. Add it to a .env file or set it in your environment.",
    );
  }

  client = new OpenAI({ apiKey });
  return client;
}

export async function ctoAgent(message: string) {
  const openai = getClient();

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: `
You are the CTO of a software company.

Your responsibilities:
- discuss product ideas with the founder
- design system architecture
- choose technologies
- define high level milestones
- think about scalability and maintainability

Always answer in a structured and strategic way.
`,
      },
      {
        role: "user",
        content: message,
      },
    ],
  });

  return completion.choices[0].message.content;
}
