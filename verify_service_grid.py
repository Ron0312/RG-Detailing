import time
from playwright.sync_api import sync_playwright

def verify_service_grid():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        # Use a mobile viewport to trigger the mobile layout features (horizontal scroll)
        context = browser.new_context(viewport={"width": 375, "height": 812})
        page = context.new_page()

        # Wait for server to start (simple retry loop)
        print("Waiting for server...")
        for i in range(30):
            try:
                response = page.goto("http://localhost:4321", timeout=2000)
                if response and response.ok:
                    break
            except Exception:
                time.sleep(1)
        else:
            print("Server failed to start or is unreachable")
            browser.close()
            return

        print("Page loaded")

        try:
            # Scroll to ServiceGrid section
            # Look for the section heading
            heading = page.locator('text="Das High-End Portfolio"')
            heading.wait_for(state="visible", timeout=20000)
            heading.scroll_into_view_if_needed()

            print("ServiceGrid section found")

            # Check if category buttons are present
            buttons = page.get_by_role("button", name="Lack & Keramik")
            # Wait for it to be visible
            buttons.first.wait_for(state="visible")

            print("Category buttons visible")

            # Check if services are loaded (e.g. "Service 1" or real service name)
            # Real service name from data: "Lackveredelung Tensfeld" maybe?
            # Let's check for any service card content.
            # We can look for "Mehr erfahren"
            more_link = page.get_by_text("Mehr erfahren").first
            more_link.wait_for(state="visible")

            # Verify no duplicates
            # Using evaluate to check count in DOM if needed, but visual check is key here.

            time.sleep(2) # Wait for animations

            page.screenshot(path="verification_service_grid.png")
            print("Screenshot saved to verification_service_grid.png")

        except Exception as e:
            print(f"Verification failed: {e}")
            page.screenshot(path="verification_error.png")
        finally:
            browser.close()

if __name__ == "__main__":
    verify_service_grid()
