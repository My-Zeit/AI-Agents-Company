import { ctoAgent } from "../agents/cto-agent";

export async function orchestrator(message: string) {
  const response = await ctoAgent(message);

  return response;
}
