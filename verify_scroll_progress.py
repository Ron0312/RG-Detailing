from playwright.sync_api import sync_playwright

def verify_scroll_progress():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        # Emulate a small viewport to make scrolling easier to trigger
        context = browser.new_context(viewport={"width": 375, "height": 667})
        page = context.new_page()

        try:
            # Go to the local dev server
            page.goto("http://[::1]:4321")

            # Wait for the page to load
            page.wait_for_load_state("networkidle")

            # Scroll down to trigger the progress bar
            page.evaluate("window.scrollTo(0, document.body.scrollHeight / 2)")

            # Wait a bit for the requestAnimationFrame to fire and transform to apply
            page.wait_for_timeout(500)

            # Take a screenshot
            page.screenshot(path="verify_scroll_progress.png")
            print("Screenshot taken successfully: verify_scroll_progress.png")

        except Exception as e:
            print(f"Verification failed: {e}")
        finally:
            browser.close()

if __name__ == "__main__":
    verify_scroll_progress()