from playwright.sync_api import Page, expect, sync_playwright

def test_homepage_seo(page: Page):
    # 1. Arrange: Go to the homepage.
    page.goto("http://localhost:4321")

    # 2. Act: Scroll down a bit to ensure lazy loaded content might trigger (though H2s should be there)
    page.mouse.wheel(0, 500)
    page.wait_for_timeout(1000)

    # 3. Assert: Check for the presence of the new keyword "Fahrzeugaufbereitung"
    # It was added in the hero text and H2 headings.

    # Check H2 specifically
    # <h2 class="text-3xl md:text-5xl font-bold mb-6 md:mb-8 text-white">Kostenrechner Fahrzeugaufbereitung</h2>
    heading = page.get_by_role("heading", name="Kostenrechner Fahrzeugaufbereitung")
    expect(heading).to_be_visible()

    # Check Hero text (strong tag)
    # Ihr Experte für professionelle <strong class="text-white">Fahrzeugaufbereitung</strong>
    hero_text = page.get_by_text("Ihr Experte für professionelle Fahrzeugaufbereitung")
    expect(hero_text).to_be_visible()

    # 4. Screenshot: Capture the homepage
    page.screenshot(path="verification_homepage.png", full_page=True)

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page(viewport={"width": 1280, "height": 800})
        try:
            test_homepage_seo(page)
            print("Verification successful!")
        except Exception as e:
            print(f"Verification failed: {e}")
            page.screenshot(path="verification_failed.png")
        finally:
            browser.close()
