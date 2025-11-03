import fetch from 'node-fetch';

export default class AIProxy {
  constructor(opts = {}) {
    this.endpoint = opts.endpoint || process.env.LLM_ENDPOINT || 'https://api.openai.example/v1/llm';
    this.apiKey = opts.apiKey || process.env.LLM_API_KEY || null;
  }

  async ask({ model = 'gpt-5', prompt, context = {}, maxTokens = 512 }) {
    if (!this.apiKey) {
      return { model, output: `SIMULATED RESPONSE for prompt: ${prompt.slice(0,120)}...`, meta: { simulated: true } };
    }
    const res = await fetch(this.endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${this.apiKey}` },
      body: JSON.stringify({ model, prompt, context, maxTokens })
    });
    const json = await res.json();
    return json;
  }
}
