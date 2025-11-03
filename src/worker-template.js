import { Worker, Queue } from 'bullmq';
import IORedis from 'ioredis';
import AIProxy from './ai-proxy.js';
import Registry from './registry.js';

const REDIS_URL = process.env.REDIS_URL || 'redis://127.0.0.1:6379';
const redis = new IORedis(REDIS_URL);
const taskQueue = new Queue('aion-tasks', { connection: redis });

const AGENT_ID = process.env.AGENT_ID || 'AION-Support';
const ai = new AIProxy({});

const registry = new Registry();
registry.register({ agent: { id: AGENT_ID, role: 'worker' } });

console.log(`[${AGENT_ID}] Worker starting, listening for tasks...`);

const worker = new Worker('aion-tasks', async job => {
  const data = job.data || {};
  if (data.targetAgent !== AGENT_ID) {
    return { ignored: true };
  }
  console.log(`[${AGENT_ID}] Running job ${job.id}`, data.payload);

  const prompt = `Agent ${AGENT_ID} execute task: ${JSON.stringify(data.payload).slice(0,400)}`;
  const response = await ai.ask({ prompt, model: 'gpt-5', maxTokens: 512 });

  const result = {
    agent: AGENT_ID,
    jobId: job.id,
    output: response,
    ts: Date.now()
  };

  console.log(`[${AGENT_ID}] Completed job ${job.id} -> result summary:`, (response.output || JSON.stringify(response)).slice(0,200));
  return result;
}, { connection: redis });

worker.on('failed', (job, err) => {
  console.error(`[${AGENT_ID}] Job failed:`, job?.id, err?.message);
});
