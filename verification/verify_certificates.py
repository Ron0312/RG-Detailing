from playwright.sync_api import Page, expect, sync_playwright
import time

def test_certificates(page: Page):
    print("Navigating to home...")
    page.goto("http://localhost:4321")

    print("Scrolling to About section...")
    about_section = page.locator("#about")
    about_section.scroll_into_view_if_needed()

    # Wait for things to settle
    time.sleep(2)

    print("Verifying header...")
    expect(page.get_by_text("Zertifizierte Kompetenz")).to_be_visible()

    print("Finding the specific image...")
    steam_img_grid = page.locator(".grid img[alt='Remo Gerhardt Dampfdrachen Vertriebspartner']")
    expect(steam_img_grid).to_be_visible()

    print("Taking grid screenshot...")
    page.screenshot(path="verification/certificates_grid.png")

    # Click to open lightbox
    print("Clicking image...")
    steam_img_grid.click()

    # Wait for Lightbox
    print("Waiting for lightbox...")
    lightbox_container = page.locator(".yarl__container")
    expect(lightbox_container).to_be_visible()

    time.sleep(1)

    print("Taking lightbox screenshot...")
    page.screenshot(path="verification/certificates_lightbox.png")

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            test_certificates(page)
        finally:
            browser.close()
