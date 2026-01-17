from playwright.sync_api import sync_playwright, expect

def run_verification():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Navigate to the home page
        page.goto("http://localhost:4321/")

        # Wait for content to load
        page.wait_for_load_state("networkidle")

        # 1. Verify WhatsApp Button
        # It's fixed bottom right. I'll take a screenshot of the viewport or just the button.
        whatsapp_btn = page.locator('a[aria-label="Kontakt per WhatsApp"]')
        expect(whatsapp_btn).to_be_visible()
        whatsapp_btn.screenshot(path="verification/whatsapp_btn.png")
        print("WhatsApp button screenshot taken.")

        # 2. Verify Why Us Section
        # This section has "Warum RG Detailing Tensfeld?"
        why_us_section = page.get_by_text("Warum RG Detailing Tensfeld?").locator("..")
        why_us_section.scroll_into_view_if_needed()
        page.wait_for_timeout(500) # wait for smooth scroll/render
        why_us_section.screenshot(path="verification/why_us_section.png")
        print("Why Us section screenshot taken.")

        # 3. Verify Services Section
        # This section has "Das High-End Portfolio"
        services_section = page.get_by_text("Das High-End Portfolio").locator("..").locator("..")
        services_section.scroll_into_view_if_needed()
        page.wait_for_timeout(500)
        services_section.screenshot(path="verification/services_section.png")
        print("Services section screenshot taken.")

        browser.close()

if __name__ == "__main__":
    run_verification()
