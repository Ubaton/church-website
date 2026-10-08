import { normalizeSermon } from "./sermonData.js";

export function createSermonCache(read, ttl = 300000) {
  const cache = new Map();
  const pending = new Map();
  return {
    async load(scope = "latest", { force = false } = {}) {
      const complete = cache.get("archive");
      const entry = cache.get(scope);
      if (!force) {
        if (complete && Date.now() - complete.time < ttl) {
          return scope === "latest" ? complete.data.slice(0, 4) : complete.data;
        }
        if (entry && Date.now() - entry.time < ttl) return entry.data;
      }
      if (pending.has(scope)) return pending.get(scope);
      const request = Promise.resolve()
        .then(() => read(scope))
        .then((records) => {
          const data = records
            .map(normalizeSermon)
            .sort((a, b) => b.timestamp - a.timestamp);
          cache.set(scope, { data, time: Date.now() });
          return data;
        })
        .finally(() => pending.delete(scope));
      pending.set(scope, request);
      return request;
    },
  };
}
