export default class Router {
  constructor({ registry, taskQueue }) {
    this.registry = registry;
    this.taskQueue = taskQueue;
  }

  decideRoute(targetAgent, payload) {
    if (targetAgent && this.registry.get(targetAgent)) {
      return { target: targetAgent, meta: { reason: 'explicit' } };
    }

    const t = (payload && payload.type) || null;
    if (t === 'support' && this.registry.get('AION-Support')) return { target: 'AION-Support', meta: { reason: 'heuristic: support' } };
    if (t === 'compliance' && this.registry.get('AION-Compliance')) return { target: 'AION-Compliance', meta: { reason: 'heuristic: compliance' } };
    if (t === 'market' && this.registry.get('AION-Market')) return { target: 'AION-Market', meta: { reason: 'heuristic: market' } };

    const agents = this.registry.list();
    const chosen = agents.length ? agents[0].id : 'AION-Default';
    return { target: chosen, meta: { reason: 'fallback' } };
  }
}
