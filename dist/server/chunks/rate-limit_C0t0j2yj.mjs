const hits = /* @__PURE__ */ new Map();
function checkRateLimit(identifier, limit, windowMs) {
  const now = Date.now();
  const record = hits.get(identifier);
  if (!record || now > record.expiry) {
    hits.set(identifier, { count: 1, expiry: now + windowMs });
    return true;
  }
  if (record.count >= limit) {
    return false;
  }
  record.count++;
  return true;
}
if (typeof setInterval !== "undefined") {
  setInterval(() => {
    const now = Date.now();
    for (const [key, record] of hits) {
      if (now > record.expiry) {
        hits.delete(key);
      }
    }
  }, 5 * 60 * 1e3).unref?.();
}

export { checkRateLimit as c };
