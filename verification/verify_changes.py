from playwright.sync_api import sync_playwright, expect
import time

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    # Desktop View
    context = browser.new_context(viewport={"width": 1440, "height": 1200})
    page = context.new_page()

    # 1. Verify Home
    print("Verifying Home (High-End Design)...")
    page.goto("http://localhost:4321")
    # Verify new H1
    expect(page.get_by_role("heading", name="Wellness für Ihr Automobil")).to_be_visible()
    # Verify Cities Grid exists
    expect(page.get_by_text("Wir sind aktiv in")).to_be_visible()
    expect(page.get_by_role("link", name="Kiel")).to_be_visible()

    # Wait for font/layout
    time.sleep(1)
    page.screenshot(path="verification/home_v2.png", full_page=True)

    # 2. Verify City Landing Page (Kiel)
    print("Verifying Kiel Landing Page...")
    page.get_by_role("link", name="Kiel").click()
    # Verify dynamic H1
    expect(page.get_by_role("heading", name="Premium Aufbereitung für Kiel")).to_be_visible()
    # Verify content injection
    expect(page.get_by_text("Kieler Autos haben einen natürlichen Feind")).to_be_visible()

    time.sleep(1)
    page.screenshot(path="verification/city_kiel.png", full_page=True)

    # 3. Verify Mobile View
    print("Verifying Mobile View...")
    context_mobile = browser.new_context(viewport={"width": 390, "height": 844})
    page_mobile = context_mobile.new_page()
    page_mobile.goto("http://localhost:4321")
    time.sleep(1)
    page_mobile.screenshot(path="verification/home_mobile.png")

    browser.close()

with sync_playwright() as playwright:
    run(playwright)
