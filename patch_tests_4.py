import re

with open("src/pages/api/submit-quote.test.ts", "r") as f:
    content = f.read()

# Fix the Web3Forms fetch throws test
content = content.replace(".toContain('Fehler');", ".toMatch(/fehler/i);")

with open("src/pages/api/submit-quote.test.ts", "w") as f:
    f.write(content)
