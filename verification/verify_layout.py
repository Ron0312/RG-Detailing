from playwright.sync_api import sync_playwright
import time

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    page = browser.new_page(viewport={'width': 1280, 'height': 1200}) # Taller viewport to see more

    print("Navigating...")
    try:
        page.goto("http://localhost:4321/dampfreinigung", timeout=60000)
    except Exception as e:
        print(f"Error loading page: {e}")
        browser.close()
        return

    print("Loaded. Waiting for networkidle...")
    page.wait_for_load_state("networkidle")

    # Scroll to the target section
    print("Scrolling to target...")
    try:
        target = page.get_by_text("Warum Dampf besser ist als Chemie")
        target.scroll_into_view_if_needed()
    except Exception as e:
        print(f"Could not find target text: {e}")

    time.sleep(2) # Allow images to load/settle

    print("Taking screenshot...")
    page.screenshot(path="verification/layout_fix.png")

    browser.close()

with sync_playwright() as playwright:
    run(playwright)
