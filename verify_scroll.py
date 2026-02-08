import time
from playwright.sync_api import sync_playwright

def verify_scroll_progress():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        try:
            # Go to a glossary page where ScrollProgress is used
            page.goto("http://localhost:4321/glossar/keramikversiegelung")

            # Wait for hydration
            page.wait_for_timeout(2000)

            # Scroll down to 50%
            page.evaluate("window.scrollTo(0, document.body.scrollHeight / 2)")

            # Wait for scroll animation/update
            page.wait_for_timeout(500)

            # Take screenshot of the top of the page where the progress bar is
            # The progress bar is fixed at top: h-1 bg-red-600
            page.screenshot(path="verification_scroll_progress.png", clip={"x": 0, "y": 0, "width": 1000, "height": 50})

            # Also get the element style to verify programmatically
            # The progress bar is the inner div of the fixed div at top
            transform = page.evaluate("""
                () => {
                    const bar = document.querySelector('div.fixed.top-0 > div');
                    return bar ? bar.style.transform : 'not found';
                }
            """)
            print(f"Transform value: {transform}")

        except Exception as e:
            print(f"Error: {e}")
        finally:
            browser.close()

if __name__ == "__main__":
    verify_scroll_progress()
