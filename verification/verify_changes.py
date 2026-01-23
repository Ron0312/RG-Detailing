from playwright.sync_api import sync_playwright

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    page = browser.new_page()

    # 1. Homepage Hero
    print("Checking Homepage...")
    page.goto("http://localhost:4321/")
    page.wait_for_selector("main")
    page.screenshot(path="verification/homepage.png")

    # 2. Dampfreinigung
    print("Checking Dampfreinigung...")
    page.goto("http://localhost:4321/dampfreinigung")
    page.wait_for_selector("main")
    page.screenshot(path="verification/dampfreinigung.png")

    # 3. Wohnmobil
    print("Checking Wohnmobil...")
    page.goto("http://localhost:4321/wohnmobil")
    page.wait_for_selector("main")
    # Scroll to pricing if possible, or just take full page screenshot
    page.screenshot(path="verification/wohnmobil.png", full_page=True)

    # 4. Mobile Header
    print("Checking Mobile Header...")
    page.set_viewport_size({"width": 375, "height": 812})
    page.goto("http://localhost:4321/")
    page.wait_for_selector("header")
    page.screenshot(path="verification/mobile_header.png")

    browser.close()

with sync_playwright() as playwright:
    run(playwright)
