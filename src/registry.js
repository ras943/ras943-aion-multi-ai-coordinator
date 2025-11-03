export default class Registry {
  constructor() {
    this.agents = new Map();
    this.tasks = new Map();
  }

  register(manifest) {
    const id = manifest?.agent?.id || manifest.id || `agent-${Math.random().toString(36).slice(2,8)}`;
    const entry = { id, manifest, registeredAt: Date.now() };
    this.agents.set(id, entry);
    return entry;
  }

  list() {
    return [...this.agents.values()].map(a => ({ id: a.id, manifest: a.manifest }));
  }

  get(id) {
    return this.agents.get(id);
  }

  logTask(jobId, info) {
    this.tasks.set(jobId, { jobId, info, ts: Date.now() });
  }

  getTask(jobId) { return this.tasks.get(jobId); }
}
