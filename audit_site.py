import requests
from bs4 import BeautifulSoup
import sys
from urllib.parse import urljoin, urlparse

BASE_URL = "http://localhost:4321"
visited = set()
pages_to_visit = [BASE_URL]
issues = []

def check_page(url):
    if url in visited:
        return
    visited.add(url)

    try:
        r = requests.get(url)
        if r.status_code != 200:
            issues.append(f"BROKEN LINK: {url} returned {r.status_code}")
            return

        # Only parse HTML
        if 'text/html' not in r.headers.get('Content-Type', ''):
            return

        soup = BeautifulSoup(r.content, 'html.parser')

        # SEO Checks
        title = soup.find('title')
        if not title or not title.string:
            issues.append(f"SEO: Missing <title> on {url}")

        meta_desc = soup.find('meta', attrs={'name': 'description'})
        if not meta_desc or not meta_desc.get('content'):
            issues.append(f"SEO: Missing meta description on {url}")

        h1s = soup.find_all('h1')
        if len(h1s) == 0:
            issues.append(f"SEO: Missing <h1> on {url}")
        elif len(h1s) > 1:
            issues.append(f"SEO: Multiple <h1> tags on {url}")

        canonical = soup.find('link', attrs={'rel': 'canonical'})
        if not canonical or not canonical.get('href'):
            issues.append(f"SEO: Missing canonical link on {url}")

        # Image Checks
        images = soup.find_all('img')
        for img in images:
            src = img.get('src')
            alt = img.get('alt')
            if not alt:
                issues.append(f"A11Y: Missing alt text for image {src} on {url}")

        # Crawl internal links
        for a in soup.find_all('a', href=True):
            href = a['href']
            full_url = urljoin(url, href)
            parsed = urlparse(full_url)

            # Check if internal
            if parsed.netloc == 'localhost:4321' or parsed.netloc == '':
                # Normalize
                full_url = full_url.split('#')[0]
                if full_url not in visited and full_url not in pages_to_visit:
                    pages_to_visit.append(full_url)

    except Exception as e:
        issues.append(f"ERROR: Failed to check {url}: {e}")

def run_audit():
    print(f"Starting audit of {BASE_URL}...")
    while pages_to_visit:
        url = pages_to_visit.pop(0)
        # Limit scope to prevent infinite loops or huge crawls if logic is flawed
        if len(visited) > 50:
            break
        check_page(url)

    print(f"Audit complete. Checked {len(visited)} pages.")

    if issues:
        print("\n--- ISSUES FOUND ---")
        for issue in issues:
            print(issue)
        sys.exit(1)
    else:
        print("No critical issues found.")
        sys.exit(0)

if __name__ == "__main__":
    run_audit()
