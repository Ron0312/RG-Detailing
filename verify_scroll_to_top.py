
from playwright.sync_api import sync_playwright

def test_scroll_to_top():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Navigate to homepage
        page.goto("http://localhost:4321")

        # Check if button is initially hidden
        btn = page.locator("#scrollToTopBtn")
        print("Initial state: ", btn.get_attribute("class"))

        # Scroll down 1000px
        page.evaluate("window.scrollTo(0, 1000)")
        page.wait_for_timeout(500) # wait for transition

        # Check if button is visible (opacity-0 removed)
        classes = btn.get_attribute("class")
        print("After scroll state: ", classes)

        if "opacity-0" not in classes and "pointer-events-none" not in classes:
            print("Button is visible!")
        else:
            print("Button is NOT visible!")

        page.screenshot(path="verification_scroll_to_top.png")

        # Click button
        btn.click()
        page.wait_for_timeout(1000) # wait for scroll

        # Check if scrolled back to top
        scroll_y = page.evaluate("window.scrollY")
        print("Scroll Y after click: ", scroll_y)

        browser.close()

if __name__ == "__main__":
    test_scroll_to_top()
