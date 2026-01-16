from playwright.sync_api import Page, expect, sync_playwright
import time
import re

def verify_app(page: Page):
    print("Navigating to home...")
    page.goto("http://localhost:4321")

    print("Checking title...")
    expect(page).to_have_title(re.compile("Premium Fahrzeugaufbereitung"))

    print("Checking Price Calculator...")
    # Scroll to calculator
    page.locator("#rechner").scroll_into_view_if_needed()

    # Step 1: Size
    print("Selecting size...")
    # Wait for hydration if needed, but click usually handles it
    page.get_by_text("Mittelklasse / Kombi").click()

    # Step 2: Condition
    print("Selecting condition...")
    page.get_by_text("Gebraucht").click()

    # Step 3: Package
    print("Selecting package...")
    # Click the first available package card
    page.locator("button").filter(has_text="Basispreis").first.click()

    # Now at Result step
    expect(page.get_by_text("Ihre Preisschätzung")).to_be_visible()

    print("Taking calculator screenshot...")
    page.screenshot(path="/home/jules/verification/calculator_result.png")

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            verify_app(page)
        finally:
            browser.close()
