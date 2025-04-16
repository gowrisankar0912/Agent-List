export interface Agent {
  id?: string;
  name: string;
  model: string;
  submodel: string;
  description: string;
  systemPrompt: string;
  userPrompt: string;
  decisionPrompt: string;
}