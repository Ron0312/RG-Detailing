from playwright.sync_api import Page, expect, sync_playwright
import time
import re

def verify_ci(page: Page):
    print("Navigating to home...")
    page.goto("http://localhost:4321")

    # Screenshot Header and Hero
    print("Taking CI Homepage screenshot...")
    page.screenshot(path="verification/ci_homepage.png")

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            verify_ci(page)
        finally:
            browser.close()
