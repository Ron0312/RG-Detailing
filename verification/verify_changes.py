from playwright.sync_api import sync_playwright, expect

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context(viewport={"width": 1280, "height": 3000}) # Large height to capture full page
    page = context.new_page()

    # 1. Verify Home
    print("Verifying Home...")
    page.goto("http://localhost:4321")
    expect(page.get_by_role("heading", name="Schluss mit Waschanlagen-Kratzern")).to_be_visible()
    page.screenshot(path="verification/home.png")

    # 2. Verify Wohnmobil
    print("Verifying Wohnmobil...")
    # Navigate via link
    page.get_by_role("link", name="Wohnmobil-Spezial").click()
    expect(page.get_by_role("heading", name="Wohnmobil & Caravan")).to_be_visible()
    page.screenshot(path="verification/wohnmobil.png")

    # 3. Verify Dampfreinigung
    print("Verifying Dampfreinigung...")
    page.goto("http://localhost:4321")
    page.get_by_role("link", name="Innen & Hygiene").click()
    expect(page.get_by_role("heading", name="Der \"Dampfdrache\"")).to_be_visible()
    page.screenshot(path="verification/dampfreinigung.png")

    # 4. Verify Leasing
    print("Verifying Leasing...")
    page.goto("http://localhost:4321")
    page.get_by_role("link", name="Leasing-Rettung").click()
    expect(page.get_by_role("heading", name="Leasing Rückgabe")).to_be_visible()
    page.screenshot(path="verification/leasing.png")

    browser.close()

with sync_playwright() as playwright:
    run(playwright)
