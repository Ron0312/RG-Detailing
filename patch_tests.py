import re

with open("src/pages/api/submit-quote.test.ts", "r") as f:
    content = f.read()

# Replace test payload to include name and phone
old_payload = """body: JSON.stringify({
                email: 'test@example.com',
                size: 'small',
                condition: 'good',
                package: 'wash_interior'
            })"""

new_payload = """body: JSON.stringify({
                name: 'Test User',
                phone: '0123456789',
                email: 'test@example.com',
                size: 'small',
                condition: 'good',
                package: 'wash_interior'
            })"""

content = content.replace(old_payload, new_payload)

# Also fix the 415 test payload if needed
old_payload_415 = """body: JSON.stringify({
                email: 'test@example.com',
                size: 'small',
                condition: 'good',
                package: 'wash_interior'
            })"""
content = content.replace(old_payload_415, new_payload)

with open("src/pages/api/submit-quote.test.ts", "w") as f:
    f.write(content)
