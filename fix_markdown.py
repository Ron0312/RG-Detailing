import sys

def main():
    with open('.jules/sentinel.md', 'r') as f:
        content = f.read()

    # Try an exact replace
    to_replace = 'import.meta.env` (build time).## 2025-02-14'
    replacement = 'import.meta.env` (build time).\n\n## 2025-02-14'

    if to_replace in content:
        content = content.replace(to_replace, replacement)
        with open('.jules/sentinel.md', 'w') as f:
            f.write(content)
        print("Replaced!")
    else:
        print("String not found")

if __name__ == "__main__":
    main()
