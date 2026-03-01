import re

with open("src/pages/api/submit-quote.test.ts", "r") as f:
    content = f.read()

# Fix the Web3Forms mock for the "returns 200 for valid data" test
if "global.fetch = vi.fn" not in content[:content.find("'returns 200 for valid data'")]:
    # It seems global.fetch is not mocked by default, and in the CI environment it's trying to do a real fetch and getting an error parsing HTML.
    # Let's add a global fetch mock at the top of the test suite.
    mock_code = """describe('API submit-quote', () => {
    beforeEach(() => {
        global.fetch = vi.fn(() => Promise.resolve({
            json: () => Promise.resolve({ success: true }),
            ok: true
        })) as any;
    });"""
    content = content.replace("describe('API submit-quote', () => {", mock_code)


with open("src/pages/api/submit-quote.test.ts", "w") as f:
    f.write(content)
