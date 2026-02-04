import { P as POST } from '../../chunks/submit-quote_B4ntotls.mjs';
import { describe, it, expect } from 'vitest';
export { renderers } from '../../renderers.mjs';

describe("API submit-quote", () => {
  it("returns 200 for valid data", async () => {
    const req = new Request("http://localhost/api/submit-quote", {
      method: "POST",
      body: JSON.stringify({
        email: "test@example.com",
        size: "small",
        condition: "good",
        package: "wash_interior"
      })
    });
    const res = await POST({ request: req, clientAddress: "127.0.0.1" });
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.success).toBe(true);
  });
  it("returns 400 for invalid data", async () => {
    const req = new Request("http://localhost/api/submit-quote", {
      method: "POST",
      body: JSON.stringify({
        email: "not-an-email",
        size: "invalid"
      })
    });
    const res = await POST({ request: req, clientAddress: "127.0.0.1" });
    expect(res.status).toBe(400);
  });
  it("returns 429 when rate limit exceeded", async () => {
    const createRequest = () => new Request("http://localhost/api/submit-quote", {
      method: "POST",
      body: JSON.stringify({})
    });
    const clientAddress = "10.0.0.1";
    for (let i = 0; i < 10; i++) {
      await POST({ request: createRequest(), clientAddress });
    }
    const res = await POST({ request: createRequest(), clientAddress });
    expect(res.status).toBe(429);
  });
  it("prioritizes x-forwarded-for header for rate limiting", async () => {
    const createRequest = (ipHeader) => new Request("http://localhost/api/submit-quote", {
      method: "POST",
      body: JSON.stringify({}),
      headers: ipHeader ? { "x-forwarded-for": ipHeader } : {}
    });
    const forwardedIp = "203.0.113.1";
    const clientAddress = "127.0.0.1";
    for (let i = 0; i < 10; i++) {
      await POST({ request: createRequest(forwardedIp), clientAddress });
    }
    const resBlocked = await POST({ request: createRequest(forwardedIp), clientAddress });
    expect(resBlocked.status).toBe(429);
    const resAllowed = await POST({ request: createRequest("203.0.113.2"), clientAddress });
    expect(resAllowed.status).not.toBe(429);
  });
});

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
