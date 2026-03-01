import re

with open("src/pages/api/submit-quote.test.ts", "r") as f:
    content = f.read()

# Add beforeEach to vitest imports
content = content.replace("import { describe, it, expect, vi, afterEach } from 'vitest';", "import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';")

with open("src/pages/api/submit-quote.test.ts", "w") as f:
    f.write(content)
