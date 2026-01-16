from playwright.sync_api import Page, expect, sync_playwright
import time
import re

def verify_ci(page: Page):
    print("Navigating to home...")
    page.goto("http://localhost:4321")

    print("Checking title...")
    expect(page).to_have_title(re.compile("Premium Fahrzeugaufbereitung"))

    # Screenshot Header and Hero
    print("Taking CI Homepage screenshot...")
    page.screenshot(path="/home/jules/verification/ci_homepage.png")

    print("Checking Price Calculator Colors...")
    page.locator("#rechner").scroll_into_view_if_needed()
    page.get_by_text("Mittelklasse / Kombi").click()
    page.get_by_text("Gebraucht").click()

    # Check if we see Red colors (hard to check via text, but we can verify class presence if we want, or just screenshot)
    # Taking screenshot of calculator in Red theme
    page.screenshot(path="/home/jules/verification/ci_calculator.png")

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            verify_ci(page)
        finally:
            browser.close()
