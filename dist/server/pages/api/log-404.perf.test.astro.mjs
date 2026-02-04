import { vi, describe, afterEach, it, expect } from 'vitest';
import { P as POST } from '../../chunks/log-404_C-ZN4png.mjs';
export { renderers } from '../../renderers.mjs';

vi.mock("node:fs/promises", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    default: {
      ...actual.default,
      mkdir: vi.fn().mockResolvedValue(void 0),
      appendFile: vi.fn().mockImplementation(async () => {
        await new Promise((resolve) => setTimeout(resolve, 100));
      })
    }
  };
});
describe("POST /api/log-404 performance", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });
  it("should measure response time with slow fs", async () => {
    const req = new Request("http://localhost/api/log-404", {
      method: "POST",
      body: JSON.stringify({ url: "/foo", referrer: "", userAgent: "test" }),
      headers: { "Content-Type": "application/json" }
    });
    const start = performance.now();
    const response = await POST({ request: req, clientAddress: "127.0.0.99" });
    const end = performance.now();
    const duration = end - start;
    console.log(`[Perf] Request Duration: ${duration.toFixed(2)}ms`);
    expect(response.status).toBe(200);
  });
});

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
